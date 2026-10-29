# Phase 4.18 — Stage 07 completion (courses 69–73): sources and image rights

Checked 2026-10-27 to 2026-10-29. Museum data comes from object pages read in the built-in browser and from open-access APIs:
- the Met collection API, using `/v1/objects/{id}` and `isPublicDomain` re-read at download time;
- Cleveland's `openaccess-api.clevelandart.org`.

Wikimedia Commons licence data comes from the Commons API (`imageinfo` + `extmetadata`, plus the page wikitext where the template mattered). Each file was downloaded from its original upload URL.

How the files were processed:
- Every image was resized and recompressed; the exact change is recorded in the record's `credit.changes`.
- The only crop is the Lakshmi colour bar.
- The 1929 美展 page was rendered from the PDF (PyMuPDF, page 1).
- Nothing was recoloured or annotated in the file itself. Marks, rings and boxes are drawn by the page.

CC BY-SA images are offered under the same licence, and the record says so.

Rights terms used below:
- **"PD-Art"** means Commons marks the file public domain as a faithful photographic reproduction of a two-dimensional work whose author died long ago.
- **"Early publication"** means printed matter published before 1931 (public domain in the US), whose authors or corporate publishers are long out of term in the source country.

Operating rule for public-domain images that carry no explicit licence (applied as in Phases 4.16–4.17). All three must hold:
- the author died 70 or more years ago and the work is public domain in the source country;
- there is no positive evidence of a running US term (URAA restoration requires protection in the source country on 1 Jan 1996);
- the file is a faithful reproduction or carries an open licence.

Rejected sources:
- The Met's Chen Hengke, Wu Changshuo (Ellsworth gift) and *God* photograph files now report `isPublicDomain: false`, so they were **not** used.
- Chen Shizeng, Xu Beihong (other than 《远闻》, which is shown through its 1930 publication), Lin Fengmian, Pan Tianshou, Rivera, Siqueiros, Sher-Gil, Nandalal Bose and Rabindranath Tagore appear as **text plus official links only**. Their US or source-country status was not clean, or no open image was available.
- Mexico's freedom of panorama was not treated as a global permission.

## Course 69 — 民国艺术家为什么争论中国画的未来？ (`republican-china-painting-debate.mdx`)

Card `art-xu-beihong-yuanwen-001`. This replaced `art-chen-shizeng-album-001`; that record was unreleased and has been deleted, and its ID was not reused.

| Role | Work | Reference | File | Image rights |
|---|---|---|---|---|
| Principal, card, find game, marks | Xu Beihong 徐悲鸿, 《远闻》 *La Nouvelle Lointaine*, 1927 (Paris), oil, as reproduced in 《良友》 | 《良友》 *The Young Companion* no. 46 (Shanghai, April 1930), p. 19, full-page colour plate headed "徐悲鸿的作品". Internet Archive `liangyou-1930.04`. Current holder and size of the original: **not found**. | `xu-beihong-yuanwen.jpg` (1800 × 1488), cropped from the scan's native page image (2878 × 4278) at x 494–2558, y 1142–2848 to the plate edge | PD in the US (published 1930) and in China (Xu died 1953) |
| Publication context | 《良友》 no. 46, p. 19, whole page | same scan | `liangyou-1930-no46-p19.jpg` (1345 × 2000), whole page, not cropped | PD in the US (published 1930); PD in China |
| Primary document | 《美展》 no. 5, 22 Apr 1929, p. 1 (Xu Beihong's open letter) | National Library of China scan (NLC404-01JF2917-891), via Commons PDF | `meizhan-1929-no5.jpg` | Early publication (1929); unchanged |
| Text and link only | Chen Shizeng, *山水图册* and *紫藤图轴* (Palace Museum 新00086554, 新00081491); Xu Beihong, *Grazing Horse*; Lin Fengmian; Pan Tianshou | dpm.org.cn 231898 and 231123; Met 49637, 36367, 42039 | none | Not reproduced |

### Replacement decision, 2026-10-29 (Product Owner authorisation)

**Why the Chen Shizeng images were removed.** A targeted check that day could not establish a US basis for the two Palace Museum images (`chen-shizeng-album.jpg`, `chen-shizeng-wisteria.jpg`).
- **Missing evidence.** No pre-1978 publication of either work was documented. Under 17 U.S.C. §303(a), an authorised first publication between 1978 and 2002 would carry protection to 2047. A museum catalogue in that window is plausible, and the museum may own the common-law copyright (the *Pushman* doctrine).
- **Insufficient grounds.** The Commons tags are death-based only. A faithful reproduction says nothing about the painting itself.
- **No alternatives.** No licensed alternative image of any Chen work exists in the sources checked. The Met's 12 Chen Hengke works report `isPublicDomain: false`, and Cleveland and Commons have no other source.
- **What was deleted.** Both files and their homepage copies (`public/img/table/chen-shizeng-album.jpg`, `s-chen-shizeng-album.jpg`) were deleted. They were untracked and used by nothing else. Chen remains in the lesson as text, with the museum's own descriptions quoted and linked.

**Search (one bounded pass).**
1. **The 1929 exhibition's own publication.** All ten issues of 《美展》 (NLC scans on Commons) were rendered and their plates surveyed. The plates are small, faded newspaper halftones, at most about 1,100 px tall; the no. 8 cover, for example, can barely be read. This is unsuitable for a principal card and close analysis.
   - The exhibition's collotype catalogue, 《美展特刊》, was not found in an open scan. HathiTrust sits behind a Cloudflare challenge, which was not bypassed.
2. **The rights logic narrowed the field.**
   - **Artists who died after 1945.** Their work was still protected in China on 1 Jan 1996, so URAA restored US terms of 95 years from publication. Only works first published **by 1930** are clear today.
   - **Artists who died by 1945.** Any documented publication before 1978 suffices.
3. **Candidates considered and rejected:**
   - **《美展》 plates.** Image quality too poor.
   - **Gao Qifeng 高奇峰 (died 1933), *The Roar of the Night* (1916, Hong Kong Museum of Art 1973.0925; good GAP image).** The earliest documented catalogue is 1981, which falls in the same §303 gap. His 《良友》 1927 and 1931 pages on Commons are portraits.
   - **Xu Beihong, 《田横五百士》 (1928–30).** No publication by 1930 was found, and the Commons file (1500 px) comes from an anonymous forum.
   - **Xu Beihong, 1925 portrait of Jiang Biwei.** The Commons file is 350 px and sourced from a blog.
   - **Li Yishi 李毅士, 《长恨歌画意》 (book, 1932).** No scan was found.
   - The 《良友》 OCR for 1926–1931 (64 issues) is too garbled for an exhaustive search.
4. **Selected: 《远闻》 in 《良友》 no. 46 (April 1930).**
   - **Clearest legal basis.** The plate itself is the publication.
   - **Strongest fit with the narrative.** Xu is the realism protagonist of the 1929 debate, and this is his own Paris oil.
   - **A period reading on the page.** The caption gives the 1930 interpretation and an evaluative vocabulary ("纯熟沉着之笔，雅俗共赏之色调").
   - **Good material for teaching.** It is a clear colour plate with legible gesture, light and costume.

**Evidence for the work** (read directly on the scan):
- **Plate.** Page 19 is headed "徐悲鸿的作品". Under the plate: "La Nouvelle Lointaine. By Peon Tzue" and "远闻 徐悲鸿作".
- **Caption, transcribed from a native-resolution crop:** 「遠聞」一畫爲徐氏一九二七年留居巴黎時所作。圖中徐夫人展讀遠方友人來信，背景爲歐婦閱報。當年正值中國北伐大戰，華僑思念祖國最切之時。徐氏運用其純熟沉着之筆，雅俗共賞之色調，寫出遠邦寄旅者之心情。
- **Same issue, p. 12.** 《悲鸿自述》, Xu's own autobiographical essay, in the series "现代成功人自述 其二", with "本文作者徐悲鸿先生近影".
- **Not found.** No scholarship on the present location, size or support of the original turned up in two web searches. The record states this ("现藏地未查明", "原作尺寸未查明"). The medium is given as oil, judged from the plate.

**US analysis.**
- **Publication.** The work was published in April 1930 by its inclusion in a mass-circulation magazine. Authorisation is strongly indicated: the same issue carries the artist's own essay and photograph, so the feature was made with his participation.
- **Term.** As a 1930 foreign publication, any US term, whether under the 1909 Act or URAA-restored, ran 95 years and ended on 31 Dec 2025. The work is PD in the US now.
- **Other jurisdictions.**
  - China: life+50, so PD from 2004.
  - Life+70 jurisdictions such as the EU: PD from 2024.
- **The magazine page.** 《良友》's own contribution (layout, caption, 1930) is PD as a 1930 publication. The scan adds no new copyright, as it is a faithful reproduction under *Bridgeman*.

**Reproduction source.**
- **Scan.** Internet Archive item `liangyou-1930.04`, the issue PDF, page index 19 (printed p. 19). The native JPEG was extracted with PyMuPDF.
- **Changes.**
  - Principal image: cropped to the printed plate edge only, then resized to 1800 px wide.
  - Page image: the whole page, resized to 2000 px tall.
  - No colour change was made to either.

**Permitted uses.** Display, annotation (find boxes and marks are drawn by the page, not burned in), resizing or cropping, and A+ card use are all unrestricted for a public-domain work. The record credits 《良友》 no. 46 and the Internet Archive scan, and its `originalStatus` explains that the image is a 1930 colour print, not a photograph of the original.

**Remaining limitation (disclosed, not a rights risk).** The lesson's visual analysis rests on a 1930 colour reproduction; the colours and details may differ from the original, and the lesson says so in a Callout. The location of the original is unknown.

**Lesson changes (scope kept).**
- **Kept unchanged:** the title, central question and sections (1917–1919, Chen Shizeng, Xu Beihong, 1929 美展, Lin Fengmian, Pan Tianshou, institutions).
- **Opening.** It now looks at 《远闻》:
  - a find game (newspaper / letter / wristwatch), placed before any reveal;
  - five marks (shadowed profile, light, frog buttons, raised hand, chair-back);
  - a new section on the 1930 magazine page and its caption.
- **Chen section.** Text only, with the Palace Museum descriptions quoted, an explicit contrast with 《远闻》, and links.
- **InferenceChain.**
  - New claim on the caption's homesickness reading (verdict plausible).
  - The Chen claim is now record-based.
  - The Xu claim gains a "see" step on 《远闻》.
- **Timeline and closing.**
  - EraLine adds 1927 and April 1930.
  - The reflection adds one point on the pictorial press setting standards and swaps one question.
  - Sources add 《良友》 no. 46.

Other claims and their status:
- **Verified in the primary source.** The 1929 quotation ("……无塞尚、马蒂斯、薄奈尔等无聊之作……") was read on the rendered page. The sequence of replies is also documented: Xu Zhimo in no. 5, Li Yishi in no. 8, Xu's rejoinder in no. 9.
- **Common quotations.** These are labelled as widely cited and were not re-read in first editions: Kang Youwei (1917), Chen Duxiu (1919, "革王画的命") and Xu Beihong (1918).

## Course 70 — 日本与朝鲜半岛如何面对艺术现代化？ (`japan-korea-art-modernization.mdx`)

Card `art-kuroda-lakeside-001`, plus extra card `art-an-jungsik-baegak-001`.

| Role | Work | Reference | File | Image rights |
|---|---|---|---|---|
| Principal, card | Kuroda Seiki 黑田清辉, *Lakeside* 湖畔, 1897 | Tokyo National Museum (Kuroda Memorial Hall); oil on canvas, 69 × 84.7 cm; Important Cultural Property | `kuroda-lakeside.jpg` | PD-Art (ColBase / e-Kokuho image via Commons). Kuroda died in 1924. |
| Comparison | Hishida Shunsō, *Black Cat*, 1910 | Eisei Bunko | `hishida-black-cat.jpg` | PD-Art. Hishida died in 1911. |
| Comparison | Kishida Ryūsei, *Road Cut Through a Hill*, 1915 | MOMAT (Important Cultural Property) | `kishida-road-cut.jpg` | PD-Art. Kishida died in 1929. |
| Extra card | An Jung-sik 安中植, *Spring Dawn at Mount Baegak* (summer version), 1915 | National Museum of Korea; ink and colour on silk, 125.9 × 51.4 cm | `an-jungsik-baegak.jpg` | **CC BY 4.0.** NMK image published through 공유마당 (Korea Copyright Commission). An died in 1919. |

The extra card is justified because it is the only Korean work in the lesson and the object of its own find game, NMK reading and InferenceChain. It is not a duplicate of Courses 50 or 51.

Text only: Na Hye-seok (LTI Korea biography) and the 1922 Senten exhibition.

## Course 71 — 墨西哥壁画为什么具有公共力量？ (`mexican-murals-public-power.mdx`)

Card `art-orozco-cabanas-001`.

| Role | Work | Reference | File | Image rights |
|---|---|---|---|---|
| Principal, card | José Clemente Orozco, *Man of Fire* (dome) | Hospicio Cabañas, Guadalajara, 1936–39; UNESCO World Heritage (1997) | `orozco-man-of-fire.jpg` | Photo by P. Hughes (Indies1), **CC BY-SA 4.0**. The mural is PD in Mexico (Orozco died in 1949; protection ended in 2020 after the pre-1952 regime and life+70 ran out) and in the US (PD in Mexico on 1 Jan 1996, so not URAA-restored). |
| Context | The Capilla Clementina interior with murals | same | `orozco-cabanas-chapel.jpg` | Photo by MowgliLand, **CC BY-SA 4.0**. Fisheye lens; the caption notes the distortion. |
| Text and link only | Rivera, Detroit Industry; Orozco, Dartmouth (NPS); Siqueiros, *América Tropical* (Getty) | — | none | Not reproduced |

The duplicate dome photo `orozco-cabanas-wall.jpg` was deleted before integration.

## Course 72 — 南亚艺术家怎样回应殖民时期的美术制度？ (`south-asia-art-schools-response.mdx`)

Card `art-abanindranath-bharat-mata-001`.

| Role | Work | Reference | File | Image rights |
|---|---|---|---|---|
| Principal, card | Abanindranath Tagore, *Bharat Mata*, 1905 | Victoria Memorial Hall, Kolkata (holding per secondary sources); watercolour (wash) on paper, 26.7 × 15.2 cm | `abanindranath-bharat-mata.jpg` | PD-Art via Commons (kamat.com reproduction). Abanindranath died in 1951; the work is PD in India (life+60, from 2012) and in the US (published 1906, before 1931). |
| Comparison | Raja Ravi Varma, *Shakuntala*, 1898 | Ganesh Shivaswamy Foundation (Google Arts & Culture) | `ravi-varma-shakuntala.jpg` | PD-Art. Ravi Varma died in 1906. |
| Text and link only | Nandalal Bose (Haripura, NGMA); Amrita Sher-Gil (NGMA); Rabindranath Tagore (Met 891377) | — | none | Not reproduced |

Claims and their status:
- **Verified in the primary source.** The Havell quotations come from E. B. Havell, *Indian Sculpture and Painting* (1908), pp. 17, 251–252 and 256–257.
- **Rests on secondary sources.** These are hedged in the text: the 1906 *Prabasi* publication of *Bharat Mata*, the change of title and Nivedita's reading.

## Course 73 — 摄影与美术学校如何改变殖民时期的视觉文化？ (`colonial-photography-archives.mdx`)

Card `art-deen-dayal-viceregal-001`.

| Role | Work | Reference | File | Image rights |
|---|---|---|---|---|
| Principal, card | Raja Deen Dayal, *Shimla 17th May 1887: Viceregal party* | Cleveland Museum of Art 2023.121.26.1; albumen print, image 19.5 × 27 cm. Provenance: British private collection; Prahlad Bubbar, London; CMA. | `deen-dayal-viceregal-1887.jpg` | **CC0** (CMA Open Access) |
| Agency | Album page, *The Royal Visit to Hyderabad (Deccan) January 1889* ("Fateh Maidan Sports—'Royal Party.'") | Met 2021.381.4 (objectID 853594) | `deen-dayal-hyderabad-album.jpg` | **CC0** (Met OA) |
| Agency | Lala Deen Dayal, *The Great Elephant Saluting*, 1885–1900 | Met 2011.599.1a (633310) | `deen-dayal-elephant.jpg` | **CC0** (Met OA) |
| Archive and classification | *The People of India*, vol. 1, plate 17 (1868) | State Library of New South Wales copy, via Commons | `people-of-india-plate17.jpg` | Early publication (1868) |
| Art-school system | *The Journal of Indian Art*, vol. 1 (W. Griggs, 1886), Draft Scheme | Internet Archive scan | `journal-indian-art-1886-scheme.jpg` | Early publication (1886) |
| Images travel | *Lakshmi*, Ravi Varma Fine Art Lithographic Press, 1894 | Met 2013.10 (78264); chromolithograph | `lakshmi-chromolithograph-1894.jpg` (**cropped**: the grey-scale strip and black backing were removed) | **CC0** (Met OA) |
| Comparison | O. Kurkdjian studio, *Festivities in Surabaya*, c. 1900, stereograph | Leiden University Libraries, KITLV 180505, via Commons | `kurkdjian-surabaya.jpg` | PD. Kurkdjian died in 1903. |

Claims and their status:
- **Verified in the primary source.** These were read directly:
  - the Cleveland caption list of fifteen sitters and its album note (c. 105 photographs, 1885 to summer 1887, a probable commission by a British civil servant, disassembled);
  - the Met's colonial-photography text ("colonial gaze", Deen Dayal's "insider's view");
  - the plate 17 label ("COLE NATIONAL DANCE. CHOTA NAGPOOR. (17)") and SLNSW's current title ("Ceremonial dance of the Kurukh community, Chota Nagpur");
  - the *Journal of Indian Art* preface and Draft Scheme clause 5;
  - the Met's Lakshmi note (the press's first year, popularity into the 1920s, based on an oil painting);
  - the Smithsonian NMAA Archives FSA.A2017.08 biography of Kurkdjian.
- **Common facts.** These are labelled as such: Shimla as the summer capital, and Deen Dayal's dates and title.
- **Ethical framing.** The plate is shown in order to discuss the classification itself. The lesson does not reproduce the derogatory ethnographic letterpress, and it states that consent to being photographed is unrecorded.
- **Kept apart from other courses.** Course 73 does not use Cephas or Borobudur (Course 22) and does not retell the Bengal School or Santiniketan (Course 72).

## Glossary added (15)

`gl-literati-painting`, `gl-guohua`, `gl-life-drawing`, `gl-nihonga`, `gl-yoga`, `gl-bunten`, `gl-morotai`, `gl-muralism`, `gl-commission`, `gl-wash-technique`, `gl-bengal-school`, `gl-swadeshi`, `gl-albumen-print`, `gl-chromolithograph`, `gl-stereograph`.

Reused: `gl-four-wangs`, `gl-fresco`, `gl-oil-on-canvas`, `gl-negative`.
