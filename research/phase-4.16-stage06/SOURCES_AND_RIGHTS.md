# Phase 4.16: Stage 06 (Courses 57–63): sources, image rights and selection

**Checked:** 2026-10-28.

## How sources were read

| Source | How it was read |
|---|---|
| Hamburger Kunsthalle online collection | Read in the built-in browser. The text and the "Provenienz" tab were opened with a real click. |
| Tate | Caption and artwork details read in the built-in browser. Non-essential cookies were declined. |
| SKD (Dresden) online collection | Record of *Die Steinklopfer* read in the browser. |
| Met | Collection API (`v1/objects`, `v1.1/search`). Object pages, catalogue entries and audio transcripts were read in the browser. Heilbrunn essays were fetched as page HTML. |
| National Gallery of Art | Object pages read in the browser. Images came via the Commons copies of NGA open-access files. |
| Art Institute of Chicago | Public API record and IIIF image. |
| Britannica | Topic and biography pages read in the browser. |
| MIT Visualizing Cultures, caa.reviews, Smarthistory (LibreTexts copy), RIEB abstract, Morse letter transcription, Art Blart | Read with WebFetch. |
| Van Gogh letters (letter 783) | Read in the browser. |
| Primary texts | Burke (1757), Talbot's *Pencil of Nature* and Baudelaire's *Salon de 1859* were read in full-text editions (Project Gutenberg and French Wikisource). The *Dianshizhai Pictorial* preface was transcribed from the scan. |

## Pages that could not be read

None of these blocks was bypassed.

- **Musée d'Orsay:** Cloudflare challenge.
- **Louvre:** robot check.
- **Britannica** (Millet and *The Gleaners*): returned errors.
- **RIEB article on Américo:** full PDF unreadable here; only the abstract and bibliography were read, plus one search snippet saying the painting was made in Florence.
- **Courbet's 1855 manifesto:** French original not found.

## Image handling

- Images were resized to at most 1600 px on the long side, recompressed and not recoloured.
- Exceptions to that size:
  - "large" copies at 2600 px for DistanceView (Monet, Seurat);
  - Courbet's *Burial*, Church and Américo at 2000 px.
- One crop: `friedrich-wanderer-figure`.
- The *Dianshizhai* pages are renders of a Commons PDF scan that carries the scanning institution's watermark. The watermark is disclosed in the captions and was not removed.
- The 1889 Dianshizhai advertisement is a low-resolution image from a journal plate (410 × 677).

## Repeats checked

- Every candidate artist was searched in `src/content` before selection. None of the works is featured elsewhere.
- Cross-references only:
  - Friedrich is mentioned in passing in Course 45's record of a destroyed Caravaggio;
  - Gauguin is mentioned in Course 30;
  - Hokusai is mentioned in Course 50;
  - Borobudur (Course 22) is referenced from Course 61 but not shown again.
- No `public/img` file name collided.

## Course 57: Friedrich, *Wanderer above the Sea of Fog* (Hamburger Kunsthalle HK-5161)

**Sources:** Kunsthalle texts (Grave; Bertsch, 2023 catalogue) and provenance; Burke 1757; Britannica on Géricault, *The Raft of the Medusa* and *Liberty Leading the People*; Tate caption for Turner N00530.

**Images:** all Commons PD-Art. Friedrich (Cybershot800i reproduction), Géricault and Delacroix (Louvre), Turner (Web Gallery of Art).

**Uncertainty shown in the lesson:**
- The painting is unsigned and undated.
- The wanderer cannot be identified.
- In 1947 it was exhibited as a work by Carus.
- Turner's mast story is unprovable (Tate).

**A+:** Friedrich (principal); Géricault's *Raft* as an extra. *Liberty* and the Turner were declined as cards: they are supporting comparisons in this lesson.

## Course 58: Courbet, *A Burial at Ornans* (Orsay RF 325)

**Sources:** Britannica (Kenny); Met Heilbrunn (Finocchio, Galitz); SKD record of *The Stone Breakers*; Orsay's description of *The Gleaners* via Google Arts & Culture; Met catalogue entry for Daumier 29.100.129.

**Images:**
- *Burial* and *The Gleaners*: Google Art Project PD-Art.
- *The Stone Breakers*: an old colour reproduction (Web Gallery of Art). The original is destroyed, and the SKD image is rights-reserved.
- Met CC0: Daumier's *Third-Class Carriage* and his *Charivari* print (25 Dec 1856), and Millet's *Gleaners* etching.

**A+:** Courbet (principal); Millet's *The Gleaners* and Daumier's *Third-Class Carriage* as extras. Declined:
- *The Stone Breakers* (destroyed; only a reproduction survives);
- the prints (supporting).

## Course 59: Talbot, *The Open Door* (Met 2005.100.498)

**Sources:** Met essays by Malcolm Daniel (×3) and the Met's photography department essay on American photography; *The Pencil of Nature* plates II, VI and XXIV; Morse's letter of 9 Mar 1839 (transcription); Baudelaire 1859; Musée Delacroix press release (via Art Blart).

**Images:** Met CC0 for the Talbot prints ×3, Nadar's *Rossini* and Delacroix's drawing after Durieu. *Boulevard du Temple*: Commons scan of a publication.

**Uncertainty shown in the lesson:**
- Where the original *Boulevard du Temple* plate is now, and its condition, were not verified from the holder. The lesson makes no claim about it.
- "First photograph of a person" is treated as not knowable.

**A+:** Talbot only. Declined:
- Daguerre's plate (holder unverified);
- Nadar and Delacroix (supporting).

## Course 60: Monet, *Rouen Cathedral, West Façade, Sunlight* (NGA 1963.10.179)

**Sources:** NGA object pages for 1963.10.179, 1963.10.49 and 1970.17.48; Met essay "Impressionism: Art and Modernity" (Samu); Met catalogue entry for Degas 1987.47.1.

**Images:** NGA CC0 (via Commons) and Met CC0. The Met's own Rouen Cathedral (30.95.250) is not open access, so it was not used.

**Uncertainty shown in the lesson:**
- Colours depend on the photographs and screens.
- Possible pigment change is mentioned; the NGA article on it was not read.

**A+:** Monet (principal); Morisot's *Harbor at Lorient* and Degas's *Dance Class* as extras. Pissarro was declined (supporting).

## Course 61: Seurat, *A Sunday on La Grande Jatte — 1884* (AIC 1926.224)

**Sources:** AIC record; Met essays by Amory and Voorhies (×2); Leonard's caa.reviews review of the 2004 AIC exhibition (zinc yellow); Van Gogh letter 783; Met catalogue entry for Gauguin 51.112.2.

**Images:** AIC CC0 and Met CC0.

**Uncertainty shown in the lesson:**
- The zinc yellow has browned.
- Whether letter 783's "champ de blé" is the Met painting is unresolved.
- The colonial framing of Gauguin is stated.
- The Van Gogh biography is left for the planned Artist Story.

**A+:** Seurat (principal); Cézanne, Van Gogh and Gauguin as extras. Each answers a different problem in the lesson.

## Course 62: Ren Yi (Ren Bonian), *Zhong Kui*, dated 1883 (Met 2002.208.2)

**Sources:** Met object pages (2002.208.2, 1986.267.48); Cleveland Museum of Art 1959.185 (festival use); MIT Visualizing Cultures essay by Nedostup; the *Dianshizhai* preface (1884), transcribed by hand from the scan; the 1889 Dianshizhai advertisement.

**Images:** Met CC0; Commons PD scans (watermarked); the 1889 advertisement.

**Uncertainty shown in the lesson:**
- The preface gives eight pictures per issue; Nedostup gives nine.
- No price or sales data were verified. Wue's 2009 article is listed but was not read.
- The inscription on the scroll was not transcribed.

**A+:** Ren Yi only. The *Dianshizhai Pictorial* was declined as a card: a periodical copy rather than one held object, and the scan is watermarked.

## Course 63: Church, *Heart of the Andes* (Met 09.95)

**Sources:** Met object page and Heilbrunn essay on Church; Smarthistory (Ortega) on Velasco; INBA bulletin 1012; RIEB 2025 abstract on Américo.

**Images:** Met CC0 for Church; Google Art Project PD-Art for Velasco (MUNAL) and Américo (Museu Paulista).

**Stated as general history, not sourced in the lesson:**
- the date of Brazilian independence (7 Sept 1822);
- the abolition of slavery in Brazil in May 1888;
- the presence of enslaved people in Brazil in 1822.

**Uncertainty shown in the lesson:**
- No exchange between Church and Velasco is inferred from visual similarity.
- The commission of *Independência ou Morte!* was not documented.

**A+:** Church (principal); Velasco and Américo as extras, from two different regions.

## Font subsets

- `public/fonts/noto-serif-sc-300-600.woff2` and `noto-sans-sc-300-500.woff2` were regenerated with `scripts/fonts/make_fonts.py`.
- Sources: google/fonts `main`, Noto Serif SC 2.003 and Noto Sans SC 2.004, the same versions as the README.
- They now cover 1,615 Han characters; before, 179 characters from the A+ card titles and Stage 06 were missing.
- The Bodoni subsets were not replaced.
