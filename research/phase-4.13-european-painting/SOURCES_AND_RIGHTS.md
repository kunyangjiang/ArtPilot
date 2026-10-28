# Phase 4.13 — Stage 05 European painting batch (Courses 41–46): sources, image rights and selection

Checked 2026-10-28. Museum data from the institutions' own object pages and open-access services: the Met (collection
API v1.1 for object data, object pages read in the built-in browser, the Catalogue Entry tab opened with a real click);
the National Gallery of Art (object pages and the article “Layers of Power” read in the built-in browser, since the site
refuses non-browser clients; images from the NGA IIIF service, `api.nga.gov/iiif/{uuid}/full/!2400,2400/0/default.jpg`);
the Walters Art Museum (object page in the browser). Britannica entries read in the browser. Alberti and Vasari from
it.wikisource (raw and rendered wikitext). The Italian Ministry of Culture communiqué on the Tempest and the National
Gallery (London) Arnolfini page read with WebFetch. Jarzewicz 2020: the journal's abstract page only. Commons licence
data from the Commons API and the raw file descriptions.

**Not reached:** the Museo del Prado's site answered with a Cloudflare bot check; it was not bypassed. Prado works
(Las Meninas, Zurbarán's Agnus Dei) are dated and measured from Britannica and the Commons file descriptions, and the
lesson says so.

Every image was resized to at most 1600 px on its long side, recompressed (JPEG q82) and, where stated, cropped. Nothing
was recoloured, sharpened or annotated in the file. Lines and marks in the lessons are drawn by the components on top of
the untouched image.

**Not used:** the Met's *Denial of Saint Peter* as the Course 45 card (it is already Course 3's artwork and teaches
chiaroscuro and the focal point there; Course 45 refers back to it instead of repeating it); Piero della Francesca's
*Flagellation* (no institutional text reached to support the perspective analysis); Raphael's *School of Athens* (the
figure identifications that make it useful are traditional, and no institutional source was reached for them).

## How the works were chosen

| Course | What the question needed | Representative work (card) | Why | Comparisons |
|---|---|---|---|---|
| 41 | A painting whose perspective can be measured on the image and checked against an institutional text | *The Ideal City*, Walters 37.677 | CC0 high-resolution photo; the Walters text names the vanishing point (the city gate), which the pixel-fitted roof lines confirm | Masaccio's *Trinity* (Britannica: first extant systematic one-point perspective); Uccello's *Battle of San Romano* (foreshortening); Alberti, *Della pittura* I §19 |
| 42 | A Netherlandish oil painting full of material detail, with a documented history of being misread | Petrus Christus, *A Goldsmith in His Shop*, Met 1975.1.110 | Signed and dated; the Met records the later halo and its removal, and several readings by named curators | van Eyck's *Arnolfini Portrait* (NG London: the wedding reading “not anymore”); Rogier's *Portrait of a Lady* (NGA); Dürer's *Melencolia I* (Met) |
| 43 | Three artistic problems (face, body, group) rather than three biographies | Raphael, *The Alba Madonna*, NGA 1937.1.24 | CC0 photo; the NGA “Look Closer” notes link it (cautiously) to Leonardo's outdoor settings | Leonardo's *Ginevra de' Benci* (NGA); Michelangelo's *Studies for the Libyan Sibyl* (Met) beside the fresco |
| 44 | A Venetian painting where colour, material goods and later repainting are documented by its museum | Bellini and Titian, *The Feast of the Gods*, NGA 1942.9.1 | The NGA article covers the vessels, fabrics and the post-1516 changes found in conservation, which lets the lesson separate photo evidence from technical evidence | Titian's *Venus with a Mirror* (NGA: reused canvas); Giorgione's *Tempest* (Ministry of Culture); Vasari 1568 |
| 45 | Light as event and the viewer's place, without repeating Course 3; and Baroque variety | Caravaggio, *The Calling of Saint Matthew* (San Luigi dei Francesi, in situ) | Dated contract (Britannica); a published current dispute over which figure is Matthew | Rubens's *Venus and Adonis* (Met); La Tour's *Penitent Magdalen* (Met) |
| 46 | Naturalism serving devotion, court portraiture, and a sitter whose social position is documented | Velázquez, *Juan de Pareja*, Met 1971.86 | The Met catalogue separates the documents (manumission 1650/1654) from Palomino's fictional story and current questions | Zurbarán's *Agnus Dei*; Velázquez's *Supper at Emmaus* (Met) and *Las Meninas* (Britannica) |

## Course 41 — *The Ideal City* (`renaissance-pictorial-space.mdx`, card No.041)

- **Walters 37.677:** ca. 1480–1484; oil and tempera on panel; painted surface 77.4 × 220 cm; Massarenti → Henry
  Walters 1902 → bequest 1931; the description (central perspective, triumphal arch, amphitheatre, octagon, virtues on
  columns, Urbino and Berlin companions, set into woodwork, the converging lines meeting in the city gate).
- **Attribution inconsistency recorded:** the record says “Florentine, after design by Giuliano da Sangallo”; the same
  page's title still says Fra Carnevale; the 1897 Massarenti catalogue said Pintoricchio. The card uses “佛罗伦萨画家”.
- **Measured, not estimated:** the left and right roof lines were fitted on the pixels and meet at (50.5 %, 61.9 %),
  inside the gate, agreeing with the Walters text. The PhotoMarks lines use these values.
- **Britannica “Masaccio”:** *Trinity*, about 1425–26, nearly perfect one-point system, first extant example. Its framing
  of medieval painting is not repeated.
- **Alberti, *Della pittura*, vernacular, book I §19 (it.wikisource):** “finestra aperta”, the punto centrico at the
  height of the figures. Quoted in Italian with the lesson's own translation.
- **Images:** Walters (CC0) full image; Masaccio *Trinity* (Commons, Rufus46, public domain); Uccello (National Gallery
  London via Commons, PD-Art).

## Course 42 — *A Goldsmith in His Shop* (`northern-renaissance-detail.mdx`, card No.042)

- **Met 459052 / 1975.1.110:** signature and date; dimensions; overview (best Bruges painter after van Eyck; perhaps for
  the goldsmiths' guild; weighing a ring for a couple; more likely a goldsmith than Saint Eligius; mirror to the street);
  audio guide (halo added later by a weaker hand and removed in restoration; Ainsworth's falcon/greed reading given as a
  possibility).
- **Met Heilbrunn essay, Susan Jones (2002):** van Eyck did not invent oil painting; translucent glazes; slow drying.
- **NG London, Arnolfini:** date, size, inscription, mirror, dog and oranges, the wedding reading abandoned.
- **NGA 1937.1.44 (Rogier):** the buckle's precision against the plain dress. **Met 43.106.1 (Melencolia I).**
- **Withdrawn while writing:** an invented author name in the sources; “van Eyck was Christus's teacher”; Nuremberg and
  Bruges details not in the sources.
- **Glossary fix:** the oil-painting sense of “glaze” was first written over the existing ceramic entry `gl-glaze`
  (釉, used by Courses on Song–Yuan ceramics and Goryeo celadon). It was restored from Git and the new sense was given
  its own id, `gl-glazing` (罩染).
- **Images:** Met (CC0) full, mirror and signature crops; NGA (CC0) Rogier full and buckle crop; Met (CC0) Melencolia;
  Arnolfini and mirror crop from Commons (National Gallery London, PD-Art).

## Course 43 — *The Alba Madonna* (`high-renaissance-masters.mdx`, card No.043)

- **NGA 1937.1.24:** c. 1510; oil on panel transferred to canvas; diameter 94.5 cm; overview (Mary and John lean toward
  Jesus; gazes on the cross); Look Closer (thin halos; landscape “possibly inspired by Leonardo”); provenance (possibly
  Giovio → Nocera; 1686 Marqués del Carpio → dukes of Alba; Hermitage; Mellon 1931). The NGA's violet and dandelion
  symbolism was not used.
- **NGA 1967.6.1.a (*Ginevra*):** c. 1474/1478; original panel 38.1 × 37 cm with an addition at the bottom edge;
  sixteen years old; marriage; juniper/ginepro; the only Leonardo painting in the Americas; shading of the face; spires.
- **Met 337497 / 24.197.2 (Libyan Sibyl studies):** red chalk with white on the left shoulder; posed male studio
  assistant or model; separate studies of the profile, toe and hand; preserved by the heirs.
- **Vasari 1568, Life of Titian:** Michelangelo's remark, used here only as a pointer to Course 44.
- **Gaze lines and FeatureCompare points:** placed by eye on the photographs; the lesson labels them as schematic.
- **Images:** NGA (CC0) Alba, Ginevra and two crops; Met (CC0) drawing; Sistine fresco from Commons
  (`'LibyanSibyl_Sistine_Chapel_ceiling'_by_Michelangelo_JBU34.jpg`, Jörg Bittner Unna, own work, CC BY 3.0, taken
  2011-08-16), cropped top and bottom. Replaced in the rights check below; used only to compare the pose, never colour.

## Course 44 — *The Feast of the Gods* (`venetian-colour.mdx`, card No.044)

- **NGA 1942.9.1:** 1514/1529; oil on canvas; 170.2 × 188 cm; first of Alfonso d'Este's bacchanals for his camerino;
  Ovid's *Fasti*; provenance note (final payment to Bellini 1514; in the camerino until 1598).
- **Alex Dean, “Layers of Power” (NGA, 17 March 2025):** private study; glass vessels perhaps Venetian; bowls that evoke
  Chinese porcelain; shot silk; after Bellini's death (1516) Dossi and Titian changed the picture, adding the large rocky
  landscape; Dossi possibly the trees upper right and the pheasant; changes possibly to harmonise with Titian's
  camerino pictures. The lesson marks “perhaps”, “evoke” and “possibly” as the article does.
- **Not consulted:** Bull and Plesters, *The Feast of the Gods: Conservation, Examination, and Interpretation* (1990).
  The technical findings come from the NGA's public article, and the lesson says so.
- **NGA 1937.1.34 (*Venus with a Mirror*):** touch and textures; at least thirty variants; kept until Titian's death;
  reused canvas with two standing figures, turned 90°, the man's jacket apparently left as the velvet.
- **Ministry of Culture communiqué (Gallerie dell'Accademia, sala VIII):** 82 × 73 cm; dates 1503–1509; Vendramin
  c. 1504 more plausible; Michiel 1530; varied interpretations.
- **Vasari 1568, Life of Titian:** Giorgione painting in colour without drawing on paper (Vasari's objection);
  Michelangelo on Titian (“molto gli piaceva il colorito suo … disegnare bene”), quoted in Italian with the lesson's own
  translation and framed as Vasari's report and a Florentine view.
- **Withdrawn while writing:** Bellini's age in 1514 (not in the sources read).
- **Images:** NGA (CC0) Feast full, vessels and landscape crops, Venus full and velvet crop; Giorgione's *Tempest* from
  Commons (`Accademia_-_La_tempesta_-_Giorgione.jpg`, Didier Descouens, own work, photo CC BY-SA 4.0, taken 2016-11-04).
  Replaced in the rights check below; used for composition only.

## Course 45 — *The Calling of Saint Matthew* (`baroque-light-space.mdx`, card No.045)

- **Britannica “Caravaggio” (Graham-Dixon), Contarelli section:** 23 July 1599 contract; side walls of the Contarelli
  Chapel, San Luigi dei Francesi; first major public commission; nearly 3 m square; modern dress and live models; the
  diagonal beam; Graham-Dixon's scales reading, labelled as his interpretation.
- **Met, *Denial of Saint Peter* catalogue entry (Christiansen):** the San Luigi canvases as his first public commission.
- **Jarzewicz 2020 (abstract only):** which figure is Matthew remains controversial; he argues for the traditional
  identification. The lesson does not name other scholars' alternatives, because none was read.
- **Met 437535 (Rubens):** Ovid; Titian's version at the Met; asserting his status as successor.
- **Met 436839 (La Tour):** candlelight; pared-down geometry; “countertrend to Baroque pomp”; mirror, skull, candle
  (the candle's meaning given as “probably”, as the Met does).
- **Dimensions:** 322 × 340 cm from the Commons file description (`{{Size|cm|322|340}}`); no church or museum record
  was reached. The card shows “约 3 米见方”.
- **Story space kept:** Artemisia Gentileschi and Rembrandt are not discussed, leaving their artist stories untouched.
- **Images:** Commons (`Michelangelo_Caravaggio_040.jpg`, The Yorck Project, PD-Art-YorckProject; warm cast noted);
  Met (CC0) Rubens and La Tour.

## Course 46 — *Juan de Pareja* (`spanish-golden-age.mdx`, card No.046)

- **Met 437869 / 1971.86:** 1650; 81.3 × 69.9 cm; overview and catalogue (Salomon 2011, Christiansen 2019, Pullins 2023):
  second Italian journey; the 19 March 1650 Virtuosi exhibition at the Pantheon; Palomino 1724 quoting Andreas Schmidt
  (“everything else looked like painting, this alone like reality”); Palomino's story of the secret learning and the
  king's intervention called fictitious; Pareja's birth c. 1608 at Antequera, parents, workshop tasks; the 1650
  manumission effective 1654 as a common formula; guilds; Fracchia's question about Velázquez's claim to nobility;
  Pareja's later works (1661 *Calling of Saint Matthew* with self-portrait). Audio guide: the direct gaze.
- **Met 437871 (*Supper at Emmaus*):** 1622–23; rustic, unidealised models after Caravaggio; still-life skill.
- **Britannica “Las Meninas” (Ann Kay):** 1656; Margarita Teresa aged five; meninas; mirror with the king and queen; the
  spectator in the royal couple's space; “painting about painting”; late brushwork. Britannica's caption claim
  “commissioned by Philip IV” was not used. Commons dates the picture 1656–57; the lesson uses 1656 and the record notes
  both.
- **Britannica “Francisco de Zurbarán”:** Caravaggesque naturalism and tenebrism; devotion; Trent; monastic patrons;
  paintings for Lima (1647).
- **Not stated without a source:** the meaning of the red cross on Velázquez's chest in *Las Meninas*.
- **Images:** Met (CC0) Pareja full and face crop, Emmaus; Commons (Prado online gallery source, PD-Art) *Las Meninas*
  and its mirror crop, Zurbarán's *Agnus Dei* (`Francisco_de_Zurbarán_006.jpg`).

## Image-rights check (2026-10-28)

Scope: the two Commons reproductions flagged in the handoff. Read from the Commons API (file description wikitext,
upload history, EXIF) on 2026-10-28; no other source was consulted.

**Libyan Sibyl (Course 43, `michelangelo-sibyl-fresco.jpg`), replaced.**
- Old file: `LibyanSibyl_SistineChapel.jpg`, uploaded 2007-12-10 by TTaylor (re-uploaded 2007-12-29 by Veggies),
  899 × 938 px. Tag `{{PD-Art|PD-old-auto-expired}}`; source field “wiki commons”; no photographer, publication or
  original upload source. PD-Art covers the fresco, but for this reproduction nothing shows who made it or where it was
  published, so that tag can't be checked. Treated as materially uncertain.
- New file: `'LibyanSibyl_Sistine_Chapel_ceiling'_by_Michelangelo_JBU34.jpg`, uploaded 2016-01-18 by Jörg Bittner
  Unna, `{{own}}`, `{{self|cc-by-3.0}}`; EXIF Canon EOS 60D, 2011-08-16 14:54:32, artist “Joerg Bittner”. The
  photographer's own licence covers any rights in the photograph, so the basis doesn't depend on PD-Art. Credit:
  author, CC BY 3.0 with link, source URL, date, changes (cropped top and bottom, full width kept; 3400 × 3471 →
  1200 × 1225). Original SHA-1 c3ca862896e3424f99b2f96de74dec241d758c23.
- Not judged here: the Vatican Museums' visitor rules on photography in the chapel. They're a house rule, not a
  copyright licence, and weren't consulted.
- Teaching use unchanged. The FeatureCompare points were checked on the new crop; the toe point moved from (59, 77) to
  (61, 79), and the body and hand points stay.
- Considered, not used:
  - The Yorck Project file `Michelangelo_Buonarroti_035.jpg`: documented source, but it shows the ceiling before
    restoration, which contradicts the caption.
  - The Web Gallery of Art and CGFA copies: no stated photographer.

**The Tempest (Course 44, `giorgione-tempest.jpg`), replaced.**
- Old file: `Giorgione_-_Das_Gewitter.jpg`, first uploaded 2008-02-01 by Mathiasrex, with the current 3329 × 3696
  version uploaded by Eugene a (2016) and Ismoon (2018). Tag `{{PD-Art|PD-old-100-1923}}`; source “Internet”, no
  permission; it is in the category “Scanned with Microtek ScanMaker i900”, i.e. probably scanned from an unnamed
  print. Treated as materially uncertain.
- New file: `Accademia_-_La_tempesta_-_Giorgione.jpg`, uploaded 2018-08-27 by Archaeodontosaurus.
  - `{{Art Photo}}` names the photographer as Didier Descouens and the photo date as 2016-11-04 (EXIF Nikon D800E).
  - `{{Licensed-PD-art|PD-old-100-1923|cc-by-sa-4.0}}`: the painting is public domain, and the photograph is
    CC BY-SA 4.0.
  - It is a Valued Image on Commons.
  - Credit: author, CC BY-SA 4.0 with link, source URL, date, changes (4031 × 4471 → 1443 × 1600, not cropped or
    recoloured). The resized copy is under the same licence.
  - Original SHA-1 c221de21d6b6be5ba348bda729c9acb94a46ee1e.
- Considered, not used:
  - `Giorgione,_The_tempest.jpg`: source given as the Accademia website, but its EXIF shows a ScanMaker scan, and the
    site states no licence.
  - The Web Gallery of Art copies: no stated photographer.
  - Other own-work photos: smaller or framed.
- Not judged here: Italy's cultural-heritage reproduction rules (Codice dei beni culturali, art. 107–108) for works in
  state museums. They aren't copyright, they weren't researched for this check, and they apply to the work whichever
  photo is used.

## Uncertainties carried into the lessons

- Ideal City attribution (record vs page title vs 1897 catalogue).
- Goldsmith: portrait of a goldsmith vs Saint Eligius vs allegory (PaintingReadings).
- Leonardo's influence on Raphael's landscape: “possibly” (InferenceChain → plausible).
- Feast of the Gods: who painted what and why it was changed (technical evidence via the NGA article; motive → guess).
- Titian's jacket-to-velvet reuse: the NGA says “appears”.
- Tempest subject: unknowable on present evidence.
- Calling: identity of Matthew disputed.
- Las Meninas mirror: one strong reading among several.
- Pareja: motive for manumission unknowable; Palomino's story fictional.

## Course 45 deepened (pilot, 2026-10-28)

The user asked for Stage 05 lessons to go deeper (history, anecdotes, technique, interactives, several works at
different depths). Course 45 is the pilot; the other Stage 05 lessons are unchanged until it is reviewed.

**New sources read**
- **Britannica, Contarelli section (full text, read in a browser):**
  - del Monte secured the commission;
  - the *Martyrdom* description and the self-portrait;
  - the first *St Matthew and the Angel* rejected (photographs only, destroyed in Berlin), and the second version;
  - the 1603 libel suit brought by Baglione, and Caravaggio's one recorded sentence on painting;
  - the landlady's 1605 complaint about a damaged ceiling ("may suggest" his working method).
- **Baglione 1642** (Internet Archive `gri_vitedepittor00bagl`, OCR checked against the passage):
  - Caravaggio's months in Cesari's house;
  - "Per opera del suo Cardinale";
  - the chapel's three canvases, with the *Calling* "a man diritta" of the altar;
  - the vault by Cesari;
  - Federico Zuccaro's visit with Baglione present ("Che rumore è questo?" … "il pensiero di Giorgione");
  - the first *St Matthew* "non era a veruno piacciuto", taken by Giustiniani;
  - the life of Cobaert ("Cope"): the marble St Matthew he worked on all his life, not finished at about 80,
    rejected by the Contarelli, who then had Caravaggio paint a St Matthew.
- **Bellori 1672** (Internet Archive `levitedepittoris00bell`):
  - Caravaggio's early manner "di Giorgione, con oscuri temperati", then growing darks, and much black for relief;
  - the closed room with a high light falling vertically;
  - young painters stripping models and raising lights; old painters' "non sapeva uscir fuori dalle cantine",
    one light and one plane;
  - Virgilio Crescenzi, heir of Contarelli, choosing him in competition with Giuseppino, with Marino's advice
    (fresco to Cesari, oils to Caravaggio);
  - the first altarpiece removed by the priests (no decorum, no look of a saint, legs crossed, feet rudely exposed
    to the people); Giustiniani took it, and the second version followed;
  - the *Calling* described, with Matthew's hand at his breast and the old man with spectacles;
  - the *Martyrdom* "rifatto due volte" and judged insufficient;
  - the chapel's darkness hiding both paintings.
- **Met, Christiansen 2003 (Heilbrunn essay):**
  - painting from posed models;
  - unveiled in 1600; contemporary dress not new, but the immediacy was unmatched;
  - the contemporary critic on light from high up in a room with black walls. That passage is paraphrased in the
    lesson, not translated.
- **Staatliche Museen zu Berlin, obj. 870411 (*Der Evangelist Matthäus*, Gemäldegalerie 365):**
  - 223 × 183 cm; acquired in 1815 with the Giustiniani collection;
  - the reasons for rejection (an unlettered peasant guided by the angel; the dirty feet over the celebrant at
    Mass); Hebrew script; Giustiniani's condition of a second version;
  - most likely destroyed in May 1945 in the Friedrichshain flak tower;
  - photo credit Gustav Schwarz, Public Domain Mark 1.0.
- **Villa Medici study-day leaflet (April 2025), Franceschini abstract:**
  - archival and literary sources from September 1565; at least four artists (Muziano, Cobaert, Cesari,
    Caravaggio), Caravaggio taking over in July 1599;
  - his first public work; the stir at the unveiling still debated.
- **Met 435844 (*The Musicians*):**
  - Baglione's "musica di alcuni giovani ritratti dal naturale";
  - self-portrait in the second boy from the right;
  - the audio guide: a constructed picture whose models were probably never in those positions at once.

**Kept out or hedged**
- Where the commission came from is given both ways: del Monte (Baglione, Britannica) and Crescenzi/Marino
  (Bellori). The contract was not read.
- The match between the painted light and the real window above the altar is an observation from photographs, not
  a claim about intent.
- A hole cut in the ceiling for light is labelled as a guess.
- Bellori's "rifatto due volte" is not linked to any technical study, because none was consulted.
- Zuccaro's motive is read through Course 44 (Vasari on Giorgione) and marked "多半".
- The darkness figures (about 72% of the photo below 40/255, and the thresholds in LightMask) are measured on the
  CC0 photograph, and the lesson says so.

**New component:** `src/components/LightMask.astro` (styles in `global.css`). A slider keeps the brightest N% of the
photo by relative luminance; it has a demo sweep (reduced motion jumps straight to 10%) and notes at set stops.
Nothing is scored or stored.

**Images**
- `caravaggio-calling.jpg` replaced: Gleb Simonov, own work, CC0 (Commons `Caravaggio_—_The_Calling_of_Saint_Matthew.jpg`).
  The Yorck copy had a warm cast. The SpotPick zones and PhotoMarks were re-measured on the new photo.
- `caravaggio-martyrdom.jpg`: Gleb Simonov, photographed and uploaded by him, tagged PD-Art.
- `caravaggio-matthew-angel.jpg`: Matthieu.lett.ube, own work, CC BY 4.0, 2025-11-21; cropped to the canvas.
- `caravaggio-matthew-angel-lost.jpg`: SMB / Gustav Schwarz, Public Domain Mark 1.0 (via Commons).
- `contarelli-chapel.jpg`: Sp!ros, own work, CC BY-SA 3.0 / GFDL, 2008-01-26.
- `caravaggio-musicians.jpg`: Met, CC0.

**New glossary terms:** `gl-altarpiece` (祭坛画), `gl-decorum` (得体).

## Rollout to Courses 41–44 and 46 (2026-10-28)

The user approved the Course 45 pilot and asked for the same depth in the other five lessons. New material per lesson
is below; every claim in the lessons traces to these sources or to the ones listed earlier in this file.

**Course 41 (`renaissance-pictorial-space`)**
- **Manetti, *Vita di Filippo di ser Brunellesco*:** Milanesi 1887 edition, Internet Archive `operetteistorich00maneuoft`.
  - The Baptistery panel: half a braccio square, viewed from inside the Duomo door, with a burnished-silver sky.
  - The conical peephole, the mirror and its distance, and Manetti's "io l'ho avuto in mano".
  - The Signoria panel, with no hole; Uccello's imitations.
- **Vasari 1568:**
  - Life of Uccello: "Oh che dolce cosa è questa prospettiva!"; Donatello's "lasciare il certo per l'incerto … tarsie".
  - Life of Brunelleschi: plan-and-profile method; taught Masaccio; intarsia makers.
- **Alberti, *Della pittura* I §19–20 (re-read):**
  - rejection of the workshop two-thirds rule; the side construction from a chosen eye distance; the diagonal check.
  - The new `PerspectiveBuilder.astro` computes exactly this construction.
- **NG London, Crivelli, *Annunciation with Saint Emidius*:**
  - 1486; tempera with some oil on canvas; 207 × 146.7 cm.
  - Ascoli's 1482 rights, with the news arriving on Annunciation Day; LIBERTAS ECCLESIASTICA.
  - Vanishing point to the left; the "golden hole in the wall"; fruit as his trademark; "playing games with his viewers".
- **Images:**
  - `crivelli-annunciation.jpg`: Commons `Carlo Crivelli 069.jpg`, The Yorck Project, PD-Art. Chosen because the larger
    Commons copy comes from an unnamed Flickr upload.
- **Corrected during the rollout:**
  - The Gubbio studiolo was first added here, but Course 4 already features it. It was removed at the user's request
    and replaced with the Crivelli; Course 41 now only points to Course 4 in one sentence.
  - The download had overwritten Course 4's committed `gubbio-studiolo.jpg` and `gubbio-studiolo-cabinet.jpg`. Both
    were restored with `git restore`, and `git status` shows them unmodified.
- **New static component:** `BrunelleschiPeep.astro`, drawn from Manetti's text and labelled schematic.

**Course 42 (`northern-renaissance-detail`)**
- **Met 49.7.19, *Portrait of a Carthusian*, technical notes (Scully 2018):** feeds the eight steps of the new
  `PanelLayers.astro`.
  - Support: Baltic oak, tree-ring dating 1426/1432+; the barbe on all four edges.
  - White ground; brush underdrawing seen in IRR; a light underpaint seen in the X-ray.
  - Glazes, with the red-wall shadows tamped with fabric; eye highlights; curls incised into wet paint; pentimenti.
  - The fictive frame added after the figure; the gold halo removed after the 1992 study; the date possibly later.
  - The glaze demo is a labelled absorption model, not a measurement.
- **Ainsworth, "Intentional Alterations of Early Netherlandish Painting" (Met, 2008):**
  - Halos are rare in Netherlandish painting; Friedländer 1916 and Conway 1921 doubted them; removed for the 1994 show.
  - Christus broke with the plain portrait background; the Carthusian and Saint Bruno (canonized 1623).
  - The goldsmith first called Saint Eligius in 1817; Wolff and Van der Velden 1998; the Willem van Vlueten
    hypothesis; Memling's "Saint Sebastian" until 1912.
- **Other sources:**
  - Susan Jones, Met essay (re-read): the 1448 Reixach will; Bellini using oil in the 1460s.
  - Vasari 1568, Life of Antonello: the cracked panel, linseed and walnut oil, the secret passed to Rogier.
  - NG London, van Eyck's *Portrait of a Man (Self Portrait?)*: ALS ICH CAN as a pun, inscriptions painted as if carved.
- **Images:**
  - Met CC0: `christus-carthusian.jpg` and the crop `christus-carthusian-fly.jpg`.
  - `van-eyck-turban.jpg`: Commons, Yorck Project, PD-Art.

**Course 43 (`high-renaissance-masters`)**
- **NGA 1967.6.1.b (reverse) and the NGA article "10 Surprising Facts" (2024):**
  - Reverse in tempera; the emblem, with the original motto "Virtus et Honor" as Bembo's.
  - Early oil; three-quarter pose; outdoor setting; fingerprints; the cut-down panel and the lost hands.
  - Ginevra's one line of verse.
- **NGA obverse page:** the 1733 Liechtenstein seal; attributed to Cranach in 1780; bought in 1967; the suitcase flight.
- **NGA, *Alba Madonna*:** "oil on panel transferred to canvas"; full provenance from Giovio (possibly) to Mellon 1931
  and the NGA 1937.
- **Michelangelo, *Rime* no. 5** (it.wikisource, 1960 edition): quoted in Italian, with the lesson's own translation.
- **Vasari 1568, Life of Michelangelo:** twenty months alone; the Pope's threat; All Saints' unveiling; secco retouching
  and gold; reading with his head tilted back. Labelled as Vasari's, written decades later.
- **Cennini, *Il libro dell'arte* ch. 67:** fresco method and "quanto il dì puoi lavorare".
- **Images:** `leonardo-ginevra-reverse.jpg`, NGA CC0.
- **New component:** `PanelFlip.astro`.

**Course 44 (`venetian-colour`)**
- **Vasari 1568, Life of Titian:**
  - The 1514 camerino; Dosso; Bellini's signature on the tub; Titian finishing the room and his two bacchanals.
  - Bellini's "German" drapery after Dürer's altarpiece.
  - Titian's late manner: "da presso non si possono vedere e di lontano appariscono perfette".
- **NG London, *Bacchus and Ariadne*:** 1520–3; it replaced Raphael's commission; the planners hoped for Michelangelo,
  Raphael and Fra Bartolommeo; ultramarine "100 times more expensive than any other"; azurite in the distance.
- **NGA 1942.9.1 provenance:** confiscated in 1598 by Aldobrandini; Camuccini 1796/97; Northumberland 1853; sold 1916;
  Widener 1921; NGA 1942.
- **Not used:**
  - Prado locations for the *Andrians* and the *Worship of Venus*, which no source read here states.
  - Any X-ray claim about the *Tempest*; the ministry text says nothing on it.
- **Images:**
  - `titian-bacchus-ariadne.jpg`: Google Art Project via Commons, PD-Art.
  - `titian-venus-mirror-large.jpg`: NGA CC0, 2800 px, for zooming.
- **New component:** `DistanceView.astro`.

**Course 46 (`spanish-golden-age`)**
- **Palomino, *Las vidas …*:** London 1742 reprint of the 1724 text, Internet Archive `lasvidasdelospin00palo`.
  - The practice head; friends unable to tell painting from man; the St Joseph's Day showing at the Rotonda, after
    Andrés Esmit.
  - Pareja's life: Seville birth, secret learning, the painting turned to the wall, the King's words, freedom.
  - The Met's Antequera birthplace and its "fictitious" verdict are set beside Palomino's account.
- **Met 1971.86:**
  - Provenance: Ruffo by 1704; Hamilton 1776; the 1801 sale at £40.19; Radnor from about 1811; Christie's 1970.
  - Audio: Pareja's surviving works, some over eleven feet wide.
- **Met, "Plant Ash in Ground Preparations" (2023):** ash pseudomorphs in the *Juan de Pareja* ground; Pacheco and
  Palomino; colonial Latin America.
- **Images:**
  - `pareja-calling-matthew.jpg`: Commons, sourced from the Prado image server, PD-Art; date and size from the Prado
    record cited on Commons.
  - `velazquez-pareja-large.jpg`: Met CC0, 2600 px.
- **FeatureCompare against Course 45:** the points were measured on both images; the "limit" notes say the parallels are
  observations, not proof of borrowing.

**Checks:** `npm test` 64/64; build clean; no new font characters; no literal `**` in the six built lessons. All six
lessons at 1440 and 390 px: no overflow, no broken images, no console errors except the favicon 404. All find games 4/4,
SpotPick answers resolve, and every button clicks without error.
