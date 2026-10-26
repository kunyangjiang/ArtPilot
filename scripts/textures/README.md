# Course book textures

Procedural textures for the course book (`src/components/courses/BookCatalogue.astro`): SVG noise filters, made here,
so there are no image rights to clear. The page uses bitmaps rendered from them once, in `public/img/textures/`,
because drawing the filters in the browser stalls the page on arrival.

| Source | Bitmap | Rendered at | Shown at |
|---|---|---|---|
| `desk-oak.svg` | `desk-oak.webp` (quality 0.82) | 2400 × 1500 | covers the reading table |
| `paper.svg` | `paper.webp` (quality 0.9) | 1040 × 1040 (2×) | 520 px tiles |
| `book-cloth.svg` | `book-cloth.webp` (quality 0.9) | 600 × 600 (2×) | 300 px tiles |

To change one: edit the SVG, then render it in Chrome at the size above (draw it onto a canvas of that size and
export it with `canvas.toDataURL('image/webp', quality)`), and replace the bitmap.
