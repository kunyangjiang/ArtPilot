# Phase 4.11 — Stage 04 Batch A: sources, image rights and why each work was chosen

Checked 2026-10-27. National Palace Museum (NPM, Taipei) data from its Open Data object pages
(`digitalarchive.npm.gov.tw/opendata/Pub/Detail/{id}?dep=P&mode=full`: dimensions, inscriptions, seals, colophons,
curatorial texts, bibliography) and its IIIF manifests (`/Integrate/GetJson?cid={id}&dept=P`, licence field
`https://data.gov.tw/license`). NPM images were taken **only through the public IIIF image service**
(`iiifod.npm.gov.tw/iiif/2/...`); the CAPTCHA-gated download buttons were not used or bypassed. Cleveland data and
images from its open-access API (`openaccess-api.clevelandart.org/api/artworks/{id}`). Wikimedia Commons licence data
from the Commons API (`imageinfo` + `extmetadata`, raw wikitext for the Lamentation's dimensions); files downloaded with
`Special:FilePath?width=2400`. UNESCO 1623 read in the built-in browser. Chinese primary texts from zh.wikisource
(MediaWiki API). NPM's TLS certificate lacks a Subject Key Identifier, so Python's strict X.509 flag was relaxed for
those requests only; chain and hostname verification stayed on.

Every image was resized to at most 1600 px on its long side (two scroll strips excepted, see Course 29) and recompressed
at q82, keeping any embedded colour profile. Crops are listed below and in each record's `changes`. Nothing was
brightened, recoloured, sharpened or annotated in the file itself.

**NPM licence and attribution.** The object pages state: “中階圖像與文字均無須申請、不限用途、不用付費即可公開使用，請於適當位置呈現姓名標示”
(CC BY 4.0), with the attribution form “<品名>。國立故宮博物院，台北，CC BY 4.0 @ www.npm.gov.tw”. Every NPM image on the site
carries “国立故宫博物院（台北）· CC BY 4.0” beside its caption, and the record's rights block gives the museum's own form.

## How the works were chosen (not from any one museum)

Each course started from its question and the evidence the question needs, not from a collection:

| Course | Needed | Chosen | Why this one | Considered and not used |
|---|---|---|---|---|
| 26 | A Northern Song landscape whose *purpose* is documented, beyond Course 1's Fan Kuan | Guo Xi, *Early Spring* (NPM) | Signed and dated by the painter (1072); the painter's own treatise (*Linquan gaozhi*) answers “why landscape”; a Song record of Shenzong's halls of Guo Xi paintings (*Huaji*) | Wang Ximeng, *A Thousand Li* (Palace Museum, Beijing): the Cai Jing colophon is known only from secondary articles here; no museum page found. Li Tang, *Wind in Pines* (NPM 1124): kept for a later course |
| 27 | A Southern Song “corner” work with evidence of *how* it was meant to be seen | Ma Yuan, *Walking on a Mountain Path in Spring* (NPM album leaf) | Album format and size, a contemporary imperial couplet written in the empty part, NPM curatorial text on poem–painting practice | Xia Gui and Ma Lin used as counter-evidence, not anchors |
| 28 | Song–Yuan ceramics with museum-calibrated photography, several views, and published provenance | Jian tea bowl, Cleveland 1948.206 | CC0 photographs from seven angles (interior, foot, glaze close-up); Song tea texts name exactly this ware | Cleveland Jian 1942.132 (no provenance); Jun 1915.379 and Cizhou 1940.52 (no curatorial text, so nothing could be said about them) |
| 29 | A Yuan work where brushwork, “antiquity” and the copy/colophon problem are documented on the object | Huang Gongwang, *Dwelling in the Fuchun Mountains*, Wuyong scroll (NPM) | Painter's own colophon; Shen Zhou/Dong Qichang on Dong–Ju; Qianlong's wrong verdict written on the genuine scroll; NPM's published conclusion on the Ziming copy | Zhejiang Museum *Remaining Mountain* section: no open image found; named in text only |
| 31 | Giotto in his original setting, plus the earlier work he is always compared with | Lamentation, Scrovegni Chapel, Padua (in situ) | A site, not a museum object; UNESCO's own statement; the chapel also contains the painted “coretti” | Uffizi altarpieces used only for the comparison |

## Course 26 — 北宋画家为什么如此重视山水？ (card No.026, `northern-song-landscape.mdx`)

| Role | Work | Reference | Date | Material, size | File(s) | Image rights |
|---|---|---|---|---|---|---|
| Representative work, card, homepage | 郭熙《早春图》 | NPM 故画 000053 (Detail 47) | 1072 (inscription 壬子年) | hanging scroll, ink and light colour on silk, 158.3 × 108.1 cm | `guo-xi-early-spring.jpg` (IIIF PAA, **cropped** to the silk); `-signature/-valley/-traveller/-boat/-halls/-rock.jpg` (**crops** of IIIF detail canvases PAH, PAG, PAC, PAD) | NPM Open Data, CC BY 4.0 |
| Comparison (Course 1 record, unchanged) | 范宽《溪山行旅图》 | existing record | — | — | `fan-kuan-full.jpg` | as before |

Claims and their status:
- **NPM:** inscription “早春。壬子年郭熙畫” and seal 郭熙筆, position left middle; Qianlong 1759 poem; seals of 金章宗,
  王世贞, 耿昭忠, 索额图; Guo Xi c.1023–c.1085; entered court under Shenzong; “官府殿閣的新建布置中，都使用了郭熙的山水。此作可能原來也是其中之一”
  (the lesson keeps the museum's “可能”); composition symmetrical yet rhythmic; 雲頭皴, 蟹爪枝.
- **Primary texts (wikisource):** *Linquan gaozhi* — 君子之所以愛夫山水者…, 不下堂筵坐窮泉壑, 可行可望可遊可居 and 可居可遊之為得,
  十無三四, 大山堂堂…大君…百辟, 春山淡冶而如笑…秋山明凈如妝 (the wikisource text has no 而 before 如妝; quoted as found),
  山形步步移. 郭若虚《图画见闻志》卷一 “論古今優劣” (古不及近). 邓椿《画继》卷十 (神宗好熙筆，一殿專背熙作; the wiping-cloth story).
- **Flagged in the lesson:** *Linquan gaozhi* compiled by Guo Si (how much is Guo Xi's is uncertain); *Huaji* story is
  family memory (1167); matching details to 可行/可望/可居 is the lesson's reading; the 大君/百辟 simile is a composition
  rule, not proof the painting depicts the emperor; season reading of the details is interpretation.
- **Withdrawn while writing:** a paraphrase that inflated NPM's “halls” sentence into “large numbers of screens”;
  a quotation-marked NPM phrase that was not verbatim (now paraphrased).

## Course 27 — 南宋绘画为什么可以只画山的一角？ (card No.027, `southern-song-corner.mdx`)

| Role | Work | Reference | Date | Material, size | File(s) | Image rights |
|---|---|---|---|---|---|---|
| Representative work, card | 马远《山径春行》 | NPM 故画 001289-13 (Detail 14633), 名绘集珍册 leaf 13 | 1190–1224 (Ma Yuan's service under Guangzong/Ningzong) | album leaf, silk, 27.4 × 43.1 cm | `ma-yuan-spring-path.jpg` (IIIF PAC, **cropped**: later title slip and lower edge removed); `ma-yuan-album-leaf.jpg` (PAB, colour chart **cropped**); `ma-yuan-scholar.jpg` (PAE), `ma-yuan-couplet.jpg` (PAD) | NPM, CC BY 4.0 |
| Comparison | 马麟《静听松风图》 | NPM Detail 37 | by 1246 (理宗 “丙午” seal) | hanging scroll, silk, 226.6 × 110.3 cm | `ma-lin-pine-wind.jpg` (PAA, mounting and colour bars **cropped**) | NPM, CC BY 4.0 |
| Counter-example | 夏珪《溪山清远》 | NPM Detail 30 | Ningzong era | handscroll, paper, 46.5 × 889.1 cm | `xia-gui-cliffs.jpg` (section PAN, colour chart **cropped**) | NPM, CC BY 4.0 |

Claims and their status:
- **NPM:** couplet 觸袖野花多自舞，避人幽鳥不成啼 attributed by NPM's text to 宁宗; signature 馬遠 at lower-left edge;
  seals 張孝思, 梁清標; poem–painting practice from Huizong's court; emperors' and empresses' poems on court paintings;
  “半邊一角”, “馬一角”; 斧劈皴; Ma family of court painters; Ma Lin: “北宋時，人在山水畫中是過客…”; Lizong title, seals,
  1246 terminus; Xia Gui: 待诏, “馬夏”, most important surviving work.
- **Flagged:** the order of poem and painting is unknown (Callout “open”); the “过客/主题” contrast is a tendency;
  the “残山剩水” political reading is presented as a later reading with no contemporary support (InferenceChain →
  unknowable).
- **Not used:** NPM's link of the leaf to a poem it attributes to 程頤 (the poem is usually given to 程顥; not checked).
- **No homepage feature:** the leaf is landscape (aspect 1.57); `featured` omitted.

## Course 28 — 为什么宋元陶瓷能够呈现不同的美？ (card No.028, `song-yuan-ceramics.mdx`)

| Role | Object | Reference | Date | Material, size | Provenance | File(s) | Image rights |
|---|---|---|---|---|---|---|---|
| Representative work, card | Jian tea bowl, “hare's fur” | Cleveland 1948.206 | 1100s–1200s, Southern Song, Fujian | stoneware, black glaze, metal-bound rim; diam. 17.8, h. 8.7 cm | Dikran G. Kelekian, New York → CMA 1948 | `jian-bowl.jpg` (alt5), `-inside` (alt3), `-fur` (alt6), `-foot` (alt4) | CC0 |
| Comparison | Ru brush washer | Cleveland 1957.40 | late 1000s–1127 | porcelaneous stoneware; diam. 12.8 cm | Men-chu Wang, Beijing → Frank Caro → CMA 1957 | `ru-washer.jpg` (alt0), `-base` (alt6), `-crackle` (alt5) | CC0 |
| Comparison | Ding bowl with ducks | Cleveland 1929.995 | 1100s, Quyang | porcelain, incised; diam. 20.3 cm | Parish-Watson → CMA | `ding-bowl.jpg`, `-inside` (alt0) | CC0 |
| Comparison | Yuan blue-and-white jar | Cleveland 1962.154 | 1300s, Jingdezhen | porcelain, underglaze cobalt; h. 39.4 cm | J.T. Tai & Co. → CMA | `yuan-jar.jpg` | CC0 |

No crops; images only resized, colour profiles kept.

Claims and their status:
- **Cleveland:** iron in the glaze transmuting in firing into “hare's fur”; rarity of the size; popularity with tea
  cultures of China and Japan; Ru: rarest imperial ware, short production, ash-grey body, crackle, sesame-seed spur
  marks, black spot as characteristic imperfection; Ding: court selection, fired upside down, unglazed rim, metal band,
  “tear-stains”; Yuan jar: by the 1330s, domestic and overseas, cobalt from Iran (likely Kashan), Ilkhanid motifs,
  characters 宫/南 scratched on the shoulder.
- **Primary texts:** 蔡襄《茶录》“茶盏” (the wikisource text lacks one character, 熁, so the quotation uses “……”);
  赵佶《大观茶论》“盏”.
- **Visual effect vs explanation kept apart (the brief's requirement):** the lesson separates what is visible, what
  the museum states about the cause, and what would need laboratory study; the hare's-fur mechanism is not explained
  beyond Cleveland's sentence. The crackle cause (glaze/body contraction mismatch) is labelled as general ceramic
  knowledge, not a test of this object.
- **Withdrawn while writing:** “雨过天青” as a Ru description (a later legend attached to another ware); one
  unrelated further-reading title; “a century later” for Huizong (corrected to half a century).
- **No homepage feature:** all bowl views are wider than 0.8 aspect.

## Course 29 — 元代画家为什么强调笔墨与古意？ (card No.029, `yuan-brush-and-antiquity.mdx`)

| Role | Work | Reference | Date | Material, size | File(s) | Image rights |
|---|---|---|---|---|---|---|
| Representative work, card, homepage | 黄公望《富春山居图》（无用师卷） | NPM 故画 001016 (Detail 1194) | 1347–1350 | handscroll, ink on paper, 33 × 636.9 cm | `fuchun-scroll.jpg` (IIIF stitched strip SDAAA 13428 × 448, **cropped** to painting + Huang's colophon, 8560 × 448, **not resized**); `fuchun-peak.jpg` (PCD, **cropped**, homepage print), `-brush` (PBO), `-inscription` (PCJ), `-verdict` (PBL, upper part) | NPM, CC BY 4.0 |
| Copy | 《富春山居图》（子明卷） | NPM Detail 1193 | copy (NPM) | 32.9 × 589.2 cm | `fuchun-ziming.jpg` (middle quarter of the stitched strip, not resized) | NPM, CC BY 4.0 |
| Comparison | 赵孟頫《鹊华秋色》 | NPM Detail 909 | 1295 | handscroll, 28.4 × 93.2 cm | `zhao-qiao-hua.jpg` (PAE, colour chart **cropped**) | NPM, CC BY 4.0 |
| Comparison | 倪瓒《容膝斋图》 | NPM Detail 610 | 1372, re-inscribed 1374 | hanging scroll, 74.7 × 35.5 cm | `ni-zan-rongxi.jpg` (PAA), `-inscription` (PAC **crop**), `-shao-bao` (PAF **crop**) | NPM, CC BY 4.0 |

Claims and their status:
- **On the objects (NPM transcriptions, checked against the images):** Huang's colophon 至正七年…大癡學人書; Shen Zhou 1488
  (墨法筆法，深得董巨之妙…人品高則畫亦高); Dong Qichang (規摹董巨，天真爛熳); Qianlong 1746 via 梁詩正 (此卷筆力苶弱，其為贗鼎無疑;
  NPM's transcription uses a rare variant glyph, the site uses 苶); Ziming inscription 至元戊寅; Qianlong's account of
  沈德潜's five colophons; Zhao's 1295 inscription for 周密; Ni Zan's 1372 date and 1374 poem and note; 邵宝 “此非容膝齋圖也”.
- **NPM curatorial:** six joined sheets; damage in the late Ming fire and the front section now in the Zhejiang
  Provincial Museum; 郑无用 as Daoist friend; layered brushwork; Ziming judged a copy by modern scholars after Qianlong
  judged the reverse; Ziming as a reference for the lost front.
- **Primary text:** 倪瓒《清閟阁集》卷十 “與耕雲書” (逸筆草草，不求形似，聊以自娛耳).
- **Constraints of the brief:** not a Zhao Mengfu biography (Zhao appears once, through his own inscription); Yuan
  painting shown as three different manners; the “protest” reading is explicitly limited (Callout “open”); copies
  and colophons handled through the SortGame and InferenceChain.
- **Not used:** Zhao Mengfu's frequently quoted “作畫貴有古意” — no primary text was reached (wikisource search failed),
  so it is not quoted. Qianlong's “two thousand gold” is stated as covering the batch he bought, as his text says.

## Course 31 — 乔托的绘画为什么让后人重新思考空间？ (card No.031, `giotto-space.mdx`)

| Role | Work | Reference | Date | Material, size | File(s) | Image rights |
|---|---|---|---|---|---|---|
| Representative work, card | Giotto, Lamentation | Scrovegni Chapel, Padua, in situ (UNESCO 1623) | c.1303–1305 | fresco, 200 × 185 cm (Commons/WGA data) | `giotto-lamentation.jpg` (from a 10240 px reproduction by Gennadii Saus i Segura, 2022) | Public domain (Commons) |
| Same chapel | Annunciation to St Anne | in situ | same | fresco | `giotto-anne.jpg` (**cropped** to the scene; source gallerix via Commons) | Public domain (Commons) |
| Setting | Chapel interior, towards the altar | — | photo 2017-09-30 | — | `scrovegni-interior.jpg` | Zairon, CC BY-SA 4.0 |
| Comparison | Cimabue, Santa Trinita Maestà | Uffizi | c.1280–90 | tempera on panel | `cimabue-maesta.jpg` (Google Art Project) | Public domain (Commons) |
| Comparison | Giotto, Ognissanti Madonna | Uffizi | c.1300–05 | tempera on panel | `giotto-ognissanti.jpg` (Campocorvino) | Public domain (Commons) |

Claims and their status:
- **UNESCO 1623 (read in the browser):** 1302–1397 cycles; Giotto's cycle “considered to have marked the beginning of
  a revolutionary development in the history of mural painting”; new understanding of spatial representation; optics;
  perspective and trompe-l'oeil effects; individual features and emotions.
- **Primary texts:** Dante, *Purgatorio* XI 94–96; Cennini, *Il libro dell'arte* ch.1 (“rimutò l'arte del dipignere di
  greco in latino, e ridusse al moderno”). Both public domain. The lesson notes that neither describes space.
- **Constraints of the brief:** Giotto is said plainly not to have invented linear perspective (Brunelleschi,
  Alberti 1435); Byzantine and earlier choices are presented as different aims, not failures; Courses 19 (icon facing
  the viewer, gold ground, “Greek manner”) and 20 are linked only by comparison, with no claimed influence.
- **Flagged:** the reading of the backs and the ridge; authorship and purpose of the painted coretti (open); optics as
  Giotto's source (plausible only).
- **Rights caution:** the Lamentation reproduction is an uploader's 2022 copy, not a museum file; its colour is not
  verified against the wall.
- **No homepage feature:** the Lamentation is nearly square.

## New components (one work-specific mini-game per course, added at the Product Owner's request)

None scores, stores anything or gates the card; each shows at most three statements or four places.

- `SpotPick.astro` (26): “where would you build your house in this painting?” — one click picks a zone, its note opens;
  “看看画家的选择” rings the halls Guo Xi painted. Leads into 可居. Zone notes are labelled as the lesson's reading.
- `PoemPlace.astro` (27, replaces the CoverCompare first used there): the imperial couplet is covered with a silk-tone
  patch; the reader sets the same two lines, in type, at four places and reads what each does; “看原作” lifts the patch.
  Labelled schematic (type, not Ningzong's hand).
- `TeaContest.astro` (28): after Cai Xiang's 點茶 rule (以水痕先者為負, verified on wikisource): white froth in a black,
  a celadon-white and a white bowl draws back from the wall; the reader presses when the water mark shows. Flat
  stand-in colours and a set speed; labelled schematic; makes the visual point only (contrast), not a claim about
  tea chemistry.
- `ScrollUnroll.astro` (29): a handscroll strip, wider than the text column, opening at the right end, with named
  stops and an “一次只看一臂宽” switch (window = 1.8 × the scroll's height, about an arm's width for a 33 cm scroll).
- `DepthOrder.astro` (31): click four things from nearest to farthest; the clue each time is overlap. Replaces a planned
  “extend the receding edges” game that was dropped because the edges could not be measured reliably enough by eye to
  make the no-single-vanishing-point claim honestly.

All five were exercised in headless Chrome (clicks, keyboard paths not scripted) at 1280, 1024 and 390 px; no
horizontal overflow.

## Fonts

`node scripts/fonts/collect-chars.mjs` found 57 characters new to the homepage/course-book text. The Noto subsets were
rebuilt from the same sources (README versions): 1,180 Han characters; Serif 437 KB, Sans 334 KB.
