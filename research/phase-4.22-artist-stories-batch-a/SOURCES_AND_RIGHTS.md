# Phase 4.22 — Artist Stories Batch A: sources and rights

Verified 2026-10-29. Four Production Artist Stories, each with its own narrative engine, appended to the artist series
after *The Tortoise Trainer*. The rights policy is the one used since Phase 4.19:
- A work that cannot lawfully be reproduced is shown by its verified official page and a text-only card.
- Supporting images are other works, documents or ArtPilot diagrams, each named by `subject`, never presented as the
  work.
- Public domain is decided from publication and the maker's dates, never from a tag alone.
- Nothing was purchased or requested.

## The approved roster (20 artists)

**No authoritative planning source for the roster exists in the repository.** Searches of `docs/`, `research/` and
`src/` found no list of artist stories; the Phase 4.7A checkpoint plans only the Osman Hamdi Bey story, and
`ARTIST_CARDS` lists only published stories by design. As instructed, no duplicate source of truth and no placeholder
stories were created. The roster is recorded here for the Product Owner, as approved:

| Group | Artists |
|---|---|
| China | Su Shi, Zhao Mengfu, Xu Wei, Bada Shanren, Pan Yuliang, Zhang Daqian |
| Europe | Michelangelo, Artemisia Gentileschi, Rembrandt, Claude Monet, Vincent van Gogh, Pablo Picasso, Antoni Gaudí, Käthe Kollwitz |
| Other | Katsushika Hokusai, Nek Chand, Pacita Abad, Bodys Isek Kingelez, Oscar Howe, Osman Hamdi Bey |

Salvador Dalí was replaced by Hokusai. Dalí's place in the core curriculum is unchanged: the surrealism lesson still
teaches him, and a test checks that.

**Published so far (five of 20):** Osman Hamdi Bey, Vincent van Gogh, Katsushika Hokusai, Pacita Abad, Oscar Howe.

## Stories, cards and numbers

| Story | Slug | Engine | Card | No. | Face |
|---|---|---|---|---|---|
| 寄给提奥的信 | `van-gogh-letters-to-theo` | a bundle of letters, by letter number, not by year | Van Gogh, *The Bedroom*, 1889, Art Institute of Chicago 1926.417 | 132 | image (CC0) |
| 一个人为什么要一次又一次换名字？ | `hokusai-names` | a register of signatures, one name per chapter | Hokusai, *Under the Wave off Kanagawa*, c. 1830–32, Met JP10 | 133 | image (CC0) |
| (A+) | | | Katsushika Ōi, *Operating on Guan Yu’s Arm*, 1840s, Cleveland 1998.178 | 134 | image (CC0) |
| 带着颜色穿过国境 | `pacita-abad-colour-across-borders` | a passport: one stamp (place, year) per section | Abad, *New Kids in Class*, 1994, SAAM 2023.25 | 135 | text |
| 一幅被退回的画，和一封回信 | `oscar-howe-not-indian` | the 1958 letter: each quoted sentence opens a stretch of his life | Howe, *War Dancer*, 1966, Nelson-Atkins 78-16 | 136 | text |

**Numbering.**
- No renumbering: the batch appends after The Tortoise Trainer, which stays No.131.
- Courses 1–90 keep their numbers.
- The collection grows from 131 to 136 cards.
- Artwork ids, stored claims and timestamps are untouched.

**Why the one A+ card.** The Hokusai story's last chapter is about his daughter Ōi as a painter in her own right. Her
largest surviving painting is studied in that chapter, and its signature closes the story's name register. It is a
public-domain image (Cleveland, CC0). No other story got an extra card.

**Titles.**
- Hokusai: the working title's "twenty" was not used. The count depends on what is counted: *Wa-raku* says 30
  changes; Britannica says a principal name about once a decade plus some two dozen occasional ones; other catalogues
  count over fifty. The story makes that uncertainty a scene.
- Howe: refined so it cannot be read as "a rejected letter". It names the rejected painting and his reply.

## Infrastructure (smallest compatible extensions)

- `src/lib/publication.js`: four ids appended to `ARTIST_CARDS`. The comment notes that this list also orders the
  stories hall.
- `src/content.config.ts`: the essay `hero` takes an optional `role`.
- `src/components/EssayPage.astro`: when the hero work has an `officialPage`, the opening is the existing `WorkPlate`.
  The `image` is the lawful illustration, shown under its `role`, beside the work's typographic plate (as a lesson
  opening does).
- `src/components/WorkPlate.astro`: a `noun` prop (默认“本课”; stories pass “本篇”) so the plate does not say “本课”
  in a story.
- `src/components/EssayHall.astro`: artist stories are ordered by `ARTIST_CARDS`. Before, the hall sorted by file
  name, which would have put the new slugs before `osman-hamdi-bey`. An illustration that is not the work carries its
  role and “不是本篇的主角作品”. The hall's design is unchanged.
- `scripts/table-images.mjs`: a story's extra cards (`cards: […]`) get homepage table copies, as a lesson's do.
- New components:
  - `LetterColours`, `NameLedger`, `TrapuntoLayers` and `PointLine` (one per story).
  - `DotTally`, shared by the Van Gogh and Abad stories.
- Reused components: `Band`, `Callout`, `ArtworkFigure`, `FindOnImage`, `FirstLook`, `SortGame`, `InferenceChain`,
  `LessonComplete`.

## Images reproduced (new files in `public/img/`)

All museum images were checked as public domain / CC0 on the holding museum's page or API. Each was only resized and
recompressed: no cropping, no colour change. The signature enlargements in `NameLedger` are CSS windows onto the same
files, not new images.

1. **`van-gogh-bedroom-aic.jpg`**
   - Work: Van Gogh, *The Bedroom*, 1889, Art Institute of Chicago 1926.417.
   - Rights: the API returns `is_public_domain: true`, so the image is CC0.
   - Source and changes: IIIF at 3000 px, resized to 2400 px.
2. **`van-gogh-first-steps-met.jpg`**
   - Work: Van Gogh, *First Steps, after Millet*, 1890, Met 64.165.2.
   - Rights: Public Domain (CC0).
3. **`van-gogh-straw-hat-met.jpg`**
   - Work: Van Gogh, *Self-Portrait with a Straw Hat*, 1887, Met 67.187.70a.
   - Rights: Public Domain (CC0).
4. **`hokusai-great-wave-met.jpg`**
   - Work: Hokusai, *Under the Wave off Kanagawa*, Met JP10.
   - Rights: CC0.
   - Note: the user-named object (36491). The round stamp on this impression is the Met's own collection stamp, and
     the story says so.
5. **`hokusai-sumo-shunro-met.jpg`**
   - Work: Met JP741.
   - Rights: CC0.
   - Signature: 春朗画.
6. **`hokusai-basket-sori-met.jpg`**
   - Work: Met JP659.
   - Rights: CC0.
   - Signature: 宗理改北斎辰画.
7. **`hokusai-still-life-gakyojin-met.jpg`**
   - Work: Met JP1870.
   - Rights: CC0.
   - Signature: 画狂人北斎画.
8. **`hokusai-hitomaro-manji-met.jpg`**
   - Work: Met JP4, 1839.
   - Rights: CC0.
   - Signature: 前北斎卍. Publisher's seal: Eijudō.
9. **`hokusai-red-zhong-kui-met.jpg`**
   - Work: Met 14.76.37, 1846.
   - Rights: CC0.
   - Signature: 八十七老卍筆.
10. **`taito-ii-courtesan-met.jpg`**
    - Work: Katsushika Taito II, *Courtesan on Parade*, Met JP2831.
    - Rights: CC0.
    - Signature: 葛飾戴斗.
11. **`katsushika-oi-guan-yu-cleveland.jpg`**
    - Work: Katsushika Ōi, *Operating on Guan Yu’s Arm*, Cleveland 1998.178.
    - Rights: the API returns `share_license_status: CC0`.
    - Source and changes: the 3400 px "print" file, resized to 2800 px high.
    - Signature: 應為栄女筆.
12. **`brule-sioux-parfleches-met.jpg`**
    - Work: *Pair of Parfleches*, Brulé Sioux, South Dakota, 1880–85, Met 2011.154.152.1, .2.
    - Rights: Public Domain (CC0).
    - Use: the Howe story's opening illustration (role “拉科塔彩绘生皮盒，对照资料”). Howe named parfleche designs as
      a source of his abstraction (*Smithsonian*, 2022).
13. **`abad-moves-stamps-artpilot.jpg`**
    - Drawn by ArtPilot from the Abad estate's timeline: the places she lived or set out from, as passport stamps. It
      contains no work by Abad.
    - Use: the Abad story's opening illustration (role “本站绘制的示意图”).

Homepage table copies were regenerated (`scripts/table-images.mjs`).

## Copyright-protected works: what was searched and why the cards are text-only

- **Pacita Abad (d. 2004).**
  - SAAM marks “© Pacita Abad Art Estate”.
  - The estate site states its copyright and offers no open licence; NMWA credits the estate.
  - Commons has no VRT-cleared work. Its two files are a 252 px portrait marked `PD-self` by an account named for the
    estate, with no ticket, and a photograph of an installation.
  - No permission was requested and no licence bought.
  - Result: text-only card, with the official SAAM page. The story uses no textile images.
- **Oscar Howe (d. 1983).**
  - Nelson-Atkins marks “© Oscar Howe Estate”.
  - Commons has two Howe images tagged `PD-US-1978-89`, taken from a Department of the Interior booklet. A reprint in
    an unnoticed government booklet does not show that the paintings themselves are public domain, so they were not
    used.
  - The Philbrook's collection site sits behind a bot check, which was not bypassed.
  - Result: text-only card, with the official Nelson-Atkins page.
- **Umine Wacipi** (the rejected painting) is not the card. *Smithsonian* and the Portland guide say it has been lost.
  *American Indian* captions an image “Location unknown; private collection”. The story gives both.

## Quotations and translations

- **Van Gogh.**
  - Every quotation is ArtPilot's own Chinese translation of the French or Dutch original. The letters are public
    domain; the transcription is that of the Van Gogh Museum / Huygens edition.
  - Only short sentences are quoted. The edition's English translations, notes and facsimiles were not reproduced: its
    text is published under CC BY-NC-SA 4.0 and its facsimiles are not open.
  - Letters used: 1, 567, 577, 640, 668, 676, 705, 765, 766 (Theo), 779, 781 (Theo), 782, 800, 804, 806.
  - Counts come from the edition's overview: 903 letters in all; 820 by Vincent and 83 to him; 651 to Theo and 39 from
    Theo.
  - The sentence “ces vagues sont des griffes” is **Theo's**. Vincent quotes it in letter 676; Theo's own letter is
    lost. The edition's note 16 identifies the print as *The Great Wave*.
- **Hokusai.**
  - The 1834 *Fugaku hyakkei* postscript is paraphrased, not quoted, from nippon.com's summary. The original wording
    was not verified against a scan.
  - Signatures are given as the Met and Cleveland record them.
  - Legends are labelled. The “Ōi, Ōi” anecdote is marked as a later biography's story, and the meaning of “Ōi” as
    Julie Nelson Davis's reading.
  - Hokusai's “final words” are explicitly not repeated.
  - The 90+ house moves are marked as a tradition (Britannica).
- **Abad.** Quotations are short and taken from SAAM (“Traveling for me is my art school”, 1991; art in everyday life;
  “a fabric of nationalities”) and NMWA (the artist's social responsibility).
- **Howe.**
  - The letter's sentences are quoted only as published by *American Indian*, *Smithsonian* and the Portland Art
    Museum guide. The short English originals are given for the key lines, with ArtPilot translations.
  - Date and recipient: 18 April 1958, curator Jeanne Snodgrass (Portland guide).
  - No juror is named and no deliberation is described. The jurors' words are given only as the reported “a fine
    painting–but not Indian”.

## Key facts and their sources

- **Van Gogh.**
  - Letters as above.
  - AIC 1926.417: second version, September 1889; third, smaller version for his mother and sister.
  - *The Art Newspaper*, 9 October 2020 (Martin Bailey): Van Gogh Museum research on the first version's faded
    cochineal and violet walls. The story does not claim the same of the Chicago version.
  - Met 64.165.2: the photograph Theo sent; the “translations”.
  - Met 67.187.70a: more than twenty Paris self-portraits; painted on the back of a peasant study.
  - Overlap with course 61 is avoided: no cypresses, no letter 783; the story links to that lesson.
- **Hokusai.**
  - The Met records listed above: signatures; Eijudō; 46 prints; Berlin blue; Taito II misattribution.
  - Freer F1998.315: the name Taito passed to a pupil in 1820.
  - Britannica (Lane): birth, Nakajima, “is said to” for the lending library and engraver apprenticeship, 1778 Shunshō,
    1797 “Hokusai”, principal and occasional names, 90+ dwellings, 1849.
  - *Wa-raku*: the name list, 30 changes, 画狂老人卍 from 1834.
  - nippon.com: the 1834 postscript ages.
  - BM blog (Davis, 2017): Ōi's life, marriage and return, the name story, Eisen's comment, the letter on red pigment,
    how to look at *Guan Yu*, the possible “ghost brush”.
  - Cleveland 1998.178: signature, seal, “largest surviving painting”.
  - Overlap with course 50 is avoided: the four-person workshop is named in one paragraph and linked, not retaught.
- **Abad.**
  - pacitaabad.com/about: the year-by-year timeline. This includes 1981 trapunto and the doll-making friend; 1984
    Hawaii; 1986 scuba gear; and the 2004 bridge: 55 colours, 2,350 circles, opened 29 January.
  - SAAM artist page (Markoski, 2024): portability; Immigrant Experience; Ellis Island.
  - SAAM 2023.25: DC public schools 1986–94.
  - NMWA: “more than 50 countries”; materials; 20 ft.
  - The 50 / 60 countries discrepancy is shown as a sorting exercise, not resolved.
  - Overlap with courses 81 and 88 is avoided: neither mentions Abad.
- **Howe.**
  - *American Indian* (Harris, 2022): Crow Creek; Studio and the irony of “tradition”; degrees and teaching; *tahokmu*;
    the painting and the verdict; the first Annual entry winning the Grand Purchase Prize; grandmother Shell Face; often
    mistaken for a Cubist.
  - *Smithsonian* (Gardiner, 2022): the verdict; Ash-Milby on the letter and the next year's broadened criteria;
    parfleches and hide; Army service; MFA; “neo-Cubist”; the original lost.
  - Portland guide (2023): map facts; Studio style; two entries, one rejected; Snodgrass; Howe's own words on the line,
    the circle and “no abstract art”; 1959 and 1977 quotations.
  - Nelson-Atkins 78-16: *War Dancer*.
  - Overlap with course 83 is avoided: that lesson is about quilts and khipu; Howe is not mentioned there.

## Interactions (drawn by ArtPilot; none reproduces a protected work)

- **`LetterColours` (Van Gogh).** The reader colours an ArtPilot outline of the room from letter 705's colour words,
  then the painting appears beside it.
- **`DotTally` (Van Gogh).** 651 letters against 39. (The Abad bridge tally was removed in the refinement round.)
- **`NameLedger` (Hokusai).** Eight signatures on real works, enlarged from the museum images.
- **`TrapuntoLayers` (Abad).** Paint → stitch → stuff → sew on, front view and cross-section, on an ArtPilot motif.
- **`PointLine` (Howe).** A circle, points, straight lines to the nearest points, then planes, as Howe described his
  method. It is labelled as a sketch, not his painting or his colour symbolism.
- **Reused:**
  - `FindOnImage`: the Great Wave's title, signature and Met stamp.
  - `FirstLook`: Ōi's *Guan Yu*.
  - `SortGame` ×3: who wrote it, and how it survived (now in the closing section); record / anecdote / open
    (Hokusai); two Howe paintings twenty years apart (Howe). The Abad country-count game was removed.
  - `InferenceChain` ×2: the Chicago *Bedroom*; the 1958 verdict and the 1959 change.

There are no unlock gates; `LessonComplete` is unchanged. All motion respects `prefers-reduced-motion`.

## Open questions

- The exact wording of the 1834 postscript was not checked against a scan, so it is paraphrased.
- How Theo answered letter 705 is unknown, and the story leaves it blank.
- Whether *Umine Wacipi* is lost or in an unknown private collection: sources differ, and both are given.
- Abad's country count (50+ vs 60+) is stated in one sentence as a discrepancy, not resolved.
- ArtBridge: the estate's chronology says she worked on the bridge for a month after radiotherapy and gives 2,350
  circles; its ArtBridge page says seven weeks and "over 2,300". Both are given.
- The Philbrook's records (the 1959 rule change, the jurors) could not be consulted.

## Refinement round (Product Owner editorial review)

One targeted pass; no story was rewritten, and no artwork ID, card, number or collection behaviour changed.

**Van Gogh.** The "who wrote it" `SortGame` moved out of the middle of the 1888 letters into the closing section on
how the letters survived, where it sums up what that section explains; a one-line bridge now leads from letter 676 to
the damaged painting. The `InferenceChain` gets a lead-in sentence. No new facts.

**Hokusai.** Dramatic hierarchy: the numbered chapters are now the turning points (Shunrō; Hokusai, "the name the world
kept"; Iitsu and the *Great Wave*, now the stated centre of the story; Gakyō Rōjin Manji and the 1834 postscript, now a
set-apart quotation labelled as a paraphrase). "Gakyōjin" and Taitō became short unnumbered sub-sections, and their two
in-text plates were dropped (both signatures stay in the name ledger). The Fuji-series facts moved from the opening into
the Iitsu chapter.

Rendering. A headless-Chrome "Save as PDF" of the page reproduces both reported problems, and both are print
artifacts, not page defects:
- The site bar is `position: sticky` and the site has no print stylesheet, so a printout stamps the bar where the window
  last was (over the Ōi plate in the test PDF). The back-to-top button prints too.
- Tall hanging-scroll and portrait plates (the sumo print, Zhong Kui, Ōi's *Guan Yu*) do not fit the space left on a
  page, so the printer moves them to the next page and leaves blank pages behind.

On screen, at 1280 px and 390 px, the page has no overlap, no horizontal scroll and no gap over 600 px between blocks.
A two-line print rule (`.site-nav { position: static }`, hide `.to-top`) would fix the bar in exports; it is a
site-wide change, so it was not made in this round.

**Pacita Abad (priority).** No licensed image of her work exists, so none is reproduced; the story now leads the reader
to three verified official pages, each with specific viewing guidance written after looking at their images:
- Met 2024.286, *The Village Where I Came From* (1991): a new chapter. The Met's label says it is collaged from her
  1970s travel paintings (Sudan, Guatemala, Cambodia, Bangladesh); its record also shows the reverse, where the
  stitching traces the figures, and her inscription (transcribed in the Met's "Inscriptions" tab).
- SAAM 2023.25, *New Kids in Class* (1994): the alphabet board (Aunt, apple, azul; Ben, barrios; Carlos, casa; Paul,
  Pablo), the patterned backgrounds and flag, and SAAM's photograph of the reverse with her handwritten materials label
  (plastic buttons, Mexican beads, coconut shells, broken mirrors, lace, cotton yarn, flannel; padding).
- Estate, ArtBridge page: the tubes' ground colours, three kinds of circle, colours crossing between tubes, views from
  the deck and the bank, and her own words ("outdoor sculpture"; people passing on foot, by bicycle, car, bus and
  boat).
The country-count `SortGame` and the bridge `DotTally` (invented colours) were removed as trivia. `TrapuntoLayers` stays.
Short quoted phrases are from the estate's and museums' pages, translated by ArtPilot.

**Oscar Howe (priority).** His works stay unreproduced (© Oscar Howe Estate); the story now examines his own paintings
through verified pages:
- *Umine Wacipi*: no public image found. NMAI's online article keeps only the caption (image courtesy University of
  South Dakota). *Smithsonian* reproduces *Umine Dance* (1958, Garth Greenan Gallery), which it calls "a similar
  work", with abstract shapes "like gnarled lightning bolts" for the dance's sound; the story describes it, labels it as
  not the rejected painting, and says how alike the two are cannot be checked.
- *Hunter's Dream* (c. 1934–38, private collection, in *Smithsonian*) as Howe's own Studio-style example.
- Nelson-Atkins 2017.70 (c. 1945, title unknown, gouache) against 78-16 *War Dancer* (1966): a new comparison with a
  three-item `SortGame` placed before the written description, then a reading of *War Dancer* tied to Howe's own words
  on line, circle and arc, marked as ArtPilot's reading.
- *Courting* (1970) via *Smithsonian*'s description.
The parfleches and `PointLine` remain as context. The distinctions between the letter, the jurors' verdict, later
curators' readings and unknowns are unchanged.

**Fonts.** "充" (in the Abad summary) was missing from the hall subsets; both Noto files were regenerated (1,777 Han).
