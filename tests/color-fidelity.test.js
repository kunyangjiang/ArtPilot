import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Product principle: the collectible card may be black and white, but an artwork must never lose its colour
// anywhere else (artwork record, lesson, details). Colour-removing filters are allowed only inside `.art-card`.
const DESATURATE = /grayscale\(|sepia\(|saturate\(\s*0(\.0*)?\s*\)/;

test('colour-removing filters are confined to the collectible card', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const offenders = [];
  for (const [, selectors, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!DESATURATE.test(body)) continue;
    const outside = selectors.split(',').map((s) => s.trim()).filter((s) => !/(^|\s)\.art-card[\s.:\[-]/.test(`${s} `));
    if (outside.length) offenders.push(outside.join(', '));
  }
  assert.deepEqual(offenders, [], `desaturating filter outside .art-card: ${offenders.join(' | ')}`);
});

test('no component or page applies a colour-removing filter inline', () => {
  const dirs = ['../src/components/', '../src/pages/', '../src/pages/artworks/', '../src/pages/lessons/', '../src/layouts/'];
  for (const dir of dirs) {
    const url = new URL(dir, import.meta.url);
    for (const f of readdirSync(url).filter((n) => n.endsWith('.astro'))) {
      const src = readFileSync(new URL(f, url), 'utf8');
      assert.ok(!DESATURATE.test(src), `${dir}${f} applies a desaturating filter`);
    }
  }
});
