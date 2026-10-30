import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { publishedCards } from './published-cards.js';

// Phase 4.27, Narrative Cases 03–05: Benin restitution, Bonampak Structure 1, Javanese wayang kulit.
const CASES = [
  { id: 'until-it-goes-home', record: 'benin-plaque-82-5-3', parts: ['<FindOnImage', '<FeatureCompare', '<ProvenanceTrail', '<SortGame'] },
  { id: 'vaulted-rooms-of-bonampak', record: 'bonampak-structure1', parts: ['<RoomPlan', '<FindOnImage', '<InferenceChain', '<SortGame'] },
  { id: 'wayang-before-the-lamp', record: 'wayang-hanoman-tropenmuseum', parts: ['<FindOnImage', '<ShadowStage', '<SortGame'] },
];
const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const mdx = (id) => read(`../src/content/essays/${id}.mdx`);
const record = (r) => JSON.parse(read(`../src/content/artworks/${r}.json`));

// Narrative Han characters, counted exactly as for Case 02: the body before the sources, without frontmatter, imports,
// headings, datelines and component blocks. Callout prose counts.
const narrativeHan = (s) => {
  let t = s.replace(/^---[\s\S]*?\n---\n/, '').split('<Band kind="sources">')[0];
  t = t.replace(/^<([A-Z]\w*)[\s\S]*?(\/>|<\/\1>)\s*$/gm, (m, name) => (name === 'Callout' || name === 'Band' ? m.replace(/<\/?\w+[^>]*>/g, '') : ''));
  const body = t.split('\n').filter((l) => !/^\s*(#|import |<)/.test(l)).join('\n');
  return (body.match(/\p{Script=Han}/gu) ?? []).length;
};

test('the cases hall lists five Cases in order (hall order is by file name)', () => {
  const dir = new URL('../src/content/essays/', import.meta.url);
  const cases = readdirSync(dir)
    .filter((f) => /^kind: case$/m.test(readFileSync(new URL(f, dir), 'utf8')))
    .map((f) => f.replace(/\.mdx$/, '')).sort();
  assert.deepEqual(cases, ['chartres-glass', 'two-scrolls-one-gathering', ...CASES.map((c) => c.id)]);
});

test('no Case awards a card; the collection stays at 151', () => {
  for (const c of CASES) {
    const fm = mdx(c.id).match(/^---\n([\s\S]*?)\n---/)[1];
    assert.match(fm, /^kind: case$/m, c.id);
    assert.doesNotMatch(fm, /^cards?:/m, `${c.id}: a case awards no card`);
    assert.equal(record(c.record).card, undefined, `${c.record}: no card face`);
    assert.doesNotMatch(mdx(c.id), /LessonComplete/, `${c.id}: no completion button`);
  }
  assert.equal(publishedCards().size, 151);
});

for (const c of CASES) {
  const src = mdx(c.id);

  test(`${c.id}: at least 7,000 Han characters of narrative`, () => {
    const n = narrativeHan(src);
    assert.ok(n >= 7000, `${n} narrative Han characters`);
  });

  test(`${c.id}: fiction declared at the start, accounted for at the end; sources present`, () => {
    assert.match(src, /<Band kind="prelude">[\s\S]*?虚构[\s\S]*?<\/Band>/);
    assert.match(src, /<Callout kind="fiction">/);
    assert.match(src, /## 这个故事里哪些是真的[\s\S]*\*\*真实的：\*\*[\s\S]*\*\*(重建与)?虚构的：\*\*[\s\S]*\*\*仍未解决的/);
    assert.match(src, /<Band kind="sources">[\s\S]*https:\/\//);
    assert.doesNotMatch(src, /\*\*[^*\n]*[。，；：！？]\*\*[一-鿿]/, 'no CJK bold that markdown cannot close');
  });

  test(`${c.id}: at least five images and three interactions, each within three questions`, () => {
    const visuals = (src.match(/<ArtworkFigure /g) ?? []).length + (src.match(/<(FindOnImage|FeatureCompare|RoomPlan|ShadowStage)\b/g) ?? []).length;
    assert.ok(visuals >= 5, `${visuals} visual encounters`);
    for (const p of c.parts) assert.ok(src.includes(p), p);
    for (const block of src.match(/<(FindOnImage|SortGame|ShadowStage)[\s\S]*?\/>/g) ?? []) {
      const n = (block.match(/\{ (x|text): |^\s+id: '/gm) ?? []).length;
      assert.ok(n <= 3, `${block.slice(0, 40)}…: ${n} questions`);
    }
  });

  test(`${c.id}: every image of its record has a licence, a source and a file`, () => {
    const art = record(c.record);
    for (const img of art.images) {
      assert.ok(img.credit?.licence && img.credit?.sourceUrl, `${img.key}: licence and source`);
      assert.ok(existsSync(new URL(`../public${img.src}`, import.meta.url)), `${img.key}: file exists`);
    }
    for (const m of src.matchAll(/image[=:]\s*["']([\w-]+)["']/g)) {
      assert.ok(art.images.some((i) => i.key === m[1]), `${c.id} uses image ${m[1]}`);
    }
  });
}

test('Case 03 keeps ownership, custody and display apart and does not invent a return', () => {
  const src = mdx('until-it-goes-home');
  assert.match(src, /82-5-3/);
  assert.match(src, /本篇没有在公开资料中找到确切/);
  assert.match(src, /kind: 'gap'/);
  assert.match(src, /bins=\{\[[\s\S]*?归谁所有[\s\S]*?谁在保管[\s\S]*?怎样展示/);
});

test('Case 04 separates the court\'s presentation from what is independently known, and reconstructions from the walls', () => {
  const src = mdx('vaulted-rooms-of-bonampak');
  const chain = src.match(/<InferenceChain[\s\S]*?\/>/)[0];
  for (const v of ['justified', 'plausible', 'unknowable']) assert.match(chain, new RegExp(`verdict: '${v}'`));
  assert.match(src, /它不是原作/);
  assert.match(src, /label: '宫廷的展示'[\s\S]*label: '独立确认的'[\s\S]*label: '现代的重建'/);
});

test('Case 05 rehosts no audio and synthesises none', () => {
  const src = mdx('wayang-before-the-lamp');
  assert.doesNotMatch(src, /<audio|youtube\.com|youtu\.be|\.mp3|\.ogg|\.wav/i);
  assert.doesNotMatch(read('../src/components/ShadowStage.astro'), /AudioContext|<audio/);
  const find = src.indexOf('<FindOnImage');
  assert.ok(find > 0 && find < src.indexOf('排 simpingan'), 'the find game comes before the scene that explains its answers');
});
