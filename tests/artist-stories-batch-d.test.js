import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARTIST_CARDS } from '../src/lib/publication.js';
import { publishedCards } from './published-cards.js';

// Phase 4.25, Artist Stories Final Batch D: six stories appended to the artist series after Batch C.
const dir = new URL('../src/content/essays/', import.meta.url);
const story = (id) => readFileSync(new URL(`${id}.mdx`, dir), 'utf8');
const fm = (src) => src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
const artwork = (file) => JSON.parse(readFileSync(new URL(`../src/content/artworks/${file}.json`, import.meta.url), 'utf8'));
const BATCH = [
  ['xu-wei-painting-ranked-fourth', 'art-xu-wei-pomegranate-001', 'xu-wei-pomegranate'],
  ['bada-shanren-upturned-eyes', 'art-bada-birds-lotus-pond-001', 'bada-birds-lotus-pond'],
  ['pan-yuliang-two-surnames', 'art-pan-yuliang-self-portrait-bronze-001', 'pan-yuliang-self-portrait-bronze'],
  ['michelangelo-forty-statues', 'art-michelangelo-atlas-prisoner-001', 'michelangelo-atlas-prisoner'],
  ['picasso-many-faces', 'art-picasso-guernica-001', 'picasso-guernica'],
  ['kollwitz-eighteen-years', 'art-kollwitz-grieving-parents-001', 'kollwitz-grieving-parents'],
];

// Narrative Han characters, counted as in Batch C: the body before the sources, without frontmatter, imports,
// headings, datelines and component blocks. Callout prose counts.
const narrativeHan = (src) => {
  let t = src.replace(/^---[\s\S]*?\n---\n/, '').split('<Band kind="sources">')[0];
  t = t.replace(/^<([A-Z]\w*)[\s\S]*?(\/>|<\/\1>)\s*$/gm, (m, name) => (name === 'Callout' || name === 'Band' ? m.replace(/<\/?\w+[^>]*>/g, '') : ''));
  const body = t.split('\n').filter((l) => !/^\s*(#|import |<)/.test(l)).join('\n');
  return (body.match(/\p{Script=Han}/gu) ?? []).length;
};

test('Batch D follows Batch C in the artist series, in publication order', () => {
  assert.deepEqual(ARTIST_CARDS.slice(14), BATCH.map(([, card]) => card));
  assert.equal(ARTIST_CARDS.length, 20);
  for (const [id, card] of BATCH) assert.match(fm(story(id)), new RegExp(`^card: ${card}$`, 'm'), `${id} awards ${card}`);
});

test('numbers: everything before Batch D keeps its number; the new cards are 146–151', () => {
  const cards = publishedCards();
  assert.equal(cards.get('art-nek-chand-bangle-man-001').no, '145');
  BATCH.forEach(([, card], i) => assert.equal(cards.get(card).no, String(146 + i)));
  assert.equal(cards.size, 151);
});

test('Production Standard v2: every story carries at least 5,000 Han characters of narrative', () => {
  for (const [id] of BATCH) {
    const n = narrativeHan(story(id));
    assert.ok(n >= 5000, `${id}: ${n} narrative Han characters`);
  }
});

test('rights: works under copyright, or of uncertain US status, are typographic cards; the rest show their own image', () => {
  for (const file of ['pan-yuliang-self-portrait-bronze', 'picasso-guernica', 'kollwitz-grieving-parents']) {
    const a = artwork(file);
    assert.ok(a.officialPage?.url.startsWith('https://'), `${file}: official page`);
    assert.equal(a.card.image, null, `${file}: typographic card`);
    assert.ok(a.images.every((i) => i.key !== 'full' && i.subject), `${file}: every image names what it shows instead`);
  }
  for (const file of ['xu-wei-pomegranate', 'bada-birds-lotus-pond', 'michelangelo-atlas-prisoner']) {
    const a = artwork(file);
    assert.equal(a.officialPage, undefined, `${file}: shown in full`);
    assert.ok(a.images.some((i) => i.key === 'full'), `${file}: a full image`);
  }
  for (const [, , file] of BATCH) {
    const a = artwork(file);
    assert.ok(a.images.every((i) => i.credit?.licence && i.credit?.sourceUrl), `${file}: every image carries its licence and source`);
    assert.ok(a.images.length >= 1 && a.rights?.verifiedOn, `${file}: rights checked`);
  }
  // Images reused elsewhere on the site, or under non-commercial licences, are linked, never copied.
  const mich = JSON.stringify(artwork('michelangelo-atlas-prisoner'));
  assert.doesNotMatch(mich, /sibyl/, 'Michelangelo: the Libyan Sibyl belongs to course 43');
  assert.doesNotMatch(JSON.stringify(artwork('picasso-guernica')), /gris|meninas/, 'Picasso: no Gris portrait, no Las Meninas image');
});

test('each story is told, cited and ended the same way, with its own engine and interactions', () => {
  for (const [id, card] of BATCH) {
    const src = story(id);
    assert.match(src, /<Band kind="prelude">/, `${id}: says how it is told`);
    assert.match(src, /<Band kind="sources">/, `${id}: sources`);
    assert.match(src, new RegExp(`<LessonComplete artwork="${card}" kind="story" />`), `${id}: awards its card at the end`);
    assert.ok((src.match(/^## /gm) ?? []).length >= 8, `${id}: several scenes`);
    assert.ok((src.match(/<ArtworkFigure /g) ?? []).length + 1 >= 4 || id === 'pan-yuliang-two-surnames', `${id}: at least four visuals`);
    assert.doesNotMatch(src, /\*\*[^*\n]*[。，；：！？]\*\*[一-鿿]/, `${id}: no CJK bold that markdown cannot close`);
  }
  const interactions = {
    'xu-wei-painting-ranked-fourth': [/<InkCloseUp/, /<ScrollUnroll/],
    'bada-shanren-upturned-eyes': [/<FindOnImage/, /<NameLedger/],
    'pan-yuliang-two-surnames': [/<SourceDates/, /<SortGame/],
    'michelangelo-forty-statues': [/<FindOnImage/, /<InferenceChain/],
    'picasso-many-faces': [/<InferenceChain/, /<SizeLineup/],
    'kollwitz-eighteen-years': [/<SamePlate/, /<FindOnImage/, /<SortGame/],
  };
  for (const [id, patterns] of Object.entries(interactions)) for (const p of patterns) assert.match(story(id), p, `${id}: ${p}`);
});

test('the brief’s cautions are kept in the text', () => {
  // Xu Wei: violence and illness told plainly, not as the price of genius.
  assert.match(story('xu-wei-painting-ranked-fourth'), /不是他成为艺术家的条件/);
  // Michelangelo: standing on a scaffold, with assistants.
  const m = story('michelangelo-forty-statues');
  assert.match(m, /站着、仰着头/);
  assert.match(m, /助手/);
  // Picasso: not organized by partners, and harm not romanticized.
  const p = story('picasso-many-faces');
  assert.match(p, /本篇不这样做/);
  assert.match(p, /天才的代价/);
  // Kollwitz: the eighteen years come from the Kollwitz Museum Köln, and the social work before 1914 is told.
  const k = story('kollwitz-eighteen-years');
  assert.match(k, /十八年以后才定下来/);
  assert.match(k, /1912 年/);
});
