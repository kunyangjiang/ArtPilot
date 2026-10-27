# Phase 4.7A checkpoint — Artist Story and Narrative Case: research, plans, homepage integration

Date: 2026-10-27. Status at the checkpoint: STOP for Product Owner review. Later the same day the PO approved sections 5, 6 and 8 (No.074, artist range 074–093); both articles were then written and published with the homepage folder and board.

## 1. Baseline

- Branch `main`, HEAD `c12695f83da26623c6215e552fff7d48c9312a75` = `origin/main` (fetched).
- Uncommitted before this phase (kept): the phone site-bar redesign (`src/styles/global.css`, font scoping in
  `src/components/home/StudyTable.astro`), the preview route (`src/pages/preview/[concept].astro`) and five untracked
  preview components.
- Build and tests at the end of this checkpoint: build passes (27 pages); `npm test` 51/51.

## 2. Reusable components and patterns found

| Need | Already there |
| --- | --- |
| Reading page | `src/pages/lessons/[slug].astro`: Base + SiteBar (`nav.back`, `hall`, `links`), `.opening` hero, the `.lesson` article typography in `global.css`, `ArtworkFigure`, `ArtworkRights`, `BackToTop` |
| Continue Reading | `src/lib/reading.js` already lists the kinds `lesson`, `artist-story`, `case`; `ReadingTracker.astro` takes `kind` + `id`; the homepage resolves an entry through a registry (today only `lesson` is filled) |
| Halls in the site bar | `src/data/home.ts` `destinations`: a hall becomes a link everywhere the moment it has an `href` |
| Images and credits | artwork records (`src/content/artworks/*.json`) with per-image `credit` or one `imageSource`; `imageCredit()` |
| Cards | `card` on an artwork record; number = the awarding lesson's course (`cardNumber`, 1–73); `ArtworkCard` stops the build for a card no lesson awards |
| Homepage | `StudyTable.astro` (table, stacks, card box, slip, line field); `scripts/table-images.mjs` for table copies |

## 3. Sources

### Osman Hamdi Bey and *The Tortoise Trainer*

- Pera Museum, R. Barış Kıbrıs, "From the Age of Reason to the 'Tortoise Trainer'" (30 April 2021) — 1906 Salon at the
  Grand Palais, opened 1 May; catalogue no. 783 *L'homme aux tortues*; artist listed as "Hamdy Bey".
  https://peramuseum.org/blog/from-the-age-of-reason-to-the-tortoise-trainer/1566
- Pera Museum, exhibition page *Osman Hamdi Bey* — his use of photographs of himself in costume for most male figures,
  of his son and nephew as models, of objects from his collection and the Imperial Museum, and of the 1873 *Elbise-i
  Osmani* costumes. https://peramuseum.org/exhibition/Osman-Hamdi-Bey/195
- Edhem Eldem, "Making Sense of Osman Hamdi Bey and His Paintings", *Muqarnas* 29 (2012): 339–383,
  doi:10.1163/22118993-90000189 — the key scholarly source for interpretation (and for the *Le Tour du Monde* tortoise
  article as a possible source); to be read in full before writing.
- Wendy M. K. Shaw, *Possessors and Possessed: Museums, Archaeology, and the Visualization of History in the Late
  Ottoman Empire* (University of California Press, 2003), pp. 98–99 — Paris 1860, law then painting, return 1869,
  Baghdad under Midhat Pasha, Academy of Fine Arts 1882.
- Nisa Ari, "The Purchase on Modernity: The Turkish National Narrative and Osman Hamdi Bey's *The Tortoise Trainer*",
  *Thresholds* 43 (2015): 178–235, doi:10.1162/thld_a_00067 — the 2004 purchase and the painting's later national
  reading.
- Şebnem Aslan, "The Analysis of the Painting 'Kaplumbağa Terbiyecisi'…", *IIB International Refereed Academic Social
  Sciences Journal* 5/16 (2014): 115–137 — dervish costume and instruments; the inscription.
- Collège de France symposium, "The 1887 excavations and the Ottoman Empire's accession to the ranks of 'civilized'
  powers" — Sidon royal necropolis as the turning point; the 1884 regulation as context.
  https://www.college-de-france.fr/en/agenda/symposium/the-discovery-of-phoenicia-in-the-19th-century-sidon-between-france-the-ottoman-empire-and-lebanon/the-1887-excavations-and-the-ottoman-empire-accession-to-the-ranks-of-civilized-powers
- Osman Hamdi Bey & Théodore Reinach, *Une nécropole royale à Sidon* (Paris, 1892) — primary publication.
- TDV İslâm Ansiklopedisi, "Osman Hamdi Bey" — Turkish reference entry for dates. https://islamansiklopedisi.org.tr/osman-hamdi-bey
- Second version, 1907 (136 × 87 cm, six tortoises, dedicated to Salih Münir Paşa): İş Bankası Painting and Sculpture
  Museum per bianet (https://bianet.org/haber/the-second-turtle-trainer-is-at-the-isbank-museum-of-painting-and-sculpture-293066);
  first shown publicly at Sakıp Sabancı Museum, 2009 (https://sakipsabancimuzesi.org/en/sergiler-ve-etkinlikler/sergi/25).

Verified for the 1906 version: oil on canvas, 221.5 × 120 cm, Pera Museum (Suna and İnan Kıraç Foundation), Salon of
1906. **Not yet verified from a primary or scholarly source:** the setting as the upper room of the Green Mosque in
Bursa; the self-portrait identification (the Pera Museum says most male figures are the artist in costume, which
supports but does not prove it for this painting); the "reform satire" reading (widespread, but Eldem questions
political readings — the story must present it as an interpretation with its history); the 2004 price.

### Chartres glass and conservation

- Victoria and Albert Museum, "Stained glass: an introduction" — workshop process (cartoon, cutting with a hot iron and
  grozing iron, paint of iron/copper oxide and ground glass, firing, H-section lead cames).
  https://www.vam.ac.uk/articles/stained-glass-an-introduction
- Theophilus, *De diversis artibus* (c. 1110–1140), Book II, trans. Hawthorne & Smith, *On Divers Arts* (Dover, 1979) —
  the medieval workshop text; Britannica summary https://www.britannica.com/topic/Schedula-diversarum-artium
- Friends of Chartres, "Chartres Cathedral stained-glass windows" — window dates (west lancets c. 1145; Belle Verrière
  upper part c. 1180, lower 1225; aisle and ambulatory lancets 1205–1235; roses c. 1215–1235; later grisaille and
  clear-glass replacements, 14th c. and 1753). https://friendsofchartres.org/?p=3343 — secondary; to be checked against
  Corpus Vitrearum France (Recensement des vitraux, Centre et Pays de la Loire).
- J. Korn / ICOMOS 1993 conference papers on stained glass — the 1939 removal and post-war cleaning and re-leading;
  isothermal, internally ventilated protective glazing. https://www.icomos.org/public/publications/93stain9.pdf
- Glass Online (21 Feb 2001), the LRMH and glassmaker Hervé Debitus' patented thermoformed protective glazing, 2.5–7 cm
  from the window, installed at Tours, Chartres, Poitiers and Sées. https://www.glassonline.com/?p=57741
- Corpus Vitrearum, *Guidelines for the Conservation and Restoration of Stained Glass*, 2nd ed. (2004) — protective
  glazing as preventive conservation; cleaning aims at conservation, not transparency.
  https://corpusvitrearum.us/guidelines-conservation/ (the cvma.ac.uk PDF link now returns 404).
- DRAC Centre-Val de Loire: "Portrait de la relance — Restauration du transept" (13 July 2021; 2009–2019 €19.5 m;
  2020–2023 ~€16 m incl. transept plasters and windows; chief architect Marie-Suzanne de Ponthaud, who expects the work
  to be "source de débats") https://www.culture.gouv.fr/Regions/DRAC-Centre-Val-de-Loire/Actualites-regionales-Centre-Val-de-Loire/Actualites-a-la-une/Portrait-de-la-relance-Restauration-du-transept-de-la-cathedrale-de-Chartres-28
  and "La restauration du tour de chœur" (2022; €27.7 m 2010–2022 incl. "verrières de la nef et du chevet")
  https://www.culture.gouv.fr/Regions/DRAC-Centre-Val-de-Loire/Ressources/Publications/Patrimoines-en-region-Centre-Val-de-Loire/Patrimoine-restaure/La-restauration-du-tour-de-choeur-Cathedrale-Notre-Dame-de-Chartres-28

**Gap to close before writing:** a primary French source for which Chartres windows carry protective glazing, since
when, and the documented objections (the LRMH's own publications; *Monumental*; the Corpus Vitrearum France volumes).

## 4. Image rights

| Image | Status |
| --- | --- |
| *The Tortoise Trainer* (1906) | Commons `File:Osman_Hamdi_Bey_-_The_Tortoise_Trainer_-_Google_Art_Project.jpg` — PD-Art (PD-old-100-expired; artist d. 1910) and the PD Mark; source Google Arts & Culture asset 3AFvsWCD87FIWg (Pera Museum). Used: the 960 px Commons rendition, scaled to 640 px, `public/img/osman-hamdi-tortoise-trainer.jpg`. Note: the Pera Museum's own website images are **not** used; PD-Art is not recognised everywhere (the Commons page says so). |
| 1907 version | No verified reusable image. Do not use. |
| Chartres: Good Samaritan panel, Belle Verrière, 2019 walls | Already in the repository with credits (CC BY-SA 4.0 JBThomas4; PD Eusebius; CC BY-SA 4.0 Stephen Taber). |
| Modern restoration / protective-glazing photographs | None verified. DRAC and atelier photographs are not assumed to be free. Needed only if the Case shows the glazing itself. |

## 5. Artist Story — narrative plan

*Tone (PO, 27 Oct): a narrative biography written like a novel, close to the artist and his paintings; as detailed as
the sources allow. No invented dialogue, private thoughts or events: the "novel" is in the scene-setting, rhythm and
point of view, and every concrete detail is sourced.*

- **Working title:** 《驯龟人》：一个画家，三张桌子 (The Tortoise Trainer: one man, three tables).
- **Central question:** How did one late-Ottoman artist move between painting, archaeology and museum-building — and
  what did each table ask of the others?
- **Opening scene:** Paris, the Grand Palais, May 1906. Catalogue number 783, *L'homme aux tortues*, by "Hamdy Bey" —
  the Salon does not even spell his name the way Istanbul does. The reader stands in front of the painting before
  knowing who painted it: the tall canvas, the cracked plaster, the tiles, the five tortoises eating greens, the old man
  with his flute behind his back. (Sources: Pera Museum blog; the painting.)
- **Progression (chapters):**
  1. *The painting first* — slow looking: what is in the room, what is worn, what is written above the window (Aslan;
     Eldem). The question the painting poses: who is training whom?
  2. *The son of a Grand Vizier* — Istanbul 1842; Paris 1860, law abandoned for painting; nine years in studios and
     exhibitions (Shaw). The Paris he learned to paint the "Orient" in.
  3. *The costume book* — 1873, *Elbise-i Osmani* for the Vienna exposition, photographs with Pascal Sébah: how a man
     learns to stage his own culture for a camera (Pera; Sébah finding aids). The habit that will make the artist his
     own model.
  4. *The second table: the museum* — 1881, director of the Imperial Museum; 1882, the School of Fine Arts; 1884, the
     antiquities regulation that kept finds in the empire (Shaw; Eldem; Collège de France).
  5. *The third table: the excavation* — Sidon, 1887: the royal necropolis, the sarcophagi brought to Istanbul, the book
     with Reinach (1892). The scene of the "Alexander" sarcophagus emerging is documented; the narrative stays with what
     was recorded.
  6. *Painting in the evenings* — the photographs of himself in costume; the studio at Eskihisar; how the tortoise
     painting was made (Pera; Eldem on sources such as *Le Tour du Monde*).
  7. *What the painting has been made to say* — the reform-satire reading, the 1907 second version with six tortoises,
     the 2004 purchase and its place in a national story (Ari; Eldem's caution). Evidence and interpretation shown side
     by side.
- **Key objects and figures:** the 1906 and 1907 *Tortoise Trainer*; the Alexander Sarcophagus (Istanbul Archaeology
  Museums); *Elbise-i Osmani*; Halil Edhem (brother, successor); Théodore Reinach; Pascal Sébah.
- **Visual explanation:** a "same model" comparison (artist photographs vs painted figures — only with verified
  images); a map of the three tables (Paris, Istanbul, Sidon); the two versions side by side (text only until a 1907
  image is cleared).
- **Uncertainty policy:** interpretations are attributed and dated ("since the 2000s it has often been read as…").
  Unverified details (the Bursa setting, the self-portrait) are stated as claims with their source or left out.
- **Learning outcome:** an artist's work and an institution's work can be the same project — and a painting's meaning
  is partly made after it leaves the studio.
- **Closing insight:** the tortoises never learn; the trainer keeps playing. Whether that is patience, irony or
  self-portrait is the reader's last decision, made with the evidence in hand.

## 6. Narrative Case — narrative plan and evidence boundaries

*Tone (PO, 27 Oct): more fictional than the story — a novel-form case that builds a believable art world around the
thesis. Composite characters and scenes are allowed and labelled; the material facts, dates and conservation
principles are sourced.*

- **Working title:** 第二层玻璃 (The Second Pane).
- **Thesis kept from the brief:** how 13th-century glass was made, what survives, and the modern judgement of how to
  keep it — material practice and conservation, not Gothic light (Course 30).
- **Central conflict:** a conservator must decide how far to clean one Chartres lancet and whether to give it a
  protective outer glazing — protection from condensation and corrosion against a change in how the window is seen and
  what counts as its "original" state.
- **Two timelines, intercut:**
  - *c. 1210* — a glazier's workshop (composite): the cartoon on a whitened table, colour sheets, the hot iron and the
    grozing iron, paint of iron oxide and ground glass, the kiln, the lead. Facts from Theophilus and the V&A; people
    and dialogue invented and labelled as reconstruction.
  - *Today* — a restoration studio in Chartres (composite): a panel arrives from a bay in the aisle. Dates and
    programmes from DRAC; method from the Corpus Vitrearum guidelines; protective glazing from the LRMH/Debitus system.
- **Roles (all composite unless named in a source):** the medieval master glazier and an apprentice; the conservator;
  the State architect (the office is real — the person in the story is not the named architect); a scientist from the
  heritage laboratory; a donor or parishioner who wants the window "bright again".
- **Decision points and the evidence at each:**
  1. *What is original?* — later replacements (14th-c. grisaille, 1753 clear glass) and 19th-c. restorations: evidence
     = paint style, lead, glass composition (sourced as methods; any specific panel analysis must come from a published
     report or be marked as illustrative).
  2. *How clean?* — corrosion crust vs transparency; the guidelines' principle that cleaning serves conservation.
  3. *Second pane or not?* — condensation, pollution, hail vs reflections, outside appearance, cost and access.
  4. *What to tell visitors?* — the 2019 walls photograph as the parallel public debate.
- **Documented history vs reconstruction:** dates, programmes, techniques and principles are documented; characters,
  conversations, the specific panel's condition and the meeting are reconstruction, flagged in the text and in a closing
  "what is real" note.
- **Learning outcome:** a window is not a finished object but a record of every hand that kept it; conservation is a
  chain of reasoned choices under uncertainty.
- **Closing insight:** the conservator signs her report knowing someone will reopen it in fifty years — as she reopened
  the glazier's.

## 7. Proposed minimal content and route architecture (not built)

- One collection `essays` (MDX, `src/content/essays/`) with `kind: 'artist-story' | 'case'` — the two kinds Continue
  Reading already knows — plus `title`, `kicker`, `summary`, `artwork` (reference, optional for a case), and the image
  list it shows. No new schema for sources: the article's own "sources" section, as lessons do.
- Routes: `/stories/` and `/stories/[slug]/`; `/cases/` and `/cases/[slug]/` — two small index pages and one shared
  reading component, extracted from the lesson page's opening + article layout, with `ReadingTracker kind=…`.
- `destinations` gets `href` for stories and cases when each has a published article; the site bar then links them on
  every page. The homepage registry adds the two kinds.
- Deferred: tags, feeds, dates, a "new" badge, a generic publication framework.

## 8. Card numbers

- Today every number comes from a course (`cardNumber`, 1–73); no stored numbers exist, so **No.074 is free** and
  nothing can collide with it.
- *The Tortoise Trainer* has no artwork record and no card.
- Smallest arrangement: one artwork record for the 1906 painting with a `card`, and one explicit table of non-course
  card numbers (e.g. `src/data/cards.ts`: `{ 'art-osman-hamdi-tortoise-trainer-001': 74 }`) that `ArtworkCard` and the
  collection read when no lesson awards the card; a test that the numbers are unique and inside their series range.
- Needs a decision: the size of the artist range (at 20 stories, 074–093), so Case cards could start at 094 or later.
- The stained-glass Case: **no card, no number**. The Good Samaritan and Chartres images already belong to the
  course-30 record; no duplicate card.

## 9–10. Homepage integration (built directly, per PO instruction of 27 Oct)

The PO asked to see this on the site itself rather than as a preview, using the folder and board designs agreed in the
earlier preview. Done in the working tree only (local, not deployed):

- The table above is unchanged: same prints, stacks, card box, slip, line field.
- Below it, on the same desk: **艺术家故事馆** — the agreed folder: Osman Hamdi Bey, *The Tortoise Trainer* clipped in
  whole, six dated life cards on a thread that draws itself in. Then **叙事案例** — the agreed investigation board: the
  Chartres question, three pieces of evidence, four dates.
- One folder and one board, whatever the number of articles: at 20 stories and 5 cases the homepage shows the current
  "opened" one and the halls' index pages hold the rest — the homepage does not lengthen.
- The site bar is unchanged: the two halls stay muted until their pages exist. "打开这个故事 / 案例" point to the
  planned routes `/stories/osman-hamdi-bey/` and `/cases/chartres-glass/`, which do not exist yet (404 locally).
- Served from a production build at http://127.0.0.1:4321/.

## 11. Files changed in this phase

- `src/components/home/StudyTable.astro` — the story folder and case board sections, their styles and reveal scripts.
- `public/img/osman-hamdi-tortoise-trainer.jpg` — new (640 × 1197).
- `public/fonts/noto-serif-sc-300-600.woff2`, `noto-sans-sc-300-500.woff2`, `bodoni-moda-500*.woff2` — regenerated
  for the new text (937 Han characters); `scripts/fonts/README.md` — sizes and count.
- `research/phase-4.7a-stories-and-cases/CHECKPOINT.md` — this report.

## 12. Checks

- `npm run build` passes; `npm test` 51/51; no horizontal scroll at 1440 and 390 px; no script errors; every image on
  the new sections shows whole.
- Production impact: none deployed. Note that the homepage component itself now contains the two sections (by the PO's
  instruction), so a commit of it would publish them — including the two links to pages that do not exist yet.

## 13. Decisions for the Product Owner

1. Approve the folder + board on the homepage (and whether they stay below the table on desktop).
2. The artist-card range (074–093 for 20 stories?) and whether *The Tortoise Trainer* becomes No.074.
3. How strongly the story may present the "reform satire" reading, given Eldem's caution.
4. Whether the Case needs a photograph of modern protective glazing (would require a cleared image).

## 14. Workflow v6

- **Keep:** the existing reader, Continue Reading kinds, SiteBar halls, artwork records and credits, the agreed homepage
  designs.
- **Simplify:** one `essays` collection for both kinds; one explicit card-number table instead of a series system.
- **Defer:** further stories and cases, *The World at the Same Time*, more lessons, card-system generalisation, new
  animation or routing.
- **Stop:** writing begins only after the PO approves sections 5, 6, 8 and 13.
