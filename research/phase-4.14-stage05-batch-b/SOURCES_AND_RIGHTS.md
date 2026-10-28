# Phase 4.14 — Stage 05 Batch B (Courses 38, 39, 40, 47, 48, 49): sources, image rights and selection

Checked 2026-10-28. Museum data from the institutions' own records and open-access services:

- **National Palace Museum, Taipei (NPM):** open-data detail pages (`digitalarchive.npm.gov.tw/opendata/Pub/Detail/{cid}`)
  and the museum's explanatory texts as published in the 數位典藏與學習聯合目錄. Images from the NPM IIIF service,
  CC BY 4.0.
- **The Met:** collection API (`v1/objects/{id}`; search through `v1.1/search`, since `v1/search` was retired on
  2026-10-01). Object pages, Heilbrunn essays and one educational page were read in the built-in browser. The Catalogue
  Entry tab (David) was opened with a real click.
- **Rijksmuseum:** linked-data search (`data.rijksmuseum.nl/search/collection?objectNumber=…`) and records
  (`id.rijksmuseum.nl/…`), which carry the descriptions, dimensions, provenance and the image licence. Images from the
  IIIF service (`iiif.micr.io/{id}/full/{w},/0/default.jpg`); object pages were read in the browser.
- **Dutch Cultural Heritage Agency:** maritime site database (MaSS), read with WebFetch.
- **Nagoya Railroad (Meitetsu):** the Urakuen / Jo-an guide page, read with WebFetch.
- **Primary Chinese texts:** zh.wikisource — 《清史稿》卷504、石涛《畫語錄》、董其昌《畫禪室隨筆》、倪瓒《清閟閣集》卷12.
- **Commons:** licence data from the Commons API and the raw file descriptions.

Every image was resized to at most 1600 px on its long side and recompressed. Where stated, it was cropped. The SVG plan
of Jo-an was rasterised onto white. Nothing was recoloured, sharpened or annotated in the file.

**Not reached or not consulted:**

- the Rijksmuseum Bulletin article on the Witte Leeuw (the PDF exceeded the fetch limit);
- the 1982 catalogue of the wreck's ceramics;
- the MLIT tourism PDF on Jo-an (binary, unreadable);
- Bunka Isan Online's Jo-an entry (not found by search).

All books listed under 延伸阅读 in the lessons were **not** consulted, and the lessons say so.

## Repeats checked

Before selection, `public/img`, the lesson MDX and the artwork records were searched for every candidate. None of the
works below is featured in another lesson. Two works are referenced only in text, by course number, and not
reproduced:

- Fan Kuan's *Travelers* (Course 1), cited in Course 39;
- the Course 28 Jian bowl and Yuan jar, which Course 40 deliberately avoids.

Course 50 (`ukiyo-e-city-prints.mdx`, card No.050) was not edited.

## How the works were chosen

### Course 38 — 明代文人为什么反复临摹古画？

- **What the question needed:** a documented chain of copying, with the model, the copy and a later copy all
  surviving.
- **Card (No.038):** Shen Zhou, *Lofty Mount Lu*, 1467 (NPM 故画000884).
- **Why this work:**
  - NPM texts state both its debt to Wang Meng and Wen Jia's later copy.
  - The inscriptions give the occasion: a birthday gift to a teacher.
- **Comparisons:**
  - Wang Meng, 《東山草堂圖》, 1343 (Shen Zhou seal);
  - Wen Jia, 《仿沈周廬山詩畫》, 1577;
  - 《春華晝錦》 (an NPM-doubted attribution).
- **Alternatives considered:** Wen Zhengming's copies after Zhao Mengfu, and Dong Qichang's 仿古 albums. Neither has a
  model and copy surviving in one open collection with museum texts as explicit.

### Course 39 — 清代画家怎样重新理解传统？

- **What the question needed:** a work in which court, orthodoxy and the uses of tradition meet. It also needed
  comparisons that complicate the "orthodox vs individualist" divide.
- **Card (No.039):** Wang Hui and assistants, *Kangxi Southern Inspection Tour*, Scroll Three (Met 1979.5).
- **Why this work:**
  - The Met documents collective production, the use of maps and prints, invented scenery, the blue-green palette and
    the missing snow.
  - 《清史稿》 independently records the workshop.
- **Comparisons (all Met):**
  - Wang Hui's 1674 album leaf;
  - Wang Yuanqi, 1705;
  - Shitao, *Drunk in Autumn Woods*;
  - Bada Shanren, *Fish and Rocks* (kept brief, for a future Artist Story).
- **Alternatives considered:** NPM Wang Hui handscrolls, for institution diversity after Course 38. The Palace Museum
  Beijing scrolls were also considered but have no open licence.

### Course 40 — 为什么中国瓷器会影响遥远的世界？

- **What the question needed:** concrete trade evidence, plus objects that show other societies ordering, adapting and
  imitating.
- **Card (No.040):** a kraak plate from the *Witte Leeuw* wreck, 1613 (Rijksmuseum NG-1978-127-4010-W).
- **Why this work:** it is archaeologically dated by the wreck, with the cargo context (pepper) recorded by the museum.
- **Comparisons:**
  - wine cup fused to iron (Rijks NG-1977-118-W);
  - elephant kendi (Rijks NG-1977-172-W) against the Persian elephant kendi (Met 68.180);
  - jug with the Portuguese arms (Met 61.196);
  - Ming cup in London mounts (Met 68.141.125);
  - Iznik footed dish (Met 66.4.2);
  - Arita plate with the VOC monogram (Met 2002.447.40).
- **Alternatives considered:**
  - a Delft imitation (no Met or Rijks record with an explanatory text was reached in time);
  - the Rijksmuseum Arita kraak dish AK-RBK-1972-220 (downloaded, not used: the Met VOC plate has the better text);
  - an armorial service.
- **No map:** no source with route data was consulted, so the lesson uses an EraLine.

### Course 47 — 荷兰画家为什么热衷描绘日常生活？

- **What the question needed:** a genre painting with documented sale history, set against one with a written
  moral, so that moralising readings can be tested.
- **Card (No.047):** Vermeer, *The Milkmaid*, c. 1660 (Rijksmuseum SK-A-2344).
- **Why this work:**
  - The Rijksmuseum provenance lists the 1696, 1701, 1765, 1798 and 1813 sales with prices.
  - Its text gives no symbolic reading.
- **Comparisons:**
  - Jan Steen, *The Merry Family*, 1668 (SK-C-229), whose note states the moral;
  - Pieter de Hooch, *Interior with Women beside a Linen Cupboard*, 1663 (SK-C-1191).
- **Alternatives considered:**
  - Steen, *Prince's Day* (SK-A-384), downloaded but too dark to read at screen size;
  - the Met's *Maid Asleep* (used only as cited text).
- **Distinct from earlier courses:** 42 (Netherlandish religious and commercial detail), 45 (light and drama) and
  46 (court and Church).

### Course 48 — 为什么18世纪艺术在优雅与庄严之间变化？

- **What the question needed:** dated works showing Rococo and the antique taste in the same years, and a documented
  case of one replacing the other in a single commission.
- **Card (No.048):** David, *The Death of Socrates*, 1787 (Met 31.45).
- **Why this work:**
  - The Met catalogue entry (Baetjer 2017) documents the sources, Plato's absence and the Trudaine circle.
  - It bridges to Stage 06 without writing Course 57.
- **Comparisons (all Met):**
  - Fragonard, *The Stolen Kiss*, c. 1760;
  - Vien, *Suite de vases dans le goût de l'antique*, 1760;
  - Greuze, *Broken Eggs*, 1756.
- **Alternatives considered:**
  - Chardin, *Soap Bubbles*;
  - Boucher;
  - Diderot's *Salons*, not used because no edition was consulted.
- **Not reused:** David's *Lavoisiers* is already in Course 13 (`portraits-and-identity.mdx`).

### Course 49 — 日本茶室、庭园和屏风有什么审美联系？

- **What the question needed:** a real tea room with documented design decisions and history, set beside utensils and
  a screen, without a timeless *wabi-sabi* claim.
- **Card (No.049):** Jo-an (如庵), Oda Urakusai's tea room, now at Urakuen, Inuyama.
- **Why this work:**
  - The Meitetsu guide documents its individual features: the diagonal wall, *koyomi-bari*, the Uraku window and the
    *nijiriguchi*.
  - It also documents the 1972 relocation with a garden reconstructed "as far as possible".
- **Comparisons:**
  - Black Raku bowl "Kaedegure" (Met 2024.553.19);
  - Kenzan-style water jar (Met 29.100.614);
  - Ogata Kōrin, *Rough Waves* (Met 26.117);
  - Urakuen garden photographs.
- **Alternatives considered:** Taian at Myōkian (no free photographs found), and Ryōan-ji (a Zen garden, not a tea
  garden).
- **Distinct from earlier courses:** 34 (narrative handscroll) and 50 (commercial prints).

## Sources and uncertainties by course

### Course 38 (`ming-literati-copying.mdx`)

- **NPM records:**
  - 3593 (沈周《廬山高》): the full inscription, Qianlong's 1755 poem, the seals and the 石渠寶笈續編 record;
  - 678 (王蒙《東山草堂圖》, 1343): the seals include 白石翁;
  - 5874 (文嘉, 1577): Wen Jia's inscription and the transcribed poem;
  - 3594 (《春華晝錦》): "疑為後人偽託之作".
- **NPM explanatory texts** via catalog.digitalarchives.tw, including the Chen Chun 《崑璧圖》 note.
- **Dong Qichang:** 《畫禪室隨筆》 and the addendum in 《清閟閣集》卷12, both on zh.wikisource (四庫本).
- **Uncertainties stated in the lesson:**
  - whether Shen Zhou studied this particular Wang Meng (a seal alone is not proof);
  - why Wen Jia's transcription differs, with the differences listed but not explained;
  - whether Shen Zhou saw Mount Lu.

### Course 39 (`qing-reinvention-of-tradition.mdx`)

- **Met records:**
  - 49156 (scroll);
  - 41481 (Wang Hui album: 1674, 1677, 1714 colophon);
  - 41487 (Wang Yuanqi, 1705; 佩文齋書畫譜);
  - 49178 and 49179 (Shitao);
  - 41491 (Bada).
- **Met essays:** Hearn, "Wang Hui" (2008) and "The Qing Dynasty: Painting" (2003).
- **《清史稿》卷504:** quotations as printed, including 王原祁 "中年後，供奉內廷，乞畫者多出代筆，而自署名".
- **Shitao, 《畫語錄》**, and the Britannica entry "Shitao".
- **Uncertainties:**
  - The opening text of the scroll is the lesson's own transcription from the Met image and is flagged as possibly
    imperfect.
  - The figure under the parasol is identified by inference, since it is not labelled.
  - 《清史稿》 was compiled two centuries after the events.
  - Ghost painting in the Met's 1705 Wang Yuanqi is not assessed.
  - The Met's reading of Bada as protest is presented as the museum's interpretation.
  - An earlier draft claim (Shitao's Beijing years and salt-merchant buyers) was removed as unsourced.

### Course 40 (`porcelain-global-exchange.mdx`)

- **Rijksmuseum records:** NG-1978-127-4010-W, NG-1977-118-W, NG-1977-63-W and NG-1977-172-W.
- **MaSS, Witte Leeuw:** loss on 13 June 1613 after a fight with Portuguese carracks near Saint Helena, at about 36 m.
- **Met essays and pages:**
  - Munger and Frelinghuysen, "East and West: Chinese Export Porcelain" (2003);
  - Willmann, "Edo-Period Japanese Porcelain" (2011);
  - Met records 61.196, 68.141.125, 66.4.2 and 2002.447.40;
  - the Met Islamic-art educational page on kendi 68.180.
- **Uncertainties:**
  - The discovery year is 1976 according to the Rijksmuseum and 1977 according to MaSS; both are stated.
  - The intended market of the kendi is unknown.
  - The Iznik foot is "appears to be" an Ottoman invention in the Met's own wording.
  - How the kinrande cup reached London is unknown.
  - The EraLine date for the Jingdezhen decline is schematic.

### Course 47 (`dutch-genre-painting.mdx`)

- **Rijksmuseum records:** SK-A-2344 (description and full provenance), SK-C-229 and SK-C-1191.
- **Met essays and pages:**
  - Meagher, "Genre Painting in Northern Europe" (2008);
  - Liedtke, "Johannes Vermeer" (2003);
  - the Met *In Praise of Painting* primer (the 1566 iconoclasm estimate and the loss of church and court commissions).
- **Uncertainties:**
  - Van Ruijven as the first owner (the provenance marks it with "?");
  - the "90 %" figure is the Met's estimate;
  - the relative weight of the causes of Dutch genre painting is not established;
  - no symbolic reading is assigned to the Milkmaid's foot warmer or tiles.

### Course 48 (`rococo-to-neoclassicism.mdx`)

- **Met records:** 436105 (David, including the catalogue entry and audio), 436325 (Fragonard), 358396 (Vien and
  Reboul) and 436579 (Greuze).
- **Met essays:** "Jean Honoré Fragonard", "Jean-Baptiste Greuze" and "Neoclassicism".
- **Uncertainties:**
  - which Trudaine brother commissioned the painting;
  - the reason for and exact year of Madame du Barry's rejection (given as the early 1770s);
  - the identification of Plato;
  - David's intentions (the claim that it was "for the Revolution" is marked unknowable).
- *The Stolen Kiss* is discussed critically, using the Met's own word "forcibly".

### Course 49 (`tea-room-garden-screen.mdx`)

- **Meitetsu Urakuen guide:** founder, 二畳半台目, 筋違いの囲, 暦張り, 有楽窓, 躙口, national treasure 1936,
  relocation in 1972 with the garden reconstructed, the 水琴窟, and the 旧正伝院書院 of 元和4年.
- **Met essay:** Willmann, "The Japanese Tea Ceremony" (2011).
- **Met records:** 827671, 62898, 52514 and 44918.
- **On-site sign** (photographed): the *suikinkutsu* and handwashing.
- **Uncertainties:**
  - Jo-an's exact construction year is not given by the source;
  - which garden elements are original;
  - who named the bowl "Kaedegure", and when;
  - whether Kōrin's screen was used at tea gatherings;
  - the source of the *suikinkutsu*'s date.
- The link between screens and tea is presented as the lesson's interpretation.

## Image rights

| Files | Source | Licence | Changes |
|---|---|---|---|
| `shen-zhou-lushan*.jpg`, `wang-meng-dongshan*.jpg`, `wen-jia-lushan*.jpg`, `shen-zhou-spring-brocade.jpg` | NPM open data (cids 3593, 678, 5874, 3594) | CC BY 4.0, credited "國立故宮博物院" | resized and cropped from IIIF |
| `kangxi-tour-*.jpg`, `wang-hui-after-masters.jpg`, `wang-yuanqi-1705.jpg`, `shitao-drunk-autumn.jpg`, `bada-fish-rocks.jpg` | Met Open Access | CC0 | resized; scroll segments cropped |
| `witte-leeuw-plate.jpg`, `witte-leeuw-cup-iron.jpg`, `witte-leeuw-kendi.jpg` | Rijksmuseum | Public Domain Mark 1.0 | resized |
| `persian-elephant-kendi.jpg`, `jug-portuguese-arms.jpg`, `kinrande-cup-mounts.jpg`, `iznik-footed-dish.jpg`, `arita-voc-plate.jpg` | Met Open Access | CC0 | resized |
| `vermeer-milkmaid*.jpg`, `steen-merry-family*.jpg`, `de-hooch-linen-cupboard.jpg` | Rijksmuseum | Public Domain Mark 1.0 | resized; two Vermeer crops and one Steen crop |
| `david-death-of-socrates.jpg`, `fragonard-stolen-kiss.jpg`, `greuze-broken-eggs.jpg`, `vien-vases-title.jpg`, `vien-vase-caryatids.jpg` | Met Open Access | CC0 | resized |
| `joan-teahouse.jpg` | Commons, Suikotei | CC BY-SA 4.0 | resized |
| `joan-front.jpg` | Commons, Tomio344456 | CC BY-SA 4.0 | recompressed |
| `joan-plan.jpg` | Commons, Phoenix7777 (`Jo-an.svg`) | CC BY-SA 4.0 | rasterised on white, resized; shared under the same licence |
| `urakuen-path.jpg`, `urakuen-tsukubai.jpg`, `urakuen-suikinkutsu.jpg` | Commons, Hyppolyte de Saint-Rambert | CC BY 4.0 | resized |
| `raku-kaedegure.jpg`, `kenzan-pine-jar.jpg`, `korin-rough-waves.jpg` | Met Open Access | CC0 | resized |

Each image's credit, licence URL, source URL and changes are also recorded in the artwork JSON.

## Components

No new component was added. Every interaction uses existing components:

- FindOnImage;
- FeatureCompare;
- SortGame (three items each);
- EraLine;
- InferenceChain;
- ObservationQuiz.

In each lesson the find game comes before any text that names its answers.
