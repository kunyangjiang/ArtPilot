# Self-hosted fonts for the homepage and the course book

`/` and `/courses/` use three open-source families, served from `public/fonts/` as WOFF2 and declared in
`src/styles/fonts.css` under their own names (`ArtPilot Bodoni`, `ArtPilot Serif SC`, `ArtPilot Sans SC`), so the
same files render on every system whatever is installed locally. Nothing is requested from a font CDN. The collection
and the halls of stories and cases use them for their display type only; lessons, articles and artwork records keep
their existing type.

| File | Family | Source (google/fonts, `main`) | Version | Axes kept | Size |
| --- | --- | --- | --- | --- | --- |
| `bodoni-moda-500.woff2` | Bodoni Moda | `ofl/bodonimoda/BodoniModa[opsz,wght].ttf` | 2.005 | none (static: opsz 11, wght 500) | 13 KB |
| `bodoni-moda-500-italic.woff2` | Bodoni Moda Italic | `ofl/bodonimoda/BodoniModa-Italic[opsz,wght].ttf` | 2.005 | none (static: opsz 11, wght 500) | 15 KB |
| `noto-serif-sc-300-600.woff2` | Noto Serif SC | `ofl/notoserifsc/NotoSerifSC[wght].ttf` | 2.003 | wght 300–600 | 420 KB |
| `noto-sans-sc-300-500.woff2` | Noto Sans SC | `ofl/notosanssc/NotoSansSC[wght].ttf` | 2.004 | wght 300–500 | 320 KB |

Bodoni Moda is one static cut matched to the Bodoni MT the design was approved with: optical size 11 (the display
sizes' hairlines vanish inside the image-filled stage numerals) and weight 500 (stem 0.146 of the figure height;
Bodoni MT 0.141, Bodoni Moda 400 only 0.124). The book scales its numerals by 0.854 so their figure height matches.

All three are licensed under the SIL Open Font License 1.1; the licence files are served beside the fonts
(`public/fonts/OFL-*.txt`). Noto Sans SC carries the Reserved Font Name "Source", which these subsets do not use as a
font name. The subsets keep every name record (copyright, trademark, licence).

## Subsets

The Latin files hold printable ASCII and a few punctuation marks. The Chinese files hold printable ASCII and every
character that appears on `/`, `/courses/`, `/collection/`, `/stories/` and `/cases/`, including the labels the
homepage note card shows and the text its scripts write (1,124 Han characters at the time of writing). A character that
is not in the subset falls back to the next font in the stack (a locally installed Noto or the system's Song / Hei),
so new text never disappears, but it should be added to the subset.

## Regenerating

When text on `/`, `/courses/` or `/collection/` changes (a new lesson, a new card):

1. `npm run build`, then `node scripts/fonts/collect-chars.mjs > site-chars.txt`.
2. Download the four source files above and their `OFL.txt` from https://github.com/google/fonts.
3. In a throwaway virtualenv: `pip install fonttools==4.55.3 brotli==1.1.0`, then
   `python scripts/fonts/make_fonts.py <sources dir> site-chars.txt public/fonts`.
