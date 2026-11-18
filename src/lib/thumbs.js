// Small copies of the artwork card images, for lists that show many works at once (the site search). They are made
// at build time from the card's own image (the integration in astro.config.mjs) into /img/thumbs/, and never stand in
// for a work the card shows as text only: a record whose card has no image has no thumbnail.

/** The image a work's card shows, or undefined for a text-only card (ArtworkCard.astro picks it the same way). */
export function cardImage(data) {
  const key = data.card?.image === undefined ? 'full' : data.card.image;
  return key ? (data.images ?? []).find((i) => i.key === key) : undefined;
}

/** Where the small copy of an image is served. */
export const thumbPath = (src) => `/img/thumbs/${src.split('/').pop().replace(/\.[^.]+$/, '')}.webp`;

export const THUMB_SIZE = 240; // the longer side, in pixels: twice the largest size the search shows it at
