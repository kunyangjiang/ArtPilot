# Phase 4.17: Stage 07 Batch A (Courses 64–68): sources, image rights and selection

**Checked:** 2026-10-28.

**Rights standard (Product Owner decision):** strict. An image is shown only when the work is public domain everywhere:
the artist died more than 70 years ago, and the work is also public domain in the United States. Everything else is
described in text and linked to the holding museum.

## How sources were read

| Source | How it was read |
|---|---|
| SFMOMA | Object pages read with WebFetch and in the browser: *Femme au chapeau* 91.161 and *Fountain* 98.291, including Bishop's text, the audio-description colour notes and the audio-guide transcript. |
| Met | Heilbrunn essays read as page HTML: "Fauvism", "Henri Matisse", "Cubism", "Geometric Abstraction" and "Surrealism". Object pages for 1999.363.28 and 2018.216 were read in the browser. |
| Art Institute of Chicago | Public API records and IIIF image for 1931.511 and 1958.525, including exhibition history and provenance. |
| MoMA | Object pages read in the built-in browser: 12.1951, 78.1936, 1133.1964 and 162.1934, plus the "Exquisite corpse" art-term page. WebFetch returns 403 on MoMA. |
| Tate | "Five ways to look at Malevich's Black Square"; caption for T07573 *Fountain*. The catalogue tab would not render, so SFMOMA was used for the history of the replicas. |
| Guggenheim | Tanguy biography read in the browser. Non-essential cookies were not accepted. |
| Städel | Record of SG 3531, the *Programm der Künstlergruppe Brücke*. |
| RKD | Mondrian catalogue raisonné online, 1920–1921 section, B115. |
| andrebreton.fr | Record 56600101000386: provenance of *Maman, papa est blessé !*. |
| LACMA | Object 31931, Magritte 78.7, read with WebFetch. |
| Smithsonian Magazine | Danny Lewis, 16 Nov 2015 (the Tretyakov X-ray study). |
| Primary texts | Eddy, *Cubists and Post-Impressionism* (1914), pp. 125–126, Internet Archive. Kandinsky, *Concerning the Spiritual in Art* (Sadler translation), Project Gutenberg. *The Blind Man* No. 2 (May 1917): Internet Archive text plus the Commons page scans. |

## Pages that could not be read, and texts not checked at source

- **Breton's 1924 manifesto:** the definition was checked only against secondary quotations (schoolmouv.fr, critiqueslibres.com, a Galerie Vallois press release). The first edition was not consulted. Lesson 68 says so in its sources.
- **Naumann 1982 letter article (AAJ):** cited for the 11 April 1917 letter. The article itself was not read in full; the wording of the letter that the lesson relies on is the commonly quoted English.
- **2019 Burlington Magazine article on Louise Norton:** not read. An earlier draft cited it with an unverified author and title; that citation was removed.
- **Tate catalogue entry for T07573:** did not render.
- **MoMA object texts beyond the summary panel:** only the facts shown on the object pages are used.

## Image handling

- Images were resized to at most 1600 px on the long side, recompressed and not recoloured.
- Exceptions:
  - the "large" Kandinsky copy at 2600 px for DistanceView;
  - Malevich's *Black Square* at its source size (1196 × 1199);
  - Mondrian 1921 at its source size (654 × 1000, low resolution);
  - the *Blind Man* p. 5 scan at its source size (1115 × 1560).
- No crops.
- Wikimedia rate-limited downloads of original files (HTTP 429). The last images were taken from Commons thumbnails of the same files, at the same resolution or close to it.
- **Dropped during production:**
  - Mondrian's *Gray Tree*: download failed, and it is not needed; the lesson mentions it in text only.
  - shakko's CC BY-SA 4.0 gallery photo of the *Black Square* surface: the PD Tretyakov image already shows the craquelure. The lesson's PhotoMarks point to the cracks on that image instead, so no CC BY-SA image is used in this batch.
  - Tanguy's *Fantômas* (1925): low-resolution OpenEdition source.
  - The *Révolution surréaliste* 1927 plate: the artist could not be attributed from the file.

## Repeats checked

- None of the artists or works in Courses 64–68 is featured or mentioned elsewhere in `src/content`.
- No `public/img` file name collided.

## Course 64: Matisse, *Woman with a Hat* (SFMOMA 91.161)

**Sources:**
- SFMOMA: Bishop's text on how the painting was made and shown, and Matisse's remark about the dress, "Well, black, of course".
- Met "Fauvism" (Rewald 2004): Collioure in 1905, Vauxcelles in *Gil Blas*, a loose group.
- Met "Henri Matisse": *Notes of a Painter*, 1908.
- MoMA 12.1951: Kirchner, *Street, Dresden*. Dated 1908 and reworked 1919, with "1907" written on the canvas; 150.5 × 200.4 cm.
- Städel SG 3531: the 1906 Brücke programme woodcut.

**Images:**
- Commons PD-Art copies of the Matisse and the Kirchner.
- *Open Window, Collioure*: a visitor's gallery photograph from NGA; the caption says so.
- Städel PD image of the woodcut.

**Uncertainty shown in the lesson:**
- Colours depend on the photographs.
- Green does not mean "anxiety": the InferenceChain verdict is *unknowable*.
- The painter's mood is not readable from the colours.

**A+:** Matisse (principal); Kirchner's *Street, Dresden* as an extra. It is the lesson's second case, not a comparison: Expressionism uses the same strong colour for a different problem. *Open Window* and the Brücke woodcut were declined (supporting).

## Course 65: Gris, *Still Life with a Guitar* (Met 1999.363.28)

**Sources:**
- Met object pages 1999.363.28 and 2018.216, with the materials list of *The Musician's Table*.
- AIC 1958.525: the Indépendants 1912 catalogue entry ("Figure", no. 1426) and the 1921 Kahnweiler sequestration sale.
- Met "Cubism": the Trocadéro visit of 1907.

**Images:** Commons PD-Art. Picasso and Braque are still in copyright and appear only in text.

**Uncertainty shown in the lesson:**
- The "multiple viewpoints" explanation is tested in an InferenceChain rather than asserted.
- The role of African objects is given with caution.

**A+:** Gris (principal); *Portrait of Pablo Picasso* as an extra. It is the cubist portrait the lesson analyses in its own section with PhotoMarks. *The Musician's Table* was declined (supporting, for the papier collé point).

## Course 66: Kandinsky, *Improvisation No. 30 (Cannons)* (AIC 1931.511)

**Sources:**
- Kandinsky's letter to Eddy (Eddy 1914, pp. 125–126), quoted.
- *Concerning the Spiritual in Art*: impressions, improvisations and compositions.
- Met "Geometric Abstraction".
- RKD B115.
- Tate on the *Black Square*: the 0.10 exhibition, the icon corner, the 1913 date painted on in 1915, four versions.
- Smithsonian 2015: the X-ray layers.

**Images:**
- AIC CC0: the Kandinsky.
- RKD via Commons (PD-Art): the Mondrian.
- Tretyakov via Commons (PD-Art): the *Black Square*.
- 1915 photograph of the 0.10 installation: PD.

**Uncertainty shown in the lesson:**
- The Mondrian's dimensions were not confirmed with the museum; its card shows elements instead of a size.
- The *Black Square* dimensions come from the Commons description.
- Whether the uneven craquelure corresponds to the hidden compositions is stated as unexplained.
- "Religious art" receives the verdict *plausible*.

**A+:** Kandinsky (principal); the *Black Square* and the Mondrian as extras. Each is one of the lesson's three separate routes to abstraction, with its own section.

## Course 67: Duchamp (generally attributed), *Fountain*, 1917; Stieglitz photograph

**Sources:**
- *The Blind Man* No. 2: the cover and p. 5, "The Richard Mutt Case", quoted.
- Tate caption for T07573: the readymade definition, the 1964 replica in glazed earthenware.
- SFMOMA 98.291: Mott Iron Works; "rejected an hour before opening" versus Duchamp's own partition recollection; versions from 1938; the fourth full-scale version of 1964.
- Duchamp's letter of 11 April 1917 to his sister: the authorship debate.

**Images:** the Stieglitz photograph and both magazine pages are 1917 US publications, so public domain. The later Duchamp replicas are not shown.

**Uncertainty shown in the lesson:**
- Authorship is debated; the card says "杜尚（一般认为）" ("Duchamp (generally attributed)").
- Rejection and hiding are both reported; the lesson says the accounts conflict.
- The original is lost.
- Whether the 1917 object itself is a copyrighted work is not decided; only the photograph is used.
- The Commons description says the background painting in the photograph is Hartley's *The Warriors*; the lesson reports this as that description says it.

**A+:** one card. Declined: the magazine pages (supporting documents, not separate works).

## Course 68: Rozsda, *Sacred and Profane Love* (Amour sacré, Amour profane), c. 1945 — revised

**Why revised:** the Tanguy images could not be shown under the strict standard (see the rights verification and licence search below). The Product Owner chose not to license them and authorised a rebuild around explicitly licensed works. Course title, purpose and glossary are unchanged.

**Principal work:** Endre Rozsda (1913–1999), *Sacred and Profane Love*.
- Oil on canvas, 115 × 75.5 cm, Musée des Beaux-Arts de Dijon, per the plate list of the 2019 Mélusine proceedings.
- Date: the sources disagree (plate list c. 1945; one essay 1944; Commons 1944; rozsda.com alt text 1947). The lesson uses 约 1945 年 and says so.
- Identity check: the Commons image matches the proceedings' printed figure, aspect ratio included (0.739 vs 0.741). That ratio does not match the published 115 × 75.5 cm (0.66); the record notes this. Not checked with Dijon.
- Why this work: the proceedings (Py; chronology) say Breton chose it to illustrate his text on Rozsda in *Le Surréalisme et la peinture*. It is also the documented case of Rozsda's "reiterated automatism": a synthesis of two different paintings.

**Supporting images (same licence; no extra cards):**
- *My Grandmother's Lorgnette* (*Face à mains de ma grand-mère*), 1947, 95 × 77 cm, Atelier Rozsda. Shown as signed and turned 180°; the proceedings print it upside down and say so.
- *My First Steps in Hell*, 1945–46 per the proceedings (Commons: 1947).

**Image licence, checked on each file page and in its history:**
- All three files: CC BY-SA 4.0, `{{self|cc-by-sa-4.0}}`, source rozsda.com (the Amis d'Endre Rozsda association site).
- Permission ticket 2018022710011712, added by VRT agent Regasterios in March 2018. The files were cross-wiki uploads from huwiki by P5ortugal (Dec 2017 – Jan 2018) and have not been challenged since.
- The ticket's content is confidential, so the licence was not confirmed with the rights holder directly. The rozsda.com footer reads "Tous droits réservés"; the images come from the licensed Commons files, not from that site.
- Credits give the author, licence, licence URL, Commons source and changes.
- The resized copies and the rotated lorgnette are adaptations; they are released under CC BY-SA 4.0, as the credits say.

**Sources:**
- Py & Mangani (eds.), *Endre Rozsda*, APRES study-day proceedings (Mélusine numérique, 2019), English PDF read in full text. It covers:
  - Paris 1938: the International Surrealist Exhibition had just closed; Gilot's 2009 recollection of the Jeanne Bucher cellar; the Gradiva collection moved there by Tanguy;
  - Breton's 1939 *Minotaure* article on the return to automatism;
  - 1943 return to Budapest; 1944 hiding; his mother's death in deportation;
  - the European School; 1949–55; 1956–57;
  - Breton's 1957 preface; 1961 Milan; 1964 Copley Prize;
  - reiterated automatism, rotating canvases from 1946, Kandinsky's upside-down painting, the lorgnette study, the Titian title, the Kállai quotation.
- Mélusine presentation page (Py).
- Hungarian National Gallery biography.
- Met "Surrealism"; Breton 1924 (translated for the lesson; checked against secondary quotations only).
- Guggenheim Tanguy biography; MoMA 78.1936, 162.1934 and the exquisite-corpse term page; LACMA 78.7; Met 55.179 (Kay Sage). All works by artists still in copyright appear as text plus links.

**Uncertainty shown in the lesson:**
- The date and dimensions of the principal work.
- "Lace or fabric prints" is the lesson's description; the proceedings mention lace traces generally.
- The lorgnette study (skull, snout, spectacles) is not shown.
- The Kállai quotation is a reading of the period, not a description of a specific painting.
- "Titian's two women in the picture" receives the verdict *unknowable*; "starts from automatism, then selection" receives *justified*.
- Rozsda is not presented as part of 1920s Paris: he did not meet Breton until 1957.

**A+:** one card (Rozsda). The lorgnette and *My First Steps in Hell* were declined: they demonstrate the principal work's method and context and are not separate cases.

**Assets:** removed `tanguy-mama-papa.jpg`, `tanguy-vite.jpg`, their Study Table copies and `tanguy-mama-papa.json`, all used only by Course 68 and never committed. Added `rozsda-amour-sacre.jpg`, `-large.jpg`, `rozsda-lorgnette.jpg`, `-rotated.jpg` and `rozsda-enfer.jpg`.

### Earlier Tanguy rights work (superseded)

#### Rights verification (2026-10-28, requested before release)

**1. Works and image origin**

| Work | Date | Holder | Image used |
|---|---|---|---|
| *Mama, Papa Is Wounded!* | 1927, oil on canvas | MoMA 78.1936, purchased 1936 | Commons file uploaded 13 Jan 2026 by Hitsuji777 |
| *Vite! Vite!* | 1926, oil on wood | MoMA 1133.1964, Kay Sage Tanguy Bequest | Commons file uploaded 17 Jan 2026 by the same uploader |

- Both Commons files match MoMA's own images. Neither page states a source URL.
- Both are licensed only as `{{PD-Art|PD-old-auto-expired|deathyear=1955}}`. That template covers life + 70 jurisdictions; neither page gives a US basis.
- Wikidata marks MoMA's "copyrighted" statement as deprecated. Its public-domain claim cites only "70 years after death"; for *Vite! Vite!* it adds "published more than 95 years ago", with no evidence.

**2. Publication status.** No reproduction of either work before 1931 was found.
- *La Révolution surréaliste* no. 9–10 (1927) contains a Tanguy plate, but not these works.
- Breton's archive records a reproduction of *Mama, Papa* in *Life*, 24 September 1945, p. 65.
- MoMA has held *Mama, Papa* since 1936. Not checked: MoMA publications after 1936, and Kay Sage's 1963 compilation of Tanguy's works.

**3. US basis.** Exhibiting a painting is generally not "publication" under the 1909 Act, so the 1927 show settles nothing.
- First published before 1931: public domain.
- First published 1931–1977: probably protected for 95 years from publication. A French-origin work that was still in copyright in France on 1 January 1996 had its US copyright restored under the URAA (17 U.S.C. § 104A). A 1936 publication would run to the end of 2031; 1945 would run to the end of 2040.
- Unpublished before 1978, then published 1978–2002: protected at least through 2047 (17 U.S.C. § 303).
- Unpublished until after 2002: life + 70 has expired, so public domain.

For *Mama, Papa*, the documented 1945 reproduction and no evidence of an earlier one point to probable US protection. For *Vite! Vite!*, the status is unknown.

**4. Life + 70 jurisdictions**
- **EU and France:** public domain from 1 January 2026. France's wartime extensions are absorbed by the 70-year term and don't apply here, and Tanguy was not "mort pour la France".
- **Outliers (same issue as Matisse, d. 1954, in Course 64; not reopened):**
  - Spain gives life + 80 to authors who died before 7 December 1987, so protection runs to the end of 2035.
  - Mexico gives life + 100, and some other countries have longer terms.

**5. MoMA's statement.** "© 2026 Estate of Yves Tanguy / ARS" names the estate and ARS, not MoMA or a photographer. It refers to the underlying artworks, and its year is template-generated: it read "© 2019" in 2019.
- It is stale for the EU.
- It may still be accurate for the US.
- Reproduction rights are a separate matter, under MoMA's image licensing and website terms. Faithful photographs of two-dimensional works are not separately protected in the US (*Bridgeman v. Corel*) or the EU (DSM Directive, Art. 14). The images came via Commons, not directly from MoMA.

**Decision.** US public-domain status cannot be established for either work, and for *Mama, Papa* the evidence points the other way. Under the strict standard (life + 70 and public domain in the US), Course 68's two Tanguy images should not be released as they stand. Course 68 is held pending a decision.

#### Search for explicitly licensed Surrealist images (2026-10-28, bounded)

**Open-access museum collections**
- **AIC** (`is_public_domain`): no Surrealist works.
- **Met** (v1.1 search):
  - Tanguy, de Chirico, Ernst, Masson, Miró, Matta, Kay Sage, Lam and Agar are all `PD=False`;
  - the Met's own Tanguys include *The Hostages*, 1934 (Kay Sage bequest).
- **Cleveland** (CC0): no Surrealist works.

**Wikimedia Commons, files with a rights-holder permission ticket (`PermissionTicket`)**
- Nothing for Tanguy, Ernst, Magritte, Kay Sage, Toyen or Remedios Varo.
- The Ernst and Magritte hits are homages, banknotes or photographs, not their works.
- Two historical Surrealists do have rights-holder licences:
  - **Endre Rozsda** (1913–1999; in Paris from 1938; André Breton prefaced his 1957 Galerie Furstenberg exhibition, per the Mélusine surrealism research site).
    - About 30 files, sourced from the estate site rozsda.com, licensed CC BY-SA 4.0 under VRT tickets 2018022710011712 and 2018022010006161.
    - Works include *Deux personnes seules* (1939), *Le Roi du vrai* (1942), *Oneiric Composition* (c. 1943), *Amour sacré, Amour profane* (1944) and *Mes premiers pas en enfer* (1947).
    - High resolution, up to about 5000 px.
  - **Eva Švankmajerová** (Czech Surrealist Group, postwar): one drawing, CC BY 4.0, ticket 2025062610005488.

**Assessment**
- No licensed image was found for any of the 1924–1930 Paris Surrealists that Course 68 is built on.
- Rozsda's licence is explicit and suitable for public web display. Conditions: attribution and a licence link, and any resized or altered copy released under CC BY-SA 4.0.
- He is a later, peripheral figure, and Course 68's close-looking sections are built on Tanguy's 1927 picture. Using him would mean a new principal work and a rewrite: a Product Owner decision, not a substitution.
- Course 68 remains held. Nothing was rewritten.

The record `tanguy-mama-papa.json` states US public-domain status. That claim is unsupported and must be corrected or withdrawn along with whichever option is chosen.

**Uncertainty shown in the lesson:**
- The origin of the title is unknown.
- "It paints a dream" and "the red pole is the wounded father" both receive the verdict *unknowable*.

**A+:** one card. *Vite! Vite!* was declined: it is a comparison showing the change between 1926 and 1927, not a second case.

## Expansion of Courses 64–68 (2026-10-28, requested after review)

Each lesson gained new sections, one or more new supporting images, and a new interaction where it helps. There are no new cards, no new components and no curriculum change.

| Course | New sections | New images (rights) | New interaction |
|---|---|---|---|
| 64 | Munich and the Blue Rider (Marc's 12 Dec 1910 colour letter, via Barnett 2018); 1937 "Degenerate Art" and Kirchner's 12 July 1937 letter (GHDI) | Marc, *The Bewitched Mill*, 1913: AIC CC0; published in Eddy 1919 | PhotoMarks |
| 65 | Apollinaire, *Les Peintres cubistes* (1913, Gutenberg; translated for the lesson): Room 41, Gris joining in 1912, "art de conception", the four tendencies, the verdict on Gris; Delaunay's Eiffel Tower and Orphism as a movement across several countries (Guggenheim 2024–25) | Delaunay, *La Tour*, 1926 lithograph: Cleveland CC0 | SortGame (Apollinaire's categories), PhotoMarks |
| 66 | *Landscape with Two Poplars* (1912) to *Improvisation 30* (1913); Hilma af Klint, text only (Guggenheim 2018) | Kandinsky, *Landscape with Two Poplars*: AIC CC0 | FeatureCompare |
| 67 | Dada in Zürich (Ball, Getty Scores Project) and Hanover (Schwitters, Cleveland record); *God*, c. 1917, text only (PMA; Met 1973.637); the 2004 poll (Irish Times, 4 Dec 2004) | Hugo Ball 1916 postcard photograph: anonymous, published 1916, PD-US and PD-anon-70-EU. Schwitters, *Merz 3* plate 1, 1923: Cleveland CC0, a published portfolio | PhotoMarks, FeatureCompare |
| 68 | Koga Harue, *Sea* (1929, MOMAT O00389): find the look-alike pairs (MOMAT commentary; Gloria Swanson postcard); its exhibition history from the national museums database | Koga, *Sea*: Commons PD-Art / PD-Japan / PD-US | FindOnImage |

**Rights reasoning and rejections**
- **Koga:** died 1933, so public domain in Japan since 1984. That means the 1996 URAA restoration of foreign copyrights cannot apply. Shown in 1929, and in exhibitions in 1934, 1937 and 1962–75.
  - Remaining uncertainty: no specific pre-1978 reproduction with a plate was located. Any such publication would put it beyond the 1978–2002 rule.
- **Schwitters, *Little Dance* (1920 collage), rejected** although Cleveland marks it CC0: its first known reproduction is 1963. The published 1923 portfolio plate was used instead.
- **Met photograph of *God* (1973.637), not used:** the Met API now gives `isPublicDomain: false`, even though Commons holds an older Met open-access copy.
- **Hilma af Klint, text only:** most of her work was first made public in 1986, which raises the US 1978–2002 issue.

**Wording deliberately kept cautious**
- Kirchner's motive for suicide is not stated.
- The male-principle colour code is presented as Marc's own system, not a universal key.
- How Koga encountered Paris Surrealism is not claimed.
- Dada is called "one of the earliest" in Zürich (per Getty), not "first".

### Course 68: Surrealism around the world (added after the expansion)

**New section.** "不只在巴黎：超现实主义在世界各地" ("Not only Paris: Surrealism around the world"), framed by Tate and the Met's *Surrealism Beyond Borders* (2022): "not a style – but a state of mind"; centres from Buenos Aires to Tokyo. Five entries:

| Place | Work | Source |
|---|---|---|
| Cairo | 22 Dec 1938 manifesto "Long Live Degenerate Art" (linked back to Course 64's 1937 section); Art et Liberté inaugurated 19 Jan 1939; Inji Efflatoun, *Surrealist Composition* (1942) | Clare Davies, *Tate Etc.* 41, 2017 |
| Cuba | Wifredo Lam, *The Jungle* (1942–43) | MoMA 140.1945 label |
| Mexico | Leonora Carrington, *Self-Portrait* (c. 1937–38) | Met 2002.456.1 description and audio quote |
| USA | Arshile Gorky, *Water of the Flowery Mill* (1944); Helen Lundeberg named | Met 56.205.1 label; Tate exhibition page |
| Japan | Toshiko Okanoue, *The Call* (1953) | Tate exhibition page: title, date and holder only; nothing more claimed |

**Images.** All five are text plus official links.
- Bounded search: AIC, Cleveland, the Met, the Smithsonian (SAAM) and Yale's open-access releases contain no qualifying Surrealist works from these regions. The only SAAM Gorky CC0 works date from 1928–31 and are not Surrealist.
- Commons files for Štyrský, Gorky and Nash carry only generic PD-Art tags, with no documented US basis for their Surrealist-period works.
- So Koga's *Sea* remains the only non-European Surrealist image shown.

## Font subsets

- `public/fonts/noto-serif-sc-300-600.woff2` and `noto-sans-sc-300-500.woff2` were regenerated with `scripts/fonts/make_fonts.py`, from the same google/fonts sources and versions as the README.
- They now cover 1,643 Han characters, regenerated again after the Course 68 revision (2 new characters).
- The Bodoni subsets were not replaced.
