# Phase 4.28 — 同时代的世界 (The World at the Same Time): sources and decisions

Prepared 2026-10-30. Status: **built and tested, awaiting review. Not released.** Nothing is committed.

The hall lives at `/atlas/`. It adds no lessons, stories, cases or cards. The collection stays at 151 cards and the
numbering does not change. Every work in the hall is an existing artwork record, reused by its ID. The only exceptions
are four text-only context entries in window 01, which have no record, no image and no card.

## Files

| File | Role |
| --- | --- |
| `src/lib/atlasTime.js` | Historical years with no year zero, labels, overlap, gap and the six relation kinds |
| `src/data/atlas.ts` | 8 bands, 48 historical places, 4 context entries, 9 windows (121 entries, 18 comparisons, gaps) |
| `src/components/atlas/AtlasHall.astro` | The hall: timeline, works grid, region filter, three tools, compare, panel |
| `src/pages/atlas/index.astro` | The route |
| `src/data/home.ts` | The homepage destination 04 now links to `/atlas/` |
| `src/components/BackLink.astro` | "返回：同时代的世界" when the visitor came from the Atlas |
| `tests/atlas.test.js` | 9 tests: data integrity, BCE/CE arithmetic, the built page |

The work did not touch the protected untracked files: `src/data/constellation.ts`, `src/lib/constellation.ts`,
`src/lib/backdrops/`, `src/lib/bgStudies/`, `src/lib/desk/gallery.ts`, `public/img/kandinsky-improvisation-30-large.jpg`
and `public/img/xu-wei-bamboo-scroll-npm.jpg`.

## 1. The windows are navigation aids, not periods

There are nine windows: 01 deep time to 3001 BCE; 02 3000–501 BCE; 03 500 BCE–299 CE; 04 300–899; 05 900–1399;
06 1400–1699; 07 1700–1849; 08 1850–1944; 09 1945–today. The page says this in the header caveat, and each window's
orientation repeats it. The boundaries are round numbers chosen to spread the collection evenly. They are not claims
about when anything began or ended. The windows are contiguous, and none of them crosses year zero (both are tested).

## 2. Date model

- Years are historical: 1 BCE is `-1` and 1 CE is `1`. There is no year 0 anywhere. `yearLabel(0)` throws.
- All arithmetic goes through `astro()`, so the gap from 1 BCE to 1 CE is one year.
- Each entry has `from`, `to`, a `precision` and the label as the record or lesson writes it. The seven precisions and
  their counts across the 121 entries:

  | Precision | Count |
  | --- | --- |
  | year | 39 |
  | range | 16 |
  | approx | 39 |
  | century | 9 |
  | period | 7 |
  | disputed | 8 |
  | deep | 3 |

- `from`/`to` bracket the record's own wording; they never narrow it. Disputed dates take the widest span the sources
  give, and the label states the dispute.
- Relations claim only what the dates allow:

  | Relation | When it applies |
  | --- | --- |
  | same-year | Both dates are firm single years, and the same year |
  | same-decade | Both dates are firm single years, less than ten years apart |
  | overlapping-ranges | Both spans are documented and share years |
  | shared-period | The spans share years, but at least one is an estimate |
  | adjacent | The spans do not overlap, and the gap is under 100 years |
  | apart | The gap is 100 years or more |

  An "approx." date can never yield "同一年".
- Narrowing the range inside a window marks estimated entries as estimated, and the readout counts them separately
  ("10 件，其中 6 件年代为估计"). Narrowing is switched off in window 01, where single years mean nothing.

## 3. Place model

- **No invented coordinates.** Each entry points to one of 48 historical places (`ANCHORS`), such as 平城, 秣菟罗,
  大不里士, 伊费 or 帕伦克附近. There is no latitude or longitude.
- **The plan view is schematic.** View C sets each place on a 26×14 grid by its band and rough relative position. The
  page labels it as a diagram, not a map. After review it became a tile map: each cell of the same grid is land, an
  island or sea (`LAND` in AtlasHall.astro), drawn so that every anchor sits on land, with continent and ocean names.
  The note under it says shapes and distances are not to scale. The anchors themselves did not move.
  The map follows the timeline: with the script, the map's counts and the list under it are drawn from the grid's
  works (the selected years and region). Near a window's edge, these include works of the neighbouring window. So
  the map, the list and the grid always count the same works. A place with none in the selected years shows the small
  empty mark and cannot be chosen. A chosen place lets go on a second click, a click elsewhere, Esc or 显示全部地点.
  Without the script, each window's map and list show that window's works.
- **Reloading keeps the layout still.** Three small inline scripts draw the page's scripted state as it streams in.
  The first, at the top of the hall, marks it scripted. The second, after the timeline, draws the year, cursor, range
  and marks from the address (`#y…` or `#period-…`). The third, after the grid, sets the heading, counts, regions and
  works in renderWorks() order. Without them, a reload showed 1150 first, then moved. The hall restores its own scroll
  once the height is final, instantly, because the site's smooth scrolling would otherwise slide it. Checked
  address by address: the state before the module and after it are identical, height included.
- **On the homepage.** Like the stories folder and the cases board, the hall has its piece on the desk: the last
  section, `#st-atlas` in StudyTable.astro. It pairs a paper label (同一年，不同的世界) with a chart in the hall's Swiss
  grid. The chart shows the outline year 1150 and four works from four parts of the world, all in the hall's opening
  selection (马远《山径春行》, 吴哥窟, 孔克门楣, 舞王湿婆). Their dates and places come from atlas.ts and their images and
  credits from the records. Under them runs the hall's nine-window timeline with 1150 marked. On the homepage, the
  site bar's 同时代的世界 scrolls down to it, as 艺术家故事馆 and 案例库 do; its link opens the hall at `#y1150`.
- **Background: the Swiss grid.** Fourteen studies were tried on the page with a switcher: seven recommended, seven
  raised in review and not recommended. The PO chose the Swiss typographic grid, after Müller-Brockmann's *Grid
  Systems in Graphic Design* (1981). `AtlasBackdrop.astro` draws twelve faint columns, a baseline and one red rule,
  dimmed where the works are. It also sets the selected year very large in outline, bottom left, and follows the
  timeline. After review the year got a firmer outline and a faint fill, and it is not under the centre dimming, so
  it reads as one figure. The other studies and the switcher were removed.
- **Precision is stated per entry:** site, city, region, tradition or unknown.
- **One work cannot be placed.** The Admonitions scroll (`art-admonitions-scroll-001`) has `anchor: null` and sits on its
  own "地点无法确定" wall in view B. The tests allow a missing anchor only when the precision is `unknown`.
- **Places are historical production places,** not current museums. For example, the Xu Beihong painting is placed in
  Paris, following the 1930 《良友》 note in the lesson, and the Maitreya in Shanxi.

## 4. Simultaneity is not influence

Every comparison carries a `contact` field, with one of three kinds:

- **none-known:** the page says outright that no contact is known.
- **documented:** contact is backed by a site lesson that documents it.
- **indirect:** a shared trade or political world, not contact between the works.

Of the 18 comparisons, 11 are none-known, 5 documented and 2 indirect. Each one cites at least one lesson or essay, and
the tests check that every cited slug exists.

| Comparison | Kind | Evidence |
| --- | --- | --- |
| c02 Indus–Mesopotamia | documented | Indus seals found in Mesopotamia, per the seal lesson |
| c03 Kushan Buddhas | documented | One empire, two workshops |
| c04 Buddhism east | documented | Pingcheng, Baekje, Asuka transmission, per the three lessons |
| c06 Tabriz–Istanbul | documented | Shah Quli's move, per the lesson |
| c06 Meeting Europe | documented | Each work documents its own encounter with Europeans |
| c05 1347–1355 | indirect | A shared Mongol-era world; no contact between the three works |
| c08 1905 | indirect | Paris-trained or Paris-aware painters; no contact between the three works |

### Claims removed during fact-checking

Every entry note was checked against its record and its lesson. Any sentence that neither supported was cut or
rewritten. These contact claims were removed:

- Roman trade with India, used as a link between the Pantheon and Mathura. The comparison is now none-known.
- Song–Chola embassies, used as a link between Fan Kuan and Brihadishvara. Now none-known.
- Edo trade with the Dutch, used as a link between Sharaku and David. Now none-known.

### Factual corrections against the records

- The Taíno zemí is stone, not wood.
- Xu Beihong's painting was made in Paris, per the 1930 《良友》.
- The Maitreya is from Shanxi.
- Three of the hippo's legs are restored.

There were further smaller corrections to medium, date wording and attributions.

## 5. Context entries (window 01 only)

The deep past has too few records to say anything about simultaneity. Window 01 therefore adds four text-only entries
that are not collection works. They have no image, no card and no record page, and each one cites its source:

| Entry | Source |
| --- | --- |
| ctx-sulawesi-scene | Oktaviana et al., *Nature* 2024 (minimum age 51,200 years) |
| ctx-blombos-drawing | Henshilwood et al., *Nature* 562 (2018) |
| ctx-cueva-manos | UNESCO World Heritage Centre, No. 936 |
| ctx-gobekli-tepe | UNESCO World Heritage Centre, No. 1572 |

The c01 comparison is about how "earliest" dates work (minimum ages, layers, dated pigments), not about who came first.

## 6. Selection and gaps

The hall has 121 entries, and each work appears once. Europe makes up under 30% of placed entries (tested). Each window
ends with a "本站还缺什么" list.

**Window 07 (1700–1849) is the weakest.** The collection has records from only East Asia and Europe for those years. No
new cards were allowed, so the window says so region by region: Africa (Asante, Dahomey), Ottoman, Qajar, late Mughal and
Rajput painting, the colonial and Indigenous Americas, and Oceania. The test requires a window with fewer than three
regions to name what it lacks, rather than pass in silence. This is the clearest candidate for future collection work.

Other notable gaps are listed on the page:

- window 03 has nothing from Africa, West Asia or the Americas;
- window 04 has nothing from West Asia;
- Oceania appears only in window 08.

## 7. Text-only works

Works whose record uses `officialPage` (copyrighted works) are shown as typographic cards with a link to the official
page, on the cards, in the tools, in the panel and in comparisons. There is never a stand-in image; the built page is tested for this.

## 8. The hall after the UI refinement (supersedes the A–D draft switcher)

The Product Owner reviewed the drafts and asked for a simpler, artwork-first hall. The hall now has three levels.

**Level 1: time.** The opening timeline from 8a is the only time control. There is one selection, with two modes:

| Mode | How it is chosen | Interval | Hash |
| --- | --- | --- | --- |
| Near (default) | Drag, slider or keyboard | The year ± about a tenth of its window | `#y1150` |
| Whole period | The numerals I–IX under the axis, or the toggle | The window's own years | `#period-05` |

- The near margin is ±50 in window V and ±10 after 1850. The span is computed by `nearSpan()` in `atlasTime.js`, which
  is tested. It reaches no further into a neighbouring window than that window's own margin. The bug this prevents:
  公元前 6000 ± 10,000 used to run to 2026; it now stops at 公元前 2750.
- **How the span is shown.** The span appears as a short brick stroke on the slider line, with no tint over the rows
  and no end ticks.
- **Dragging.** While a hand drags, the cursor and timeline follow every frame, and the works grid updates once the
  hand pauses or lets go. Keyboard and button moves glide the cursor (0.38s ease-out). Newly arriving cards fade in.
  The year digits are tabular, so the number does not jitter. All motion stops under reduced motion.
- A toggle under the axis switches between "前后 50 年" and "整个第 V 时期". The heading above the works always states
  the interval in years, for example "1150 年前后 50 年：1100 年至 1200 年" or "整个第 V 时期：公元 900–1400 年".
- In window mode the big year shows the period, and the cursor gives way to a band over the whole ninth.
- The old window tabs, the A–D switcher and the second narrowing slider are gone.

**Level 2: works.** Under the timeline are the cards of every work whose dates overlap the interval, from all windows.

- **Order.** The order is balanced across parts of the world: round-robin, earliest first. The first 12 show, with a
  "显示全部 N 件" button for the rest.
- **Each card.** A card shows its real image, or the typographic card for a copyrighted work with its official page.
  It also shows the region, title, maker, date with an "年代为估计" tag where it applies, and the significance note.
  "来源与链接" opens the facts, sources, record, lessons and stories. There are also "详情" (opens the panel) and
  "加入比较" buttons.
- **Regions.** Region buttons above the grid show counts for the current interval; regions with none are hidden.
- **Empty or thin results.** A near interval with fewer than 3 works, or a region with none, says so. It offers
  "看整个第 N 时期" or "回到全部地区" and never widens by itself.
- **Selectivity.** A standing note says the collection is selective and that simultaneity is not influence.

**Level 3: deeper into the period (on request).** The three tools below all follow the period of the selection and the
same region and interval filters:

| Tool | What it holds |
| --- | --- |
| 时期全貌 | The former view A: the window's time axis with the interval slab, the legend and the gaps list |
| 制作地平面图 | The former view C: production places, not museums; places outside the active region are disabled |
| 本站的对照 | The former view D: the curated comparisons with their contact evidence |

- **What happened to view B.** The six walls were folded into the works grid and its region filter, because they did
  the same job.
- **Opening a comparison from a work.** A work's panel lists the site's comparisons it belongs to, and each leads to
  that comparison.

**Comparing any two works.** Any two works can be compared side by side. The panel shows:

- both works with their date, place, type and region;
- the time relation from `relation()`, which never claims more than the dates allow;
- the contact. If a curated comparison holds both works, the panel uses its documented contact statement. Otherwise
  it says the site has no record of contact and that closeness in time is not influence.

**Without JS.** The timeline stands at 1150, all 121 cards read by date, and each window's comparisons read in full.

## 8a. The opening timeline (added after review)

The Product Owner shared a reference: a scrubbable world timeline with one row per region and a year cursor. They
asked for "a similar design". The hall now opens with that composition, built from its own data and in the house type
and tones. No text or branding from the reference was copied.

- **The axis.** All 121 entries sit on one axis, with a row for each of the six walls, plus "地点无法确定". Firm dates
  are lighter marks; estimated dates are fainter.
- **The scale.** Each window takes an equal ninth of the width. The scale is even inside a window but not across
  windows: 72,000 years of deep time take the same width as 1945–2026. Thin rules and the Roman numerals I–IX under the
  axis mark the ninths, so the uneven scale is visible.
- **The year.** The large year display uses `yearParts` (公元前 / 公元 / 约公元前 … 万). The reader moves it by dragging
  across the rows or with the slider, which supports the keyboard and has `aria-valuetext`. Years round to plain numbers
  as written (公元前 1750, not 公元前 1751) and never land on year 0.
- **"Near".** A work counts as near when its span comes within the window's own margin of the chosen year. The margin
  is about a tenth of the window, rounded to a plain number: ±50 years in window V, ±10 in IX, ±10,000 in I. It was
  widened from a twentieth in the refinement, so the opening interval holds 8 works rather than 3. Near marks turn
  brick red.
- **Later changes.** Section 8 describes how the timeline now drives the whole hall. The first version's year list,
  jump buttons and counts row were replaced by the works grid.

## 9. Background

**There is no decorative background.** Three designed rooms were tried in this phase, and all were rejected:

1. Rods, points and a red cutting plane: "not clean enough… heavy metallic feel".
2. Matte lines with a tall red plane: "I don't want that big vertical red bar".
3. Nine stacked plates, which read as floating diamonds. The UI refinement asked for them to be removed.

**How it was removed.** The room was drawn by `src/lib/desk/atlas.ts`, which only the Atlas hall imported. That file
and the hall's canvas were removed. The page now sits on the plain dark ground from `Base dark`. The shared drawing code
(`ground.ts`, `proun.ts`) and the other halls' rooms were not changed.

## 9b. Colour: the region code, and the three homepage series

**The Atlas stays Swiss. It gets a colour code** after Otl Aicher's for Munich 1972. Each of the six parts of the world
has one muted flat colour (`BAND_COLOUR` in `src/data/atlas.ts`; band pairs share a wall's colour). Place unknown is
grey. The colour marks:

- a region's name, with a small square before it, on cards, region buttons and timeline rows;
- the region's marks on the timeline;
- the four works on the homepage chart.

None of the colours is red, because brick stays the one signal for the selected years. The grid, the outline year and
the layout did not change.

**The homepage Cases board moved from Swiss to a toned-down Constructivist factography.** It now has:

- cool grey newsprint, kept apart from the Stories' warm washi after review;
- black and one muted vermilion, with the question in a red band;
- the evidence as cut-out colour photographs on the diagonal, with black arrows to the question;
- the dates on a Prussian-blue bar.

A first version made the photographs black and white with a halftone screen. That was dropped in review, because in
this case the colour of the glass is the evidence. A heavy diagonal red stripe was also too loud, and is now a thin
rule.

**Fewer notices (review, 2026-10-30).** The hall dropped its explanatory small print, at the owner's request:

- the timeline's how-to line;
- the "the collection is selective / at the same time is not influence" paragraph and its echoes in empty states and the
  pair panel;
- the note on dating in the deep window;
- the map's scale note.

The map legend is now just "所选年份的作品件数 / 没有收录". The written comparisons themselves were not changed.

## 10. Not done, and open questions

- **Font subsets.** `scripts/fonts/collect-chars.mjs` does not include `/atlas/`. Characters used only on the Atlas may
  fall back to the system font until the subsets are regenerated. Regenerating needs the font sources and the venv, so
  it was not done.
- **The site bar.** The hall's entry in the site bar was not refined, per the brief, which excludes Logo and Site Bar
  refinement.
- **Release.** The phase is not marked RELEASED.
