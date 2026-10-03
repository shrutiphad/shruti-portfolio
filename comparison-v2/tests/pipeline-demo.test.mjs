import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../lib/pipeline-demo.js', import.meta.url), 'utf8');
const { DEMO_LEADS, STAGES, evaluatePipeline } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

const healthy = evaluatePipeline(DEMO_LEADS[0]);
assert.equal(healthy.score, 77);
assert.match(healthy.owner, /Sales queue/);
assert.equal(healthy.observed, 12000);
assert.equal(healthy.attribution, 12000);
assert.ok(healthy.trusted);
assert.ok(healthy.stages.every(s => s.status === 'passed'));

for (const stage of STAGES) {
  const broken = evaluatePipeline(DEMO_LEADS[0], stage.key);
  assert.equal(broken.trusted, false, `${stage.key}: incomplete trace cannot be trusted`);
  assert.equal(broken.attribution, 0, `${stage.key}: never credit incomplete attribution`);
  assert.equal(broken.stages.find(s => s.key === stage.key).status, 'skipped');
  assert.equal(broken.observed, stage.key === 'report' ? 0 : 12000);
}

for (const skip of ['capture', 'enrich', 'score']) {
  const broken = evaluatePipeline(DEMO_LEADS[0], skip);
  assert.equal(broken.score, null, `${skip}: no fabricated score`);
  assert.equal(broken.owner, null, `${skip}: do not route an unverified score`);
  assert.equal(broken.stages[3].status, 'blocked');
}
const unassigned = evaluatePipeline(DEMO_LEADS[0], 'route');
assert.equal(unassigned.score, 77);
assert.equal(unassigned.owner, null);
assert.equal(unassigned.stages[4].status, 'warning');

const nurture = evaluatePipeline(DEMO_LEADS[1]);
assert.equal(nurture.score, 30);
assert.match(nurture.owner, /Nurture queue/);
assert.equal(nurture.observed, 0);
assert.equal(nurture.attribution, 0);
assert.ok(nurture.trusted, 'A zero-revenue trace can still be complete and truthful');
console.log('PASS: qualified lead, all five bypasses, dependency blocking, routing and nurture revenue.');
