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
          key: z.enum(['full', 'travelers', 'brushwork']),
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
