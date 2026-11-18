// The site search's index (src/pages/search.astro), written once at build time: every published lesson, artist
// story and narrative case as plain text split at its headings, and every artwork record by its catalogue facts. The
// search page fetches it only when it is opened; nothing else on the site loads it.
import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';
import { mdxSections } from '../lib/searchText.js';
import { inCourseOrder } from '../lib/publication.js';
import { stages } from '../data/curriculum';
import { placesOfArtwork } from '../data/places.js';
import { aliasesFromArtist } from '../data/aliases.js';
import { cardImage, thumbPath } from '../lib/thumbs.js';

// A section's anchor on its page: the id Astro gave the heading with the same text, taken in order.
async function withAnchors(entry: Parameters<typeof render>[0], body: string) {
  const { headings } = await render(entry);
  const norm = (s: string) => s.replace(/\s+/g, '');
  let from = 0;
  return mdxSections(body).map(({ h, t }) => {
    if (!h) return { h, t };
    const k = headings.findIndex((x, i) => i >= from && norm(x.text) === norm(h));
    if (k < 0) return { h, t };
    from = k + 1;
    return { h, a: headings[k].slug, t };
  });
}

export const GET: APIRoute = async () => {
  const lessons = inCourseOrder((await getCollection('lessons')).map((l) => ({ ...l, course: l.data.course })));
  const essays = (await getCollection('essays')).sort((a, b) => a.id.localeCompare(b.id));
  const artworks = await getCollection('artworks');
  const art = new Map(artworks.map((a) => [a.id, a.data]));
  // The works a page features, by name, maker and holder: a search for 范宽 or 大英博物馆 finds the course on that work.
  // `w`: their ids, so a place search can find the pages whose works are held there.
  const featured = (list: string[]) => {
    const w = [...new Set(list)];
    return { w, works: w.map((id) => { const a = art.get(id)!; return [a.titleZh, a.artist, a.collection, a.location].filter(Boolean).join(' '); }).join(' ') };
  };

  const docs = [];
  for (const l of lessons) {
    const st = stages.find((s) => l.data.course >= s.first && l.data.course <= s.last)!;
    docs.push({
      type: 'lesson', url: `/lessons/${l.id}/`, no: l.data.course, meta: `第 ${String(l.data.course).padStart(2, '0')} 课 · 第 ${st.no} 阶段`,
      title: l.data.title, lead: [l.data.kicker, l.data.workLabel, l.data.summary].join(' '),
      ...featured([l.data.artwork.id, ...(l.data.cards ?? []).map((c) => c.id)]),
      s: await withAnchors(l, l.body ?? ''),
    });
  }
  for (const e of essays) {
    docs.push({
      type: e.data.kind === 'case' ? 'case' : 'story', url: `${e.data.kind === 'case' ? '/cases/' : '/stories/'}${e.id}/`,
      meta: e.data.subject, title: e.data.title, lead: [e.data.kicker, e.data.summary].join(' '),
      ...featured([e.data.hero.artwork.id, ...(e.data.card ? [e.data.card.id] : []), ...(e.data.cards ?? []).map((c) => c.id)]),
      s: await withAnchors(e, e.body ?? ''),
    });
  }
  for (const a of artworks.sort((x, y) => x.data.titleZh.localeCompare(y.data.titleZh, 'zh'))) {
    const d = a.data;
    docs.push({
      type: 'artwork', url: `/artworks/${a.id}/`, meta: [d.artist, d.dateApprox].filter(Boolean).join(' · '),
      title: d.titleZh, lead: [d.titleEn, d.artist, d.objectType, d.buildingType].filter(Boolean).join(' '),
      id: a.id, pl: placesOfArtwork(a.id, d),
      // The card's image, small (src/lib/thumbs.js); a text-only card has none, and the search sets its tile in type.
      ...(() => { const img = cardImage(d); return img ? { img: thumbPath(img.src), focus: d.card?.focus } : {}; })(),
      s: [{ h: '', t: [d.collection, d.location, d.medium, d.materials, d.attributionNote, d.provenance, d.card?.blurb].filter(Boolean).join(' ') }],
    });
  }
  // Other names for the artists the records give in two scripts (src/data/aliases.js).
  const aliases = [...new Map(artworks.map((a) => aliasesFromArtist(a.data.artist)).filter(Boolean).map((g) => [g!.join('|'), g!])).values()];
  return new Response(JSON.stringify({ docs, aliases }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
