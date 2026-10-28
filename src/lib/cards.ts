// The published cards and their numbers (cardIndex in ./publication.js), read from the lessons and the artist stories.
// Shared by the card face, the record pages, the collection and the homepage, so they all number a card the same way.
import { getCollection } from 'astro:content';
import { cardIndex } from './publication.js';

export async function publishedCards() {
  const lessons = (await getCollection('lessons')).map((l) => ({
    id: l.id, course: l.data.course, artwork: l.data.artwork.id, cards: (l.data.cards ?? []).map((c) => c.id),
  }));
  const stories = (await getCollection('essays')).filter((e) => e.data.card)
    .map((e) => ({ id: e.id, card: e.data.card!.id, cards: (e.data.cards ?? []).map((c) => c.id) }));
  return cardIndex(lessons, stories);
}
