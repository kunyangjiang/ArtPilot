# Phase 4.26 — Narrative Case 02: sources and rights

《两卷画，同一场雅集》 (`src/content/essays/two-scrolls-one-gathering.mdx`, route `/cases/two-scrolls-one-gathering/`,
Case 02 in the hall). Awards no card; the collection stays at 151. Artwork record `art-apricot-garden-met-001`
(`src/content/artworks/apricot-garden-met.json`), no card face.

## 1. The two scrolls

| | Met scroll | Zhenjiang scroll |
| --- | --- | --- |
| Holder | The Metropolitan Museum of Art, 1989.141.3 (Purchase, The Dillon Fund Gift, 1989) | Zhenjiang Museum (镇江博物馆), Jiangsu |
| Museum attribution | "After Xie Huan" / 中文 “明 传谢环” | 谢环 |
| Size | painting 37.1 × 243.2 cm; with mounting 37.5 × 1278.3 cm | c. 37 × 401 cm (museum page, via search snippet); colophons 667 cm (The Paper 2022) |
| Signature / artist's seal | none (Met: "No artist's inscription, signature or seal") | none (The Paper 2022) |
| Xie Huan in the picture | absent — Weng Tonghe: “画师谢庭循佚焉” | present at the head (Lu Jiugao; Wu: a later addition) |
| Provenance | Yang Changxu (18th–19th c.), Gu Heqing (1766–1836), Weng Tonghe (1830–1904), Wan-go Weng; sold to the Met 1989 | 关西后裔 seal on joins (Lu: Yang family); first later colophon 江德量 1765; 翁方纲 1791; 叶名琛 seals; remount c. 1875 (Lu); given by 唐寿民 after 1949 |

## 2. The gathering

正统二年三月初一 = 6 April 1437 (Met). Host Yang Rong; guests Yang Shiqi, Yang Pu, Wang Zhi, Wang Ying, Qian Xili,
Li Shimian, Chen Xun, Zhou Shu; Xie Huan (锦衣卫千户) arrived last and painted. Primary texts: Yang Shiqi's
《杏园雅集序》 and Yang Rong's 《杏园雅集图后序》, quoted from the Met's transcriptions (colophons 2 and 12). Li Dongyang's
《书杏园雅集图卷后》 (《怀麓堂集》卷73), as quoted by Wu: copies seen in the families of Yang Shiqi, Wang Ying and Yang Pu,
one heard of in Yang Rong's; “当时此本盖家有之”, “其规置意象皆出一轨”.

## 3. Sources consulted

1. Met object page 41478, read in a browser (overview, inscriptions tab with all fifteen colophons, provenance,
   references); collection API v1.1 for metadata and image list.
2. Maxwell K. Hearn, "An Early Ming Example of Multiples" (Issues of Authenticity in Chinese Painting, Met 1999,
   pp. 221–256), read in full from the Met's free PDF (scanned; read as page images).
3. 吴诵芬《镇江本〈杏园雅集图〉的疑问》, 故宫学术季刊 27:1 (2009), pp. 73–101, read in full (NPM PDF).
4. Library of Congress, 《二园集》 (item 2012402482): catalogue record, rights statement, page scans.
5. The Paper (澎湃新闻), 27 Aug 2022, on the Zhenjiang loan to the Liaoning Provincial Museum.
6. Zhenjiang Museum object pages: the site returns 403 from this network (also in a browser). Their text is known only
   from search-engine snippets (dimensions; Xie Huan's office). Linked, not quoted beyond the dimensions.

Scholars whose views reach the story through Hearn's and Wu's notes (not read directly): 陆九皋 (1963, 1986),
铃木敬 (1995), Hou-mei Sung 宋后楣 (1989), Richard Barnhart 班宗华 (1993), Mary Ann Rogers (ghost painters).

## 4–5. Interpretations and disagreement

- **Hearn 1999 / the Met today:** both scrolls made shortly after the event for different participants; Zhenjiang =
  Xie Huan's original composition for Yang Rong; Met = condensed version, probably for Yang Shiqi, by an associate;
  Xie's supervisory role unknown. Evidence: Yang Shiqi's texts treated differently from the transcribed others;
  early-Ming face construction (nose first); Shang Xi-type rock texture in the Met scroll; furniture
  "inaccuracies"; narrow hat flaps in both paintings vs wide in the 1560 print.
- **Sung, Barnhart:** different hands; Barnhart: two artists, one Xie, the other probably an assistant.
- **Suzuki:** the Met version keeps more Yuan/early-Ming and Zhe-school traits, with a more individual brush.
- **Wu 2009:** the Zhenjiang scroll is not one hand (Xie portrait added later: moss dots show through, robe colour,
  pale face, missing robe-opening line; first group vs groups 2–3); costume against rank (Wang Zhi, Yang Pu,
  Li Shimian); colophon calligraphy unlike the same men's other writing; provenance gap 1437–1765. Hypothesis: a
  copy after a line drawing like the print; recommends not using it as Xie Huan's benchmark. Wu says herself which
  part, if any, is Xie's cannot at present be settled.
- **Reading Li Dongyang's “出一轨”:** Wu reads it as evidence that contemporary copies were near-identical; the
  story notes the condensed-version reading as the other side (this framing is the story's, attributed to neither).

## 6. Images used (all in `public/img/`)

| Key | File | Source | Rights |
| --- | --- | --- | --- |
| full | apricot-garden-met.jpg (3913 × 542) | Met DT210847 | Met Open Access, CC0; recompressed only |
| center (hero) | apricot-garden-center-met.jpg | Met DP273873 | CC0; recompressed only |
| opening | apricot-garden-opening-met.jpg | Met DP-19448-002 | CC0; black bands cropped, resized |
| weiqi | apricot-garden-weiqi-met.jpg | Met DP-19448-003 | CC0; detail cropped, resized |
| yang-rong | apricot-garden-yang-rong-met.jpg | Met DP274462 | CC0; resized |
| preface | apricot-garden-preface-met.jpg | Met DP-19448-006 | CC0; text portion cropped, resized |
| poems | apricot-garden-poems-met.jpg | Met DP-19448-008 | CC0; black bands cropped, resized |
| print-xie | apricot-garden-print-xie-loc.jpg | LoC 2012402482, vol. 1 spread 3–4 | LoC: no known copyright or other restrictions (World Digital Library); margins cropped, resized |
| print-seated | apricot-garden-print-seated-loc.jpg | LoC 2012402482, vol. 1 spread 5–6 | same |

Each print image carries a `subject` saying it is a c. 1560 woodblock print, not either scroll.

**Not used:** any image of the Zhenjiang scroll. The museum offers no open licence; the Wikimedia Commons file
“杏園雅集圖.jpg” is tagged public domain but gives no photographer or source, so it was not copied. Journal
illustrations in Hearn and Wu are not copied. The Met scroll is never shown in place of the Zhenjiang one.

## 7. Official viewing links for restricted material

Zhenjiang Museum page (linked in the look-callout and sources; 403 from here, see §3.6); The Paper 2022 report with
exhibition photographs. The look-callout tells the reader what to find (the head figure's robe, face and collar;
which figures wear badges) before the text that describes Wu's findings.

## 8. Observations the story uses

On the Met images, checkable by the reader: Weng Tonghe's list and “画师谢庭循佚焉”; the badge on the dark-green
stroller; collector's seal on the mount; seating of Yang Rong (red), Yang Shiqi (blue), Wang Zhi; only Yang Rong of the
three has a badge; short hat flaps; weiqi board without star points; Yang Shiqi's clerical preface; the two scripts of
Yang Rong's and Yang Pu's poems. On the print: names cut beside every figure, badges for all, wide hat flaps, 谢君廷循 at
the head. The Met lists Zhou Shu as "died 1436" although he attended in 1437; the story records this as a catalogue
discrepancy (Wu's table gives "?–after 1437"; Ming shi: died in office early Zhengtong) and changes nothing.

## 9. Fiction and devices

Invented: 城南美术馆, the reproduction exhibition “同一天”, 顾衡 (senior researcher), 林禾 (research assistant),
许岚 (exhibition editor), the director, the seven-day schedule, all dialogue, the 150-character label rule, the final
label text, the wall layout and poster title. They work only from published images and texts and never handle a
scroll. The reasoning “关西后裔 only says a Yang” is flagged as the story's own. A Band (prelude), a `fiction`
Callout and the closing “这个故事里哪些是真的” note mark the boundary.

## 10. Unresolved

Whether the Zhenjiang scroll is Xie Huan's scroll for Yang Rong; who painted the Met scroll and for whom; how many
versions were made in 1437; the Zhenjiang scroll's whereabouts 1437–1765; Xie Huan's dates (the reading of his 1452
inscription is disputed). No published material analysis of either scroll was found.

## Implementation and checks

- New: the essay, the artwork record, nine images, `src/components/LabelDraft.astro` (a label card that rewrites
  itself for each wording, with what it claims / rests on / where it stops; no right answer, no score; 390 px stacks;
  reduced motion drops its fade), `tests/case-02-apricot-garden.test.js`.
- Reused: ScrollUnroll, FindOnImage, FeatureCompare, InferenceChain, SortGame, ArtworkFigure, Callout, Band.
- Fonts: 稿 and 珑 were missing; both Noto subsets regenerated (fonttools 4.55.3, brotli 1.1.0; sources Noto Serif SC
  2.003, Noto Sans SC 2.004); 1,905 Han; 674 KB / 517 KB.
- A defect found and fixed during the browser check: LabelDraft first used `data-reading`, which ReadingTracker looks
  up document-wide, so the page stored `undefined:undefined`. Renamed to `data-ld-for`; a test now forbids
  `data-reading` in any other component.
- `npm test` 103/103; build 269 pages; no literal `**` in the page text (the six existing `**` hits in `dist` are
  JavaScript exponents in bundled scripts).
- Browser (port 4400, stopped afterwards): 1280 and 390 px — no overflow, 11/11 images, no console errors on a fresh
  load; FindOnImage 3/3, ScrollUnroll opens at the right end and its stops move, FeatureCompare 4 features with rings,
  InferenceChain 3 claims to their verdicts, SortGame 3/3, LabelDraft 4 wordings. Hall order: Chartres 01, this 02.
  Chartres unchanged. Continue Reading shows the case at 44% and `#resume` returns there. Reduced motion verified in
  the built CSS only (the browser tool cannot emulate it).
