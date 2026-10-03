import { cp, mkdir, readFile, writeFile, rm, realpath } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const build = resolve(repo, '.portfolio-build');
const site = resolve(repo, 'site');
await mkdir(build, { recursive: true });
for (const folder of ['app', 'components', 'lib', 'public']) {
  await cp(resolve(repo, 'comparison-v2', folder), resolve(build, folder), { recursive: true });
}
for (const file of ['package.json', 'package-lock.json', 'jsconfig.json']) {
  await cp(resolve(repo, 'comparison-v2', file), resolve(build, file));
}
await writeFile(resolve(build, 'next.config.mjs'), 'export default { reactStrictMode: true, output: "export", basePath: "/fancy", images: { unoptimized: true } };\n');
const portraitPath = resolve(build, 'components/Portrait.js');
await writeFile(portraitPath, (await readFile(portraitPath, 'utf8')).replaceAll('"/shruti-portrait-cutout.png"', '"/fancy/shruti-portrait-cutout.png"'));
const homePath = resolve(build, 'app/page.js');
await writeFile(homePath, (await readFile(homePath, 'utf8')).replaceAll('href="/shruti-phad-resume.pdf"', 'href="/fancy/shruti-phad-resume.pdf"'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
for (const args of [['ci', '--no-audit', '--no-fund'], ['run', 'build']]) {
  const result = spawnSync(npm, args, { cwd: build, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status || 1);
}
// These are fixed generated directories inside this checkout.
await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });
await cp(resolve(repo, 'personal-landing-preview/dist'), site, { recursive: true });
const landingPath = resolve(site, 'index.html');
const landing = (await readFile(landingPath, 'utf8')).replace('http://127.0.0.1:3001/', '/fancy');
if (!landing.includes('href="/fancy"')) throw new Error('Missing local-to-live portfolio link');
await writeFile(landingPath, landing);
await cp(resolve(build, 'out'), resolve(site, 'fancy'), { recursive: true });
console.log('Both portfolios are ready in site/: landing at / and fancy portfolio at /fancy.');
