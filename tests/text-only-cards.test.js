import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { publishedCards } from './published-cards.js';

// Works this site cannot reproduce (most art made after the Second World War) are still collected: their record names
// the work's official page instead of carrying its image, and their card is typographic (Phase 4.19 collection policy).
const read = (dir, ext) => readdirSync(new URL(dir, import.meta.url)).filter((f) => f.endsWith(ext)).map((f) => readFileSync(new URL(dir + f, import.meta.url), 'utf8'));
const artworks = read('../src/content/artworks/', '.json').map((t) => JSON.parse(t));
const textOnly = artworks.filter((a) => a.officialPage);
const lessons = read('../src/content/lessons/', '.mdx').map((src) => src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);

test('a work shown by its official page carries no image of itself, and every other image names what it shows', () => {
  assert.ok(textOnly.length >= 5, 'the five Stage 08 principal works');
  for (const a of textOnly) {
    assert.match(a.officialPage.url, /^https:\/\//, `${a.id}: official page`);
    assert.ok(a.officialPage.label, `${a.id}: official page label`);
    assert.equal(a.images.find((i) => i.key === 'full'), undefined, `${a.id}: no full image`);
    for (const i of a.images) assert.ok(i.subject && i.credit, `${a.id}/${i.key}: another work or document, named and credited`);
    assert.ok(a.titleZh && a.titleEn && a.artist && a.dateApprox && a.medium, `${a.id}: title, artist, date and medium`);
  }
});

test('a text-only work is a first-class card: typographic face, a number, and a lesson that awards it', () => {
  const cards = publishedCards();
  for (const a of textOnly) {
    assert.ok(a.card, `${a.id}: has a card`);
    assert.equal(a.card.image, null, `${a.id}: the card face is typographic, never one of the record's other images`);
    assert.ok([...a.card.blurb].length <= 60, `${a.id}: blurb fits the cover`);
    assert.ok(cards.get(a.id)?.no, `${a.id}: numbered with every other card`);
    assert.ok(lessons.some((fm) => new RegExp(`^artwork: ${a.id}$`, 'm').test(fm)), `${a.id}: awarded by a lesson`);
  }
});

test('every other artwork still has its full image', () => {
  for (const a of artworks.filter((x) => !x.officialPage)) assert.ok(a.images.some((i) => i.key === 'full'), `${a.id}: full image`);
});
