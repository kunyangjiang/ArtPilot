import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entry ids come from the record's own `id` field (stable, not file-name based).
const artworks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/artworks', generateId: ({ data }) => String(data.id) }),
  schema: z.object({
    titleZh: z.string(),
    titleEn: z.string(),
    artist: z.string(),
    attributionNote: z.string(),
    dateApprox: z.string(),
    medium: z.string(),
    dimensionsCm: z.object({ height: z.number(), width: z.number() }),
    collection: z.string(),
    infoSources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
    images: z
      .array(
        z.object({
          key: z.enum(['full', 'travelers', 'brushwork', 'summit', 'temple', 'waterfall']),
          src: z.string().startsWith('/img/'),
          alt: z.string(),
          caption: z.string(),
          kind: z.enum(['full', 'detail']),
        }),
      )
      .min(1),
    imageSource: z.object({ label: z.string(), url: z.string().url(), originalFile: z.string() }),
    rights: z.object({
      status: z.string(),
      basis: z.string(),
      verifiedOn: z.string(),
      note: z.string(),
    }),
    // Collectible card face: short values sized for the card. Optional: only artworks with a card appear in the archive.
    // Works for any art form: facets are chosen per work (a building lists 材料/规模, a painting 媒材/尺幅),
    // and the image is optional — without one the card is a purely typographic cover. Monochrome: no colour fields.
    card: z
      .object({
        no: z.string().regex(/^\d{3}$/),
        type: z.string(), // the art form, e.g. 山水画, 建筑, 雕塑
        period: z.string(),
        facets: z.array(z.object({ label: z.string(), value: z.string() })).min(1).max(4),
        blurb: z.string().max(60), // one sentence; also the cover headline when there is no image, so it must fit
        focus: z.string().regex(/^\d{1,3}% \d{1,3}%$/).optional(), // where the cover crop centres on the image, e.g. '50% 70%'
        image: z.string().nullable().optional(), // an image key of this artwork; default 'full' when present, null for none
      })
      .optional(),
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
    summary: z.string(),
    artwork: reference('artworks'),
    glossary: z.array(reference('glossary')).min(3),
  }),
});

export const collections = { artworks, glossary, lessons };
