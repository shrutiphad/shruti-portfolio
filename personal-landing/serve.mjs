import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicRoot=resolve(dirname(fileURLToPath(import.meta.url)), 'dist');
const port=Number(process.env.PORT || 3002);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.jpeg':'image/jpeg','.pdf':'application/pdf','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{'Allow':'GET, HEAD'}); res.end(); return; }
  try {
    const pathname=decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    const target=resolve(publicRoot, '.' + (pathname==='/' ? '/index.html' : pathname));
    if (!target.toLowerCase().startsWith((publicRoot+sep).toLowerCase())) { res.writeHead(403); res.end('Forbidden'); return; }
    const info=await stat(target);
    if(!info.isFile()) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD' ? undefined : await readFile(target));
  } catch(error) { res.writeHead(error.code==='ENOENT'?404:400); res.end('Not found'); }
});
server.on('error',(error)=>{console.error(error.message); process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Shruti's personal page: http://127.0.0.1:${port}/`));
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close());
