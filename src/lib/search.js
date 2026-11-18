// The site search (src/pages/search.astro) over the index written at build time (src/pages/search-index.json.ts).
// Plain JS, so the tests run it against the built index (tests/search.test.js).
//
// A query is one or more words; a result must answer every word. A word answers in two ways:
// - as text, anywhere a reader can see it: the title, the opening lines, the works a page features, the body;
// - as a place, when the word is a city or a country in the register (src/data/places.js). Then the search also finds
//   the works held or standing there, the pages that feature those works, and every page that names one of the
//   place's institutions, so 华盛顿 finds the National Gallery of Art without the reader knowing its name.
// A name also counts as its other spellings (凡高 as 梵高, Monet as 莫奈: src/data/aliases.js). And a query typed
// without spaces that finds nothing is split into the words it is made of (华盛顿青铜 → 华盛顿 青铜), the way a
// Chinese reader writes, before the search gives up.
import { places, placeById, ROLE_LABEL } from '../data/places.js';
import { aliasGroups } from '../data/aliases.js';

// Lower case only: it keeps every position, so a hit found in the folded text marks the same place in the original.
const fold = (s) => (s ?? '').toLowerCase();

/** The places a word names: a city by any of its names, or every city of a country. */
export function placesFor(word) {
  const w = fold(word).trim();
  if (!w) return [];
  const city = places.filter((p) => p.names.some((n) => fold(n) === w) || fold(p.name) === w);
  if (city.length) return city;
  return places.filter((p) => fold(p.country) === w || p.countryNames.some((n) => fold(n) === w));
}

// Every institution name in the register, for the guard below.
const allPieces = places.flatMap((p) => p.match.map((m) => ({ m: fold(m), place: p.id })));
// Accents do not separate names: Cezanne finds Cézanne.
const bare = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// One word, ready to match: the strings that count as it, and for each string the longer names of other places that
// contain it (故宫博物院 sits inside 国立故宫博物院, which is in Taipei, not Beijing), so those are not counted.
// The guard is for a word that names a place or an institution. A plain word (故宫, 青铜) counts wherever it stands:
// 故宫 is in Beijing's 故宫博物院 and in Taipei's 国立故宫博物院 alike.
function matcher(word, aliases) {
  const found = placesFor(word);
  const ids = new Set(found.map((p) => p.id));
  const w = fold(word);
  for (const g of allPieces) if (g.m === w) ids.add(g.place);
  const named = ids.size > 0;
  const strings = new Set([w]);
  for (const p of found) { strings.add(fold(p.name)); for (const m of p.match) strings.add(fold(m)); }
  for (const group of aliases.get(bare(w)) ?? []) for (const a of group) strings.add(a);
  const alts = [...strings].filter(Boolean).map((s) => ({
    s,
    guards: named ? allPieces.filter((g) => !ids.has(g.place) && g.m !== s && g.m.includes(s)).map((g) => ({ g: g.m, at: g.m.indexOf(s) })) : [],
  }));
  return { word, places: found, ids: new Set(found.map((p) => p.id)), alts };
}

// Name → the alias groups it belongs to (a name may be in more than one: 大卫 is a painter and part of other names).
function aliasMap(groups) {
  const map = new Map();
  for (const g of groups) {
    const list = [...new Set(g.map(fold))];
    for (const n of list) { const k = bare(n); if (!map.has(k)) map.set(k, []); map.get(k).push(list); }
  }
  return map;
}

// Positions of a matcher's strings in folded text: [start, end) pairs, sorted, not overlapping.
function hitsIn(text, m) {
  const out = [];
  for (const { s, guards } of m.alts) {
    for (let i = text.indexOf(s); i >= 0; i = text.indexOf(s, i + s.length)) {
      if (guards.some(({ g, at }) => i - at >= 0 && text.startsWith(g, i - at))) continue;
      out.push([i, i + s.length]);
    }
  }
  out.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const merged = [];
  for (const h of out) if (!merged.length || h[0] >= merged.at(-1)[1]) merged.push(h);
  return merged;
}

/**
 * Prepare the downloaded index once ({ docs, aliases }): folded copies of every field, for matching without changing
 * positions, the alias groups, and the words a query without spaces can be split into.
 */
export function prepare(data) {
  const docs = Array.isArray(data) ? data : data.docs;
  const art = new Map(docs.filter((d) => d.type === 'artwork').map((d) => [d.id, d]));
  for (const d of docs) {
    d._title = fold(d.title); d._lead = fold(d.lead); d._works = fold(d.works);
    for (const s of d.s) { s._t = fold(s.t); s._h = fold(s.h); }
  }
  const groups = [...aliasGroups, ...(Array.isArray(data) ? [] : data.aliases ?? [])];
  // Known words, longest first: the places and their institutions, and every alias.
  const vocab = [...new Set([
    ...places.flatMap((p) => [p.name, p.country, ...p.names, ...p.countryNames, ...p.match]),
    ...groups.flat(),
  ].map(fold).filter((s) => s.length >= 2))].sort((a, b) => b.length - a.length);
  let corpus = null; // all the text, joined on first need: only a query that finds nothing is split
  const text = () => (corpus ??= docs.map((d) => [d._title, d._lead, d._works, ...d.s.map((s) => s._h + ' ' + s._t)].join(' ')).join('\n'));
  return { docs, art, aliases: aliasMap(groups), vocab, text };
}

// Words that join others in a phrase and are not searched for (华盛顿的青铜 → 华盛顿 青铜).
const JOIN = new Set([...'的之和与及跟在里中内']);
const HAN = /[\u3400-\u9fff]/;

/**
 * A query typed without spaces, split into the words it is made of: at each point the longest known word (a place,
 * an institution, a name), else the longest run of characters the site's text contains. Joining characters between
 * words are dropped. Returns null when a part cannot be read as a word of two characters or more.
 */
export function split(index, query) {
  const out = [];
  for (const word of query.trim().split(/\s+/).filter(Boolean)) {
    const w = fold(word);
    if (!HAN.test(w)) { out.push(w); continue; }
    let i = 0;
    while (i < w.length) {
      const known = index.vocab.find((v) => w.startsWith(v, i));
      if (known) { out.push(known); i += known.length; continue; }
      if (JOIN.has(w[i])) { i++; continue; }
      let n = 0;
      for (let len = w.length - i; len >= 2; len--) {
        let piece = w.slice(i, i + len);
        // A piece stops before a known word, so 青铜华盛顿 splits at 华盛顿, and does not end on a joining character.
        const cut = index.vocab.map((v) => piece.indexOf(v, 1)).filter((k) => k > 0);
        if (cut.length) piece = piece.slice(0, Math.min(...cut));
        while (piece.length > 2 && JOIN.has(piece.at(-1))) piece = piece.slice(0, -1);
        if (piece.length >= 2 && index.text().includes(piece)) { n = piece.length; break; }
      }
      if (!n) return null;
      out.push(w.slice(i, i + n));
      i += n;
    }
  }
  return out;
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Text with every hit marked, as HTML. */
export function mark(text, matchers) {
  const f = fold(text);
  const hits = matchers.flatMap((m) => hitsIn(f, m)).sort((a, b) => a[0] - b[0]);
  let out = '', at = 0;
  for (const [a, b] of hits) { if (a < at) continue; out += esc(text.slice(at, a)) + '<mark>' + esc(text.slice(a, b)) + '</mark>'; at = b; }
  return out + esc(text.slice(at));
}

// A short passage around a hit, cut at sentence breaks where one is near.
function excerpt(text, at, end, room = 34) {
  let a = Math.max(0, at - room), b = Math.min(text.length, end + room);
  const before = text.slice(a, at).search(/[。！？；]\s*[^。！？；]*$/);
  if (before >= 0 && a > 0) a += before + 1;
  const after = text.slice(end, b).search(/[。！？；]/);
  if (after >= 0) b = end + after + 1;
  return { text: text.slice(a, b).trim(), start: a > 0, end: b < text.length };
}

// The kinds, always in this order, so the tabs stay where a reader learnt them.
export const ORDER = ['lesson', 'story', 'case', 'artwork'];

// Sections that cite sources rather than tell: a passage comes from them only when nothing else on the page matches.
const CITES = /出处|链接|来源|参考|延伸阅读|注释|图片说明|致谢/;

/**
 * Search the prepared index. Returns { words, split, places, placeWorks, groups: [{ type, items }], overview } where
 * each item is { doc, score, count, where: [{ place, role, by }] (works held there), via: [titles] (featured works
 * held there), passages: [{ h, a, html }] }. `split`: the words a query without spaces was read as, when the query
 * as typed found nothing. `overview`: the kinds in the order the overview shows them (a place's works first).
 */
export function search(index, query) {
  const words = [...new Set(query.trim().split(/\s+/).filter(Boolean))];
  if (!words.length) return { words, places: [], placeWorks: [], groups: [], overview: [] };
  const r = searchWords(index, words);
  if (r.groups.length) return r;
  const parts = split(index, query);
  if (!parts || parts.join(' ') === words.map(fold).join(' ')) return r;
  const again = searchWords(index, [...new Set(parts)]);
  return again.groups.length ? { ...again, words, split: again.words } : r;
}

function searchWords(index, words) {
  const ms = words.map((w) => matcher(w, index.aliases));
  const items = [];
  for (const d of index.docs) {
    let score = 0, count = 0, ok = true;
    const where = [], via = [];
    for (const m of ms) {
      const t = hitsIn(d._title, m).length, l = hitsIn(d._lead, m).length, w = hitsIn(d._works, m).length;
      const b = d.s.reduce((n, s) => n + hitsIn(s._t, m).length + hitsIn(s._h, m).length, 0);
      let place = 0;
      if (m.ids.size && d.type === 'artwork') {
        for (const p of d.pl) if (m.ids.has(p.place)) { where.push(p); place = p.role === 'former' || p.role === 'copy' ? 30 : 60; }
      }
      if (m.ids.size && d.w) {
        for (const id of d.w) {
          const a = index.art.get(id);
          if (a?.pl.some((p) => m.ids.has(p.place) && p.role !== 'former' && p.role !== 'copy')) { via.push(a.title); place = Math.max(place, 40); }
        }
      }
      if (!t && !l && !w && !b && !place) { ok = false; break; }
      count += t + l + b;
      score += place + t * 20 + l * 6 + Math.min(w, 3) * 5 + Math.min(b, 40);
    }
    if (!ok) continue;
    // The passages: the sections with the most hits, in page order, one excerpt each; a source list only when no
    // other section matches.
    const hit = d.s.map((s, i) => ({ s, i, n: ms.reduce((n, m) => n + hitsIn(s._t, m).length, 0) })).filter((x) => x.n);
    const told = hit.filter((x) => !CITES.test(x.s.h));
    const ranked = (told.length ? told : hit.slice(0, 1)).sort((a, b) => b.n - a.n).slice(0, 2).sort((a, b) => a.i - b.i);
    const passages = ranked.map(({ s }) => {
      const first = ms.map((m) => hitsIn(s._t, m)[0]).filter(Boolean).sort((a, b) => a[0] - b[0])[0];
      const e = excerpt(s.t, first[0], first[1]);
      return { h: s.h, a: s.a, html: (e.start ? '…' : '') + mark(e.text, ms) + (e.end ? '…' : '') };
    });
    items.push({ doc: d, score, count, where: dedupe(where), via: [...new Set(via)], passages });
  }
  const placeMode = ms.some((m) => m.ids.size);
  const groups = ORDER.map((type) => ({
    type,
    items: items.filter((x) => x.doc.type === type)
      .sort((a, b) => b.score - a.score || (a.doc.no ?? 0) - (b.doc.no ?? 0)),
  })).filter((g) => g.items.length);
  const found = [...new Map(ms.flatMap((m) => m.places).map((p) => [p.id, p])).values()];
  // Every work held or standing in the places named, whatever the other words: what the place panel counts.
  const ids = new Set(found.map((p) => p.id));
  const placeWorks = [...index.art.values()].flatMap((a) => a.pl.filter((p) => ids.has(p.place) && p.role !== 'former' && p.role !== 'copy').map((p) => ({ ...p, id: a.id })));
  const overview = (placeMode ? ['artwork', ...ORDER.filter((t) => t !== 'artwork')] : ORDER).filter((t) => groups.some((g) => g.type === t));
  return { words, matchers: ms, places: found, placeWorks, groups, overview };
}

const dedupe = (list) => [...new Map(list.map((p) => [p.place + p.role + p.by, p])).values()];

/** "现藏 · 美国国家美术馆（华盛顿）" for a work's place line. */
export const placeLine = (p) => `${ROLE_LABEL[p.role]} · ${p.by}${p.by.includes(placeById(p.place).name) ? '' : `（${placeById(p.place).name}）`}`;

export { placeById };
