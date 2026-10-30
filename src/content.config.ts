import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Rights for one image when a record's images come from different photographers (e.g. a building photographed
// on site). A record either has one `imageSource` for all its images (a painting reproduced from one file) or a
// `credit` on every image.
const imageCredit = z.object({
  author: z.string(), // photographer or creator, as credited on the source page
  licence: z.string(), // e.g. 'CC BY-SA 4.0'; '公有领域' when the author released it
  licenceUrl: z.string().url().optional(),
  sourceUrl: z.string().url(),
  date: z.string().optional(), // when it was taken: matters where a restoration changed what is shown
  changes: z.string(), // what ArtPilot did to it, e.g. '缩小尺寸、重新压缩；未裁切'
  // How a caption names the source when the image is not a photograph (a print, a patent drawing, a film still, a
  // diagram), e.g. '图版 · 罗伯特·米切尔'; without it the caption reads "摄影 {author}".
  by: z.string().optional(),
});

// Entry ids come from the record's own `id` field (stable, not file-name based).
// `kind` keeps paintings, buildings and objects honest: a building has a place and measured facts, not an artist, a
// canvas size or a museum; an object (a vessel, a statue) is held by a museum, often has no known maker, and may be a
// later copy of a lost original. Fields that only make sense for one kind are optional and checked below.
const artworks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/artworks', generateId: ({ data }) => String(data.id) }),
  schema: z
    .object({
      kind: z.enum(['painting', 'building', 'object']).default('painting'),
      titleZh: z.string(),
      titleEn: z.string(),
      artist: z.string().optional(), // painting
      attributionNote: z.string(), // who made it, or why that is unknown
      dateApprox: z.string(),
      medium: z.string().optional(), // painting
      dimensionsCm: z.object({ height: z.number(), width: z.number() }).optional(), // painting
      collection: z.string().optional(), // painting, object: the museum that holds it, with its object number
      objectType: z.string().optional(), // object: what it is, e.g. 青铜礼器 · 尊（盛酒器）
      dimensions: z.string().optional(), // object: as the holding museum publishes them (heights, diameters, weights)
      originalStatus: z.string().optional(), // object: an original, or a copy of a lost original, and what has been restored
      provenance: z.string().optional(), // object: the documented history of ownership and any findspot; nothing invented
      // Where the size comes from, when it is not the holding museum (an artist's page, a release page, nothing published);
      // the record page shows it in place of "据收藏机构公布的数据".
      dimensionsSource: z.string().optional(),
      // A record whose images are not all museum open-access photographs only resized (patents, film stills, diagrams,
      // a rotated plate): the line the record page shows under its images instead of the default one.
      imagesNote: z.string().optional(),
      location: z.string().optional(), // building: where it stands
      facts: z.array(z.object({ label: z.string(), value: z.string() })).max(4).optional(), // building: a few measured facts
      buildingType: z.string().optional(), // building: e.g. 天主教主教座堂；哥特式建筑
      materials: z.string().optional(), // building: structure and materials
      notes: z.array(z.string()).optional(), // building: verified alterations, conservation and protection, oldest first
      // painting: what is in the picture, top to bottom — an image key, where and what it shows, and its approximate
      // vertical position in the full image
      contents: z.array(z.object({ key: z.string(), where: z.string(), what: z.string(), span: z.string() })).optional(),
      infoSources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
      images: z
        .array(
          z.object({
            key: z.string(),
            src: z.string().startsWith('/img/'),
            alt: z.string(),
            caption: z.string(),
            kind: z.enum(['full', 'detail']),
            // Pixel size of the file in /public: required for an image the homepage features, so its box is reserved
            // before it loads (tests check these against the real file).
            width: z.number().int().positive().optional(),
            height: z.number().int().positive().optional(),
            subject: z.string().optional(), // when the image shows another place, e.g. a comparison
            credit: imageCredit.optional(),
          }),
        ),
      // A work whose image cannot lawfully be reproduced here (most art made after the Second World War) has no 'full'
      // image: its lesson and record show a typographic plate and send the reader to the work's own page at the museum
      // or the artist's catalogue. Any images such a record does carry are other works or documents, each named by its
      // own `subject`, never the work itself.
      officialPage: z.object({ label: z.string(), url: z.string().url() }).optional(),
      imageSource: z.object({ label: z.string(), url: z.string().url(), originalFile: z.string() }).optional(),
      rights: z.object({
        status: z.string(),
        basis: z.string(),
        verifiedOn: z.string(),
        note: z.string(),
      }),
      // Collectible card face: short values sized for the card. Optional: only artworks with a card appear in the archive.
      // Its number is not stored here: it comes from the lesson or story that awards it (cardIndex in src/lib/publication.js).
      // Works for any art form: facets are chosen per work (a building lists 材料/规模, a painting 媒材/尺幅),
      // and the image is optional — without one the card is a purely typographic cover. The cover photograph is shown in muted colour by the card style; no colour fields here.
      card: z
        .object({
          type: z.string(), // the art form, e.g. 山水画, 建筑, 雕塑
          maker: z.string().optional(), // a short maker line when the artist field does not fit (a building: its city)
          period: z.string(),
          facets: z.array(z.object({ label: z.string(), value: z.string() })).min(1).max(4),
          blurb: z.string().max(60), // one sentence; also the cover headline when there is no image, so it must fit
          focus: z.string().regex(/^\d{1,3}% \d{1,3}%$/).optional(), // where the cover crop centres on the image, e.g. '50% 70%'
          image: z.string().nullable().optional(), // an image key of this artwork; default 'full' when present, null for none
        })
        .optional(),
    })
    .superRefine((art, ctx) => {
      const need = (ok: unknown, message: string) => ok || ctx.addIssue({ code: 'custom', message });
      if (art.kind === 'painting') {
        need(art.artist && art.medium && art.dimensionsCm && art.collection, 'a painting needs artist, medium, dimensionsCm and collection');
      } else if (art.kind === 'object') {
        need(art.objectType && art.medium && art.dimensions && art.collection && art.originalStatus && art.provenance,
          'an object needs objectType, medium, dimensions, collection, originalStatus and provenance');
      } else {
        need(art.location, 'a building needs a location');
      }
      need(art.imageSource || art.images.every((i) => i.credit), 'give one imageSource, or a credit on every image');
      need(art.images.some((i) => i.key === 'full') || art.officialPage, "an artwork needs its 'full' image, or — when it cannot be reproduced — its officialPage");
      need(!art.officialPage || art.images.every((i) => i.key !== 'full' && i.subject), 'a work shown only by its official page carries no full image, and every other image names its subject');
    }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/glossary', generateId: ({ data }) => String(data.id) }),
  schema: z.object({
    term: z.string(),
    pinyin: z.string(),
    definition: z.string(),
  }),
});

const lessons = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(), // the line above the title, e.g. 细读 · 北宋 · 山水
    summary: z.string(),
    // Which of the 90 syllabus courses this lesson is. A lesson with a course number is published: the course book
    // links it and the homepage lists it.
    course: z.number().int().min(1).max(90), // TOTAL_COURSES in src/lib/publication.js
    workLabel: z.string(), // the work as the book and the homepage name it, e.g. 范宽《溪山行旅图》
    // Opt in to the homepage's daily artwork rotation: an image key of the lesson's artwork. Its caption is built from
    // workLabel and the lesson title; alt text, credit and rights come from the artwork record.
    featured: z.object({ image: z.string() }).optional(),
    // A lesson whose work cannot be reproduced here (its artwork record has an officialPage): the lawful image it opens
    // with and that stands for it in the course book — always another work, source or document from the record, shown
    // with its role (对照作品, 图像来源 …) so it is never taken for the work itself. `cover`: the stage's cover in the book.
    illustration: z.object({ image: z.string(), role: z.string(), cover: z.boolean().optional() }).optional(),
    artwork: reference('artworks'),
    // Further cards the course awards with its own one (Art Collection A+): works the lesson studies closely, listed in
    // the order they are numbered. One click at the end of the lesson claims them all (src/lib/publication.js cardIndex).
    cards: z.array(reference('artworks')).optional(),
    glossary: z.array(reference('glossary')).min(3),
  }),
});

// Artist stories and narrative cases: long-form articles outside the syllabus, read in the same reader as lessons and
// listed in their own halls (/stories/, /cases/). `kind` is the Continue Reading kind. A story may award one card from
// the artist series (src/lib/publication.js); a case awards none.
const essays = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/essays' }),
  schema: z.object({
    kind: z.enum(['artist-story', 'case']),
    title: z.string(),
    kicker: z.string(), // the line above the title
    subject: z.string(), // who or what it is about, with dates, e.g. 奥斯曼·哈姆迪·贝伊 · 1842–1910
    summary: z.string(),
    // The opening image. When the hero work cannot be reproduced here (its record has an officialPage), `image` is a
    // lawful image from the same record — another work, a document or a diagram — shown under its `role` beside the
    // work's typographic plate, as a lesson's `illustration` is (src/components/WorkPlate.astro).
    hero: z.object({ artwork: reference('artworks'), image: z.string(), role: z.string().optional() }),
    card: reference('artworks').optional(), // the card the end of a story awards
    cards: z.array(reference('artworks')).optional(), // further cards it awards with that one, claimed in the same click
  }),
});

export const collections = { artworks, glossary, lessons, essays };
