# Chartres lesson: visual and interaction plan

Implementation handoff for Phase 4.0-B. No images were downloaded and nothing was built in Phase 4.0-A.

**How the rights were checked**
- I read each file's licence metadata through the Wikimedia Commons API on 2026-10-25.
- "Verified" means the Commons file page states the licence and author. It does not mean the photographer's claim was checked independently.
- Re-check each file page at import time, because Commons licence data can be corrected after upload.

## 1. Rights rules that apply to every image

1. **The building itself is in the public domain**: the medieval architecture, sculpture and glass. Rights questions concern the photographs and drawings of it.
2. **CC BY-SA photos** (most modern photos below) need four things:
   - the author's name;
   - the licence name with a link;
   - a link to the source;
   - a note of any changes (for example "cropped").

   A cropped or recoloured version is an adaptation and must stay under the same CC BY-SA licence. Placing an unmodified photo on a lesson page does not make the page CC BY-SA.
3. **"Public domain" photos released by a Commons uploader** are usable on the strength of the uploader's declaration. That is weaker than a museum release; keep the file-page URL as evidence.
4. **19th-century drawings and photos** (Lassus, Viollet-le-Duc, Nègre, Baldus) are public domain by age. Check that the scan's source is as stated.
5. **Things to avoid:**
   - modern or contemporary windows and artworks inside the cathedral (some 20th–21st-c. glass and fittings may still be in copyright);
   - the cathedral website's own photos (marked "© NDC");
   - V&A, Met and other museum photos, unless their own open-access terms are read and recorded.
6. **French image law, open.** Article L621-42 of the Code du patrimoine (2016) controls commercial use of images of certain *domaines nationaux*. My understanding is that Chartres Cathedral is not on that list, but **I did not verify this**. Confirm it before any commercial release.
7. **Schema needs work.** ArtPilot's current rights fields (`imageSource`, `rights.status/basis/verifiedOn/note`) were designed for one public-domain painting. CC BY-SA photos need per-image fields for author, licence name, licence URL, source URL and modification note. This is a content-schema change for Phase 4.0-B, which the Product Owner needs to approve.

## 2. Proposed images

Placements refer to the `【图 n】` markers in `CHARTRES_LESSON_DRAFT.md`.

| # | Subject and purpose | Candidate file (Commons) | Author | Licence | Reuse and crop | Uncertain |
|---|---|---|---|---|---|---|
| 1 | Royal Portal statue-columns (section 5; also the opening). Shows figures fused with columns, c. 1145–1155. | [Chartres Cathedral Royal Portal Statues 1 2007 08 31.jpg](https://commons.wikimedia.org/wiki/File:Chartres_Cathedral_Royal_Portal_Statues_1_2007_08_31.jpg) (2336×3504). Alternative: [Charles Nègre's 1850s photograph of the right door](https://commons.wikimedia.org/wiki/File:Charles_N%C3%A8gre_-_Chartres_Cathedral-_Right_Door_of_the_Royal_Portal_with_Our_Lady_of_Chartre_-_1992.11_-_Cleveland_Museum_of_Art.tif) (CC0, Cleveland Museum of Art; historical, monochrome). | Andreas F. Borchert | CC BY-SA 4.0 | Yes; crop allowed with attribution, crop stays CC BY-SA | None beyond general checks |
| 2 | Nave looking east (opening, section 1). Height, piers, clerestory glass. | [Cathedrale nd chartres nef011.jpg](https://commons.wikimedia.org/wiki/File:Cathedrale_nd_chartres_nef011.jpg) (2304×3072, 2008) | Harmonia Amanda | CC BY-SA 3.0 | Yes, as above | Photographed before the interior repainting; must be captioned as a pre-restoration view |
| 2b | Cleaned vs uncleaned nave (section 4, restoration debate). | [Cleaned and restored Nave Chartres Cathedral.jpg](https://commons.wikimedia.org/wiki/File:Cleaned_and_restored_Nave_Chartres_Cathedral.jpg) (4032×3024, 2019) | Stephen Taber | CC BY-SA 4.0 | Yes | The uploader's caption says the nave is "cleaned and painted" next to a soot-dark area; check visually before use |
| 3 | One bay of the three-storey elevation (section 1). Base image for Interaction A. | [Triforium Chartres.jpg](https://commons.wikimedia.org/wiki/File:Triforium_Chartres.jpg) (2560×1920) | "BT from German Wikipedia" | Public domain (uploader declaration) | Yes | Weak provenance (uploader-declared PD via a transfer from de.wikipedia); fallback is a crop of image 2 |
| 4 | Vault seen from below (section 2). Ribs gathering into the piers. | **Not yet selected.** [Chartres Cathedral South Aisle View into Nave 2007 08 31.jpg](https://commons.wikimedia.org/wiki/File:Chartres_Cathedral_South_Aisle_View_into_Nave_2007_08_31.jpg) (Andreas F. Borchert, CC BY-SA 4.0) shows piers but not the high vault. | — | — | — | Find one dedicated vault photo in Phase 4.0-B |
| 5 | Flying buttresses from outside (section 2). | [Chartres Cathedral Buttresses N 2007 08 31.jpg](https://commons.wikimedia.org/wiki/File:Chartres_Cathedral_Buttresses_N_2007_08_31.jpg) (3452×2268) | Andreas F. Borchert | CC BY-SA 4.0 | Yes | None |
| 5b | Measured section through the building (section 2; the source for the Interaction B schematic). | [ChartresCathedral-Cross-Section-high-res.jpg](https://commons.wikimedia.org/wiki/File:ChartresCathedral-Cross-Section-high-res.jpg) (11818×10161). Also [Monografie… Atlas – Coupe sur le Transsepte e le porches.jpg](https://commons.wikimedia.org/wiki/File:Monografie_de_la_Cathedrale_de_Chartres_-_Atlas_-_Coupe_sur_le_Transsepte_e_le_porches.jpg) | J.-B.-A. Lassus, *Monographie de la cathédrale de Chartres*, Atlas (19th c.) | Public domain (age) | Yes; free | File name says "cross-section" but its credit line names plate 35 "Coupe longitudinale"; open the image to confirm which section it is. Very large file: make a web derivative, don't store the original in Git |
| 5c | Flying-buttress detail drawing (optional). | [Arc.boutant.cathedrale.Chartres.png](https://commons.wikimedia.org/wiki/File:Arc.boutant.cathedrale.Chartres.png) (630×629) | Not stated; probably Viollet-le-Duc, *Dictionnaire raisonné*, "Arc-boutant" | Public domain (stated) | Yes | **Author and source missing on the file page.** Confirm against the *Dictionnaire* (t. 1) before use, or skip |
| 6 | Saint-Denis ambulatory (section 3). Suger's ring of chapels and windows. | [Basilica Saint Denis ambulatory.JPG](https://commons.wikimedia.org/wiki/File:Basilica_Saint_Denis_ambulatory.JPG) (1467×2128, 2005) | Beckstet | CC BY-SA 3.0 | Yes | Low resolution. Per the CMN, the 12th-c. glass was removed in 1997 and copies installed in 2023 (S11), so a 2005 photo shows neither; the caption must say the windows are not the original 12th-c. glass. Better: a post-2023 photo, or a plan such as [Déambulatoire de Saint-Denis.png](https://commons.wikimedia.org/wiki/File:D%C3%A9ambulatoire_de_Saint-Denis.png) (PD, from a Gallica plan, but only 216×200 px) |
| 7 | How a window is made (section 4). | **Draw our own simple diagram**: coloured glass, painted line, lead came in H-section, iron bar. | ArtPilot | Own work | — | Must follow the V&A description (S12) and be labelled as a schematic |
| 8 | Belle Verrière (section 4). 12th-c. Virgin reset in a 13th-c. window. | [Chartres - cathédrale - ND de la belle verrière.JPG](https://commons.wikimedia.org/wiki/File:Chartres_-_cath%C3%A9drale_-_ND_de_la_belle_verri%C3%A8re.JPG) (1378×3416, 2009). Alternative: [Lassus chromolithograph](https://commons.wikimedia.org/wiki/File:Monografie_de_la_Cathedrale_de_Chartres_-_Atlas_-_Notre_Dame_de_la_Belle_Verri%C3%A8re_-_Feuille_B_Chromo-lithographie.jpg) (PD; a 19th-c. copy, not the glass) | Eusebius | Public domain (uploader declaration) | Yes | Dating of the panels needs a specialist source (C-43) |
| 9 | Good Samaritan window (section 4). Reading a narrative window. | [Chartres Bay 44 Good Samaritan Panel 12.jpg](https://commons.wikimedia.org/wiki/File:Chartres_Bay_44_Good_Samaritan_Panel_12.jpg) (1067×800). Full window: [Bay 44 Full](https://commons.wikimedia.org/wiki/File:Chartres_Bay_44_Good_Samaritan_Full.jpg) (only 231×800). Alternative: Vanderbilt *Art in the Christian Tradition* images (marked PD on Commons) | JBThomas4 | CC BY-SA 4.0 | Yes | Full-window image is too small; the Vanderbilt images' PD status should be checked against Vanderbilt's own terms |
| 10 | North porch jamb statues, c. 1210–1225 (section 5). Comparison with image 1. | **Not yet selected** (not searched in this batch) | — | — | — | Phase 4.0-B search |
| 11 | Labyrinth (section 5). | [Chartres cathedrale labyrinthe.jpg](https://commons.wikimedia.org/wiki/File:Chartres_cathedrale_labyrinthe.jpg) (2112×2816, 2008) | Cruccone | CC BY-SA 3.0 | Yes | Avoid [Labyrinth at Chartres Cathedral.JPG](https://commons.wikimedia.org/wiki/File:Labyrinth_at_Chartres_Cathedral.JPG): no author metadata |
| 11b | Static labyrinth plan (section 5, `【图 11b】`). Shows the single path and 11 circuits; no interaction in this version. | **Draw our own vector tracing.** The c. 1200 design is public domain. Do not trace the CC BY-SA [ChartresLabyrinthColored.png](https://commons.wikimedia.org/wiki/File:ChartresLabyrinthColored.png), which would make it an adaptation. | ArtPilot | Own work | — | Draw from a public-domain source (e.g. a Lassus plate) or a geometric reconstruction of the 11-circuit design, and check against the measured photo |

**Exterior silhouette (optional, not placed).** [Chartres cathedral (West façade).jpg](https://commons.wikimedia.org/wiki/File:Chartres_cathedral_(West_fa%C3%A7ade).jpg) (Dcconsta, CC BY-SA 3.0, 2000×2334) or the Lassus south-façade elevation ([ChartresCathedral-SouthFacade-high-res.jpg](https://commons.wikimedia.org/wiki/File:ChartresCathedral-SouthFacade-high-res.jpg), PD). Use one only if the opening needs an exterior view.

**Credit line format** (for the lesson's sources and rights block):
> 图 5：Andreas F. Borchert，《Chartres Cathedral Buttresses N》，2007，CC BY-SA 4.0，经 Wikimedia Commons；本课裁切使用。

**Asset status, honestly stated.** No indispensable subject is blocked: nave, elevation, buttresses, glass and labyrinth each have at least one freely licensed candidate. Still unresolved:

| Image | Status |
|---|---|
| 4 (vault from below) | **Not found.** No suitable candidate yet. |
| 10 (north-porch statues) | **Not searched** in Phase 4.0-A. |
| 3 (elevation) | Usable, but **weak provenance**: public domain by uploader declaration, transferred from de.wikipedia. Fallback: crop of image 2. |
| 5b (Lassus section) | Public domain. **Label mismatch:** the file name says "cross-section" but the credit names the longitudinal plate. Open the file to confirm before use. |
| 5c (buttress drawing) | **Author and source missing** on the file page. Do not use until traced to Viollet-le-Duc's *Dictionnaire*. |
| 6 (Saint-Denis ambulatory) | Usable, but **low resolution**, and the windows shown are not the 12th-c. glass. A careful caption is required. |
| 8 (Belle Verrière) | Usable; public domain by uploader declaration. The dating of the panels in the caption depends on C-43, which is not yet confirmed by a specialist. |
| 9 (Good Samaritan) | Panel image usable (CC BY-SA 4.0). **Full-window image too small** (231×800). The Vanderbilt public-domain status is not checked against Vanderbilt's own terms. |
| All CC BY-SA images | Attribution per rule 2; crops stay CC BY-SA. Re-check every file page at import. |
| French image law (rule 6) | **Not verified.** |

## 3. Interactions

**Scope after the correction pass:**
- Kept: Interaction A (the wall's levels) and Interaction B (structure, buttresses and window openings, qualitative only).
- Deferred: Interaction C (labyrinth tracing). Its teaching content stays in the lesson as text, the photo (image 11) and a static plan (image 11b).
- Removed: the drag-label closing challenge.
- Rejected: 3D models, light simulations, structural physics and a maze game.

### Interaction A: Count the wall (`【互动 A】`, section 1). Kept.

1. **Learning problem.** Learners see "a wall with windows" and miss that the wall is organised in storeys, or that Chartres gave up the wide tribune to gain window height.
2. **Learner action.** Tap the three storeys on the bay photo (image 3), bottom to top. Then flip a toggle: "带楼廊的墙（示意）" vs "沙特尔的三层墙".
3. **Visible response.** Each tap outlines one storey and names it. The toggle swaps in a simple two-column schematic: in the first, a tribune band sits above the arcade and the clerestory is smaller.
4. **Explanation.** "楼廊的高度被让给了窗。这一步之所以可能，要看下一节的飞扶壁。"
5. **Why it is worthwhile.** Finding the storeys yourself builds the habit of reading a wall. It also sets up the section 2 question ("why didn't it collapse?") without lecturing.
6. **What it does not represent.** The tribune schematic is generic, not a specific earlier building; proportions are approximate. Caption: "示意图，比例为近似".

**Build note.** The existing `CompositionMap` locator mode (labelled rectangles on an image) can likely be reused for the hotspots. The toggle is a small addition.

### Interaction B: Where does the push go? (`【互动 B】`, section 2). Kept, qualitative only.

1. **Learning problem.** Learners think stone vaults only press down, think flying buttresses are decoration, or believe one "invention" made Gothic possible.
2. **Learner action.** On a simplified cross-section (drawn from image 5b), switch the flying buttress on and off.
3. **Visible response.**
   - **On:** an outward arrow at the top of the nave wall continues along the flying buttress to the outer pier and down to the ground. The wall is thin and the clerestory window large.
   - **Off:** the same arrow stops at the wall. The schematic then shows what the wall would need instead: it becomes thicker and the clerestory window shrinks.
   - Arrows show **direction only**. All have the same thickness and no values are given.
4. **Explanation.** "飞扶壁不是让推力消失，而是把它搬到了墙外；所以墙可以变薄、窗可以变大。几项做法互相依赖。"
5. **Why it is worthwhile.** Thrust is invisible. A cause-and-effect toggle makes the dependency between buttress, wall and window concrete, which is the core of the lesson's answer.
6. **What it does not represent.**
   - No forces are calculated or compared, and wind loads and the roof are left out.
   - The "thicker wall" state is a schematic alternative, not a historical design.
   - Round vs pointed arches are **not** compared for thrust (see C-21): the thrust of any arch depends on its geometry and loading. If a pointed-arch illustration is wanted, it shows only the height alignment of different spans, as a static figure.
   - The rib-function debate (C-23) is not shown.
   - Caption: "示意，不是结构计算".

### Interaction C: labyrinth tracing. Deferred.

Not built in Phase 4.0-B unless the Product Owner reopens it. What stays in the lesson:
- the photo (image 11);
- a static plan (image 11b) showing the single path and 11 circuits;
- the measured facts (about 12.9 m across, about 261.5 m long, one path);
- the four-layer evidence discussion, as text.

The earlier specification, recorded here for a possible later version:
- trace the single path with a finger, mouse or the arrow keys;
- a distance counter against about 261.5 m;
- the evidence card opening at the centre;
- no ritual reconstruction or dance animation.

### Course completion and the optional reasoning question (COL-01)

- **Completion.** Completing the lesson earns the Chartres card. Claiming the card must **not** depend on passing any quiz or challenge. How "completed" is detected (for example, reaching the end of the reading) is a Phase 4.0-B implementation decision.
- **Optional reinforcement.** After "回到开头的问题", one optional reasoning question: "如果没有飞扶壁，这面墙最可能怎样改变？"
  - Four options; the reference answer is "墙要更厚、窗要更小".
  - Each option has its own explanation, as in the existing quiz component.
  - Skipping it, or answering it wrongly, does not affect completion or the card.
- The drag-label closing challenge from the first version is **removed**.

**Product Owner decision (2026-10-25), site-wide:** completing a lesson earns its card; any end-of-lesson question is optional.

This replaces the Phase 3.2-B rule, under which the Fan Kuan card unlocked only on a correct quiz answer. Planned for Phase 4.0-B, not done in 4.0-A:
- **Fan Kuan.** Change the unlock trigger from "quiz answered correctly" to lesson completion, and make the quiz optional.
- **`tests/contract.test.js`.** Replace the "exactly one quiz between reflection and sources" test with the new rule, e.g. "every lesson with a card has a completion point; any closing question is optional".
- **`docs/ART_DIRECTION.md`.** Rewrite the "Closing challenge" step to match.
- **Completion signal.** Define what counts as "completed" (for example, reaching the end of the reading), and keep the existing local-only storage.

## 4. Open asset and production requirements for Phase 4.0-B

1. **Artwork record for a building.** The `artworks` schema requires `dimensionsCm.height/width` and a single `medium`, which suit a painting, not a cathedral. A building needs fields such as location, construction span, materials and key measurements with sources. **Schema change: Product Owner approval required.**
2. **Card for a building.** The card's `facets` and `card.focus` should work, but "尺幅" makes no sense for a building; the facet labels would be, for example, 地域 / 类型 / 年代 / 材料. A cover crop of the nave or west front is needed.
3. **Per-image attribution fields** (section 1, rule 7) and a rights block that lists several photographers.
4. **Glossary records.**
   - The manuscript now separates 10 core terms (shown as this lesson's tags) from 11 reference terms (shared vocabulary).
   - All 21 should become stable glossary IDs, because several (中殿, 尖拱, 飞扶壁, 肋架拱顶, 回廊) will be reused by courses 20, 31 and 36.
5. **Find images 4 and 10**, and resolve the open items in the asset-status table above.
6. **Draw two simple diagrams** (window construction; static labyrinth plan) and **one schematic pair** for Interaction B (buttress on/off). Optionally, also one static figure showing pointed arches of different spans rising to the same height.
7. **Image sizes.** Lassus plates are 10,000–17,000 px wide. Produce web derivatives and keep the originals out of Git, per the baseline.
8. **Card-unlock rule.** Decided: completion earns the card and any end-of-lesson question is optional. Apply it to Fan Kuan, the contract test and `ART_DIRECTION.md` (section 3) before building the Chartres lesson page.
9. **Scholarly review items** listed in `SOURCES_AND_CLAIMS.md`, section 6.
