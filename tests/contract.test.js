import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { evaluateAnswer } from '../src/lib/quiz.js';
import { clampRatio, figureHeight, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from '../src/lib/scale.js';

const json = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const artwork = json('src/content/artworks/fan-kuan-travelers.json');
const glossaryDir = new URL('../src/content/glossary/', import.meta.url);
const glossary = readdirSync(glossaryDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(new URL(f, glossaryDir), 'utf8')));
const lessonDir = new URL('../src/content/lessons/', import.meta.url);
const lessonFiles = readdirSync(lessonDir).filter((f) => f.endsWith('.mdx'));
const lesson = readFileSync(new URL(lessonFiles[0], lessonDir), 'utf8');

test('artwork record has stable id and rights/source fields', () => {
  assert.equal(artwork.id, 'art-fan-kuan-travelers-001');
  for (const k of ['titleZh', 'titleEn', 'artist', 'dateApprox', 'medium', 'collection', 'imageSource', 'rights', 'infoSources']) {
    assert.ok(artwork[k], `missing ${k}`);
  }
  assert.match(artwork.rights.status, /公有领域/);
  for (const img of artwork.images) {
    assert.ok(existsSync(new URL(`../public${img.src}`, import.meta.url)), `missing file ${img.src}`);
    assert.ok(img.alt.length > 10);
  }
});

test('glossary has >=3 unique stable ids with definitions', () => {
  assert.ok(glossary.length >= 3);
  const ids = glossary.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length);
  glossary.forEach((g) => assert.ok(g.id.startsWith('gl-') && g.term && g.definition));
});

test('lesson references existing artwork and >=3 valid glossary ids', () => {
  const front = lesson.match(/^---\n([\s\S]*?)\n---/)[1];
  assert.ok(front.includes(`artwork: ${artwork.id}`));
  const listed = [...front.matchAll(/^\s+- (gl-[\w-]+)$/gm)].map((m) => m[1]);
  assert.ok(listed.length >= 3);
  const known = new Set(glossary.map((g) => g.id));
  listed.forEach((id) => assert.ok(known.has(id), `unknown glossary id ${id}`));
  const inline = [...lesson.matchAll(/<Term id="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(inline.length >= 3);
  inline.forEach((id) => assert.ok(known.has(id), `unknown inline term ${id}`));
});

const question = { options: [{ explanation: 'a' }, { explanation: 'b' }], answer: 0 };
test('quiz: correct, wrong, and invalid choices', () => {
  assert.deepEqual(evaluateAnswer(question, 0), { correct: true, explanation: 'a' });
  assert.deepEqual(evaluateAnswer(question, 1), { correct: false, explanation: 'b' });
  for (const bad of [-1, 2, NaN, undefined, null, '0']) assert.equal(evaluateAnswer(question, bad), null);
});

test('scale: clamping and figure height', () => {
  assert.equal(clampRatio(0), SCALE_MIN);
  assert.equal(clampRatio(1000), SCALE_MAX);
  assert.equal(clampRatio('abc'), SCALE_DEFAULT);
  assert.equal(clampRatio('25'), 25);
  assert.equal(figureHeight(10, 240), 24);
  assert.ok(figureHeight(SCALE_MAX, 240) < figureHeight(SCALE_MIN, 240));
  assert.equal(figureHeight(SCALE_MIN - 5, 240), 240 / SCALE_MIN);
});
