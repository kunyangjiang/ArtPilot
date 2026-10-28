// The published cards as the site numbers them (cardIndex), read from the lesson and essay frontmatter on disk.
import { readFileSync, readdirSync } from 'node:fs';
import { cardIndex } from '../src/lib/publication.js';

const frontmatter = (dir) => readdirSync(new URL(`../src/content/${dir}/`, import.meta.url)).filter((f) => f.endsWith('.mdx'))
  .map((f) => ({ id: f.replace(/\.mdx$/, ''), fm: readFileSync(new URL(`../src/content/${dir}/${f}`, import.meta.url), 'utf8').split('---')[1] }));
const list = (fm) => fm.match(/^cards:\s*\[(.*)\]\s*$/m)?.[1].split(',').map((x) => x.trim()).filter(Boolean) ?? [];

export const diskLessons = () => frontmatter('lessons').map(({ id, fm }) => ({
  id, course: Number(fm.match(/^course:\s*(\d+)/m)?.[1]), artwork: fm.match(/^artwork:\s*(\S+)/m)?.[1], cards: list(fm),
}));
export const diskStories = () => frontmatter('essays').map(({ id, fm }) => ({ id, card: fm.match(/^card:\s*(\S+)/m)?.[1], cards: list(fm) }))
  .filter((s) => s.card);
export const publishedCards = () => cardIndex(diskLessons(), diskStories());
