// Page transitions are a property of the site, not of single pages: every page is built on the shared layout, which
// opts in, and one stylesheet rule sets how every change of page looks and how long it takes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const pagesDir = new URL('../src/pages/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');
const pages = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  if (statSync(p).isDirectory()) return name === 'preview' ? [] : pages(p);   // local design concepts, never deployed
  return /\.(astro|mdx)$/.test(name) ? [p] : [];
});

test('the shared layout opts every page in, and off under reduced motion', () => {
  const base = read('src/layouts/Base.astro');
  assert.match(base, /@view-transition\{navigation:auto\}/);
  assert.match(base, /prefers-reduced-motion:reduce\)\{@view-transition\{navigation:none\}/);
});

test('every page is built on the shared layout', () => {
  const found = pages(pagesDir);
  assert.ok(found.length >= 5);
  for (const p of found) assert.match(readFileSync(p, 'utf8'), /<Base[\s>]/, `${p} does not use Base.astro`);
});

test('one transition for every page: a cross-fade of a measured length', () => {
  const css = read('src/styles/global.css');
  const ms = Number(css.match(/--vt-duration:\s*(\d+)ms/)?.[1]);
  assert.ok(ms >= 400 && ms <= 600, `--vt-duration ${ms}ms: too quick reads as a cut, too slow holds the visitor up`);
  assert.match(css, /::view-transition-old\(root\)\s*\{\s*animation: var\(--vt-duration\)/);
  assert.match(css, /::view-transition-new\(root\)\s*\{\s*animation: var\(--vt-duration\)/);
  // No page sets its own length any more.
  for (const p of pages(pagesDir)) assert.doesNotMatch(readFileSync(p, 'utf8'), /\btransition=\{/, p);
});
