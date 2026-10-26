import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { evaluateAnswer } from '../src/lib/quiz.js';
import { clampRatio, figureHeight, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from '../src/lib/scale.js';

const json = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const artwork = json('src/content/artworks/fan-kuan-travelers.json');
const artworkDir = new URL('../src/content/artworks/', import.meta.url);
const artworks = readdirSync(artworkDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(new URL(f, artworkDir), 'utf8')));
const glossaryDir = new URL('../src/content/glossary/', import.meta.url);
const glossary = readdirSync(glossaryDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(new URL(f, glossaryDir), 'utf8')));
const lessonDir = new URL('../src/content/lessons/', import.meta.url);
const lessonFiles = readdirSync(lessonDir).filter((f) => f.endsWith('.mdx'));
const lessons = lessonFiles.map((f) => [f, readFileSync(new URL(f, lessonDir), 'utf8')]);

test('artwork record has stable id and rights/source fields', () => {
  assert.equal(artwork.id, 'art-fan-kuan-travelers-001');
  for (const k of ['titleZh', 'titleEn', 'artist', 'dateApprox', 'medium', 'collection', 'imageSource', 'rights', 'infoSources']) {
    assert.ok(artwork[k], `missing ${k}`);
  }
  assert.match(artwork.rights.status, /公有领域/);
});

// A building has a place but no painter, canvas size or museum; and an image without one shared source must carry
// its own credit (author, licence, source page, what was changed).
test('every artwork record has existing images, alt text and rights for each image', () => {
  assert.equal(new Set(artworks.map((a) => a.id)).size, artworks.length);
  for (const a of artworks) {
    if (a.kind === 'building') {
      assert.ok(a.location, `${a.id}: a building needs a location`);
      for (const k of ['artist', 'medium', 'dimensionsCm', 'collection']) assert.equal(a[k], undefined, `${a.id}: a building has no ${k}`);
    }
    for (const img of a.images) {
      assert.ok(existsSync(new URL(`../public${img.src}`, import.meta.url)), `missing file ${img.src}`);
      assert.ok(img.alt.length > 10, `${img.src}: alt text too short`);
      if (!a.imageSource) {
        const c = img.credit;
        assert.ok(c && c.author && c.licence && c.sourceUrl && c.changes, `${img.src}: needs author, licence, source and changes`);
        if (/CC BY/.test(c.licence)) assert.ok(c.licenceUrl, `${img.src}: a CC licence needs its URL`);
      }
    }
  }
});

test('glossary has >=3 unique stable ids with definitions', () => {
  assert.ok(glossary.length >= 3);
  const ids = glossary.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length);
  glossary.forEach((g) => assert.ok(g.id.startsWith('gl-') && g.term && g.definition));
});

test('every lesson references an existing artwork and valid glossary ids', () => {
  const known = new Set(glossary.map((g) => g.id));
  const artworkIds = new Set(artworks.map((a) => a.id));
  for (const [f, lesson] of lessons) {
    const front = lesson.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
    const artworkId = front.match(/^artwork: (\S+)$/m)?.[1];
    assert.ok(artworkIds.has(artworkId), `${f}: unknown artwork ${artworkId}`);
    const listed = [...front.matchAll(/^\s+- (gl-[\w-]+)$/gm)].map((m) => m[1]);
    assert.ok(listed.length >= 3, `${f}: needs >=3 glossary ids`);
    listed.forEach((id) => assert.ok(known.has(id), `${f}: unknown glossary id ${id}`));
    const inline = [...lesson.matchAll(/<Term id="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(inline.length >= 3, `${f}: needs >=3 inline terms`);
    inline.forEach((id) => assert.ok(known.has(id), `${f}: unknown inline term ${id}`));
  }
});

// COL-01: completing a core lesson earns its representative card. Each lesson whose artwork has a card ends with
// exactly one explicit completion action for that artwork (after the reflection, before the sources). A quiz is
// optional: none is required, and the completion action does not depend on one.
test('every lesson with a card ends with one completion action for its own artwork', () => {
  const withCard = new Set(artworks.filter((a) => a.card).map((a) => a.id));
  for (const [f, src] of lessons) {
    const artworkId = src.match(/^artwork: (\S+)$/m)?.[1];
    const actions = [...src.matchAll(/<LessonComplete artwork="([^"]+)"/g)];
    if (!withCard.has(artworkId)) {
      assert.equal(actions.length, 0, `${f}: no card, so no completion action`);
      continue;
    }
    assert.equal(actions.length, 1, `${f}: expected exactly one completion action`);
    assert.equal(actions[0][1], artworkId, `${f}: the action must claim this lesson's own card`);
    const reflection = src.indexOf('<Band kind="reflection">');
    const sources = src.indexOf('<Band kind="sources">');
    assert.ok(reflection >= 0 && sources > reflection, `${f}: needs a reflection band followed by a sources band`);
    const at = actions[0].index;
    assert.ok(at > src.indexOf('</Band>', reflection) && at < sources, `${f}: the completion action belongs at the end of the lesson`);
  }
});

// The completion action claims on an explicit click only — never on page load or from a quiz answer.
test('the completion action claims only when the reader presses it', () => {
  const component = readFileSync(new URL('../src/components/LessonComplete.astro', import.meta.url), 'utf8');
  const script = component.slice(component.indexOf('<script>'));
  assert.match(component, /完成本课 · 领取藏品卡/);
  assert.equal([...script.matchAll(/collect\(/g)].length, 1, 'collect() is called in one place');
  assert.ok(script.indexOf('collect(') > script.indexOf("addEventListener('click'"), 'collect() runs inside the click handler');
  assert.doesNotMatch(script, /artpilot:quiz/, 'quiz results do not claim cards');
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
