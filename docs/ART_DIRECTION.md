# ArtPilot Art Direction — Contemporary Gallery (candidate, Batch 3.0 final correction round)

Status: candidate for Product Owner review. Implemented on one page: `/lessons/mountain-and-smallness/`.

## Identity

**The exhibition, not merely the website.** The work arrives first, alone, on a gallery wall. Reading
happens in a quiet paper space beside it. The interface borrows nothing from any one tradition: no
scrolls, paper texture, sepia, calligraphy, ornament or period decoration. Character comes from
typography, scale, pacing and the relationship between image and text, not from UI decoration.

## Two spaces

| Space | Ground | Used for |
|---|---|---|
| Gallery | `--gallery #171716`, light text | the opening (the full work and its wall label), the detail plates |
| Reading | `--paper #F6F6F4`, graphite text | narrative, quotations, interactions |
| Quiet wall | `--mist #EBEBE8` | composition diagram, reflection, sources and rights |

The grounds are hue-free neutrals (no cool blue cast, no beige). There is no chromatic UI accent; colour
comes from the artworks. `--ok #2F6B4F` / `--err #A4473B` appear only as small quiz marks.

## Typography: three voices

| Voice | Face (local fonts, in fallback order) | Role |
|---|---|---|
| Narrative | Noto Serif SC / Source Han Serif → Songti SC → sans | titles, section heads, body, classical quotations, reflection questions |
| Documentary | Noto Sans SC / Source Han Sans → PingFang → YaHei | labels, metadata, captions, facts, quiz options, sources, UI |
| Latin accent | Sitka → Iowan Old Style → Charter → Georgia | English titles (italic), section numerals, wordmark |

- A contemporary Song (Source Han Serif, 2017) is the standard face of serious Chinese editorial print.
  It is not an antique or calligraphic face, and it moves the page away from a tech-product voice.
  The sans and serif are one superfamily, so they pair naturally.
- Titles are set at weight 500 with 0.04em tracking, broken at the comma (one clause per line).
- Body (Phase 3.0-B): 18→20px fluid across desktop widths / 1.85, measure 38rem (≈30 characters per line), half-line paragraph gaps. Only the full-measure narrative column is justified; image/text pairs, notes, callouts and mobile text are left-aligned. Mobile body 17px / 1.85.
- Classical sources (in their original traditional characters) are set larger and airier (0.1em tracking),
  with the citation in the documentary voice.
- Facts are in sans on a mist panel. Interpretations are in serif beside a graphite rule. The typeface
  itself separates evidence from reading.
- No fonts are downloaded or bundled. Noto Serif SC / Noto Sans SC are OFL-licensed and could be
  self-hosted later as subsets (a Product Owner decision; it needs a subsetting step).

## Rhythm of a lesson

1. **Opening**: the full work on the gallery wall, with title and wall label (no UI chrome).
2. **Prelude**: a single large sentence, then three ways of looking (numbered, in a row).
3. **Narrative sections**: a Latin numeral hangs in the margin and the title is set in serif.
   Each section changes its spatial form:
   - single column with a full-width classical quotation
   - an image/text pair with the composition map
   - a gallery band of details followed by two-column notes
   - a reversed image/text pair
   - a short closing text
4. **Interactions**: introduced by a sentence of narrative and answered by one afterwards, so they read as
   part of the argument.
5. **Reflection**: the opening question returns on a quiet wall as open questions.
6. **Closing challenge**: every lesson ends with one question or small interactive game. Answering it correctly
   earns the work's card, and the unlock panel appears directly beneath it. Mid-lesson interactions (such as the
   scale slider) never award cards. `tests/contract.test.js` checks the quiz sits between reflection and sources.
7. **Sources, glossary, rights**: documentary voice, small and orderly.

## Components (current)

- `Band` (`prelude | plates | notes | reflection | sources`): one wrapper for changes of space.
- `CompositionMap`: the full work with schematic zone brackets (CSS only, labelled as approximate).
- `Split` (normal/reverse), `Callout` (fact/interpretation), `Term`, `ArtworkFigure`, quiz, slider, glossary.
- Shape family: pill actions, soft filled tag chips, 12px-rounded quiz rows, underline navigation.

## Interaction states

| State | Treatment |
|---|---|
| Hover | Surface tint or lighter graphite. Never a ring, never colour. |
| Selected | Graphite fill (filled radio dot, filled tag). |
| Focus-visible | 2px outline in the text colour of its space (graphite, or light on the gallery wall), offset 2–3px. |
| Correct / incorrect | Small muted green/red marks only. |

## Motion

120ms (state), 180ms (nav underline, slider figure), 240ms (feedback and definition settle: 4px rise + fade).
No scroll effects, parallax or page transitions. `prefers-reduced-motion: reduce` collapses all of it and
disables smooth scrolling.

## Not implemented (rules for later)

- Image zoom: a cursor change plus a small "放大" label in the caption row; the artwork itself never scales on hover.
- Aspect-aware opening: landscape and square works need a different opening composition (the gallery wall
  above, the label below).
- Detail locator (outlining the current detail on the full work): proposed, not approved.

## Open questions for the Product Owner

1. Should the Noto Serif/Sans SC pair be self-hosted (subset) so every visitor sees the intended typography?
2. Is the dark gallery wall right for all works (e.g. very dark paintings), or should the wall tone be per-work?
3. Should section numerals stay Latin, or move to Chinese numerals in the serif?
4. Does the reading length (~15 minutes) feel right as the template for longer lessons?

## Collectible cards (图鉴)

Status: the front/back structure, the visual hierarchy and the flip are **accepted** (Product Owner). Adapt them
to new media and aspect ratios as needed, but do not redesign the card system. This acceptance covers the card's
visual design only. The archive page, collection rules and data persistence are judged separately.

**Colour fidelity (product principle).** The card may be black and white; the artwork may not lose its colour
because of it. On the artwork record, in lessons and in details, every work is shown in its true colour. A
Mondrian, a Monet or a contemporary work keeps the monochrome card language, and its full colour and detail are
one step away: the back of the card links to the artwork record. Colour-removing filters are allowed only inside
`.art-card`, and `tests/color-fidelity.test.js` enforces this.

- A card is a magazine cover, strictly black and white. No colour, no metallic finish.
- One design for every art form: it must work with any image proportion, or with no image at all.
- Front:
  - **Masthead:** ARTPILOT in the display cut of the Latin serif, tracked wide, with an issue line beneath
    (藏品图鉴 · italic `No.001`).
  - **Cover image:** the work as a full-bleed monochrome photograph. The crop is a cover decision, set per work
    with `card.focus`; the uncropped work is on the artwork record.
  - **Title:** set vertically down the right edge in Noto Serif SC 300, running the full cover height.
  - **Cover lines:** English title in Latin italic; maker (serif 700) against period and form; then 1–4
    facets chosen per work, as label/value lines (a painting: 媒材/尺幅; a building: 材料/规模).
- No image (rights not cleared, lost works, performance, a record awaiting its photograph): the cover becomes
  purely typographic. The one-sentence description (`card.blurb`, at most 60 characters) becomes the cover
  headline, set as a pull-quote in the light serif. Every card has it, in any language and for any art form.
  The outlined issue number is reserved for the locked card, so an owned card is never mistaken for an
  uncollected one.
- What adapts per art form later, without redesign:
  - facets (a building: 材料/规模; a performance: 首演/地点);
  - the maker line (佚名 when anonymous);
  - non-Chinese titles, which the vertical title handles.
  If a work needs a punchier headline than its description, an optional cover-line field can be added then.
- States:
  - **Locked:** the masthead, an outlined issue number and how to earn the card. Nothing of the work is shown.
  - **Collected:** the full cover.
  - **Back:** the cover story, set like a contents page (light serif), with facts and links to the artwork
    record and the course.
- Motion: flipping takes 520 ms. On mouse or pen, the card tilts up to about 6° toward the pointer with a faint light. Under reduced motion, everything is instant and the card doesn't tilt.
- Sized in `em`: the mini card in the unlock moment is the same design at about half size.

## Navigation (Phase 3.0-B)

- **Back**: a quiet "← 课程列表" link at the start of the lesson nav, set off from the wordmark by a hairline.
  It is a plain link to the lesson list, so browser Back/Forward are untouched. Accessible name: "返回：课程列表".
- **Back to top**: a 44px round control, bottom right, `inert` while hidden. It never appears over the opening artwork.
  At ≥1440px it rests in the clear right gutter. Narrower, it appears only on a scroll-up (fading after 2.2s idle)
  or at the very end of the page, where the closing band leaves clear space. Smooth scroll, instant under reduced motion;
  focus moves to the lesson title. Press and hold for 0.5s (it lifts and darkens) to drag it anywhere in the window
  (kept 8px inside the edges); a press that slides off first is cancelled, like any button. Alt + arrow keys nudge it
  by 16px. The chosen spot is the only thing stored (`localStorage` key `artpilot.backtop`, a device preference).

## Artwork record

A catalogue sheet about the object, deliberately unlike a lesson: the plain page, the whole work on the left (held
in view on wide screens) and facts on the right in the documentary sans. It holds only the work's data, what is in
the picture (detail thumbnails with approximate positions), related lessons and the source/rights record. No dark
opening, no serif narrative, no interpretation: reading the work belongs to the lessons.
