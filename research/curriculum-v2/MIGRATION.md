# Curriculum v1.0 (73 courses, 7 stages) → v2.0 (83 courses, 8 stages): migration record

Approved by the Product Owner on 2026-10-28 and implemented on top of `73a4a4f`. All 73 topics are kept and ten are
added. The old Stage 06 is split into a nineteenth-century Stage 06 and an early-twentieth-century Stage 07, and the old
Stage 07 becomes Stage 08. A 79-course, seven-stage draft (six additions) came first; it was never committed or
published, and the final version builds on it. The superseded 77-course proposal was not used.

The data lives in `src/data/curriculum.ts` (`stages`, `courseTitles`, `v1ToV2`).
`tests/syllabus-migration.test.js` holds a frozen copy of v1.0 and checks the final numbering against an independent copy
of the approved mapping.

## Stages

| Stage | Title | v2.0 range | Count | v1.0 range |
|---|---|---|---:|---|
| 01 | 学会欣赏艺术 | 1–5 | 5 | 1–5 |
| 02 | 图像、仪式与早期文明 | 6–14 | 9 | 6–14 |
| 03 | 信仰、图像与文化传播 | 15–25 | 11 | 15–25 |
| 04 | 成熟艺术传统与新的视觉语言 | 26–37 | 12 | 26–37 |
| 05 | 传统、宫廷、市场与全球交流 | 38–56 | 19 | 38–54 |
| 06 | 19世纪：现实、光色与现代生活 | 57–63 | 7 | part of 55–66 |
| 07 | 20世纪上半叶：现代主义与全球艺术转型 | 64–73 | 10 | part of 55–66 |
| 08 | 战后艺术与全球当代世界 | 74–83 | 10 | 67–73 |

## Added courses (unpublished syllabus entries only)

| No. | Stage | Title |
|---:|---|---|
| 44 | 05 | 威尼斯画家为什么让色彩成为绘画的主角？ |
| 46 | 05 | 西班牙黄金时代的绘画为什么既逼真又虔诚？ |
| 58 | 06 | 19世纪现实主义为什么要描绘普通人和日常劳动？ |
| 61 | 06 | 后印象派画家为什么不再满足于描绘光线？ |
| 64 | 07 | 野兽派与表现主义为什么用强烈的色彩表达感受？ |
| 66 | 07 | 当画面不再描绘现实，抽象艺术还在表达什么？ |
| 68 | 07 | 超现实主义画家为什么要画出梦境？ |
| 75 | 08 | 战后欧洲画家为什么仍然坚持描绘人物？ |
| 76 | 08 | 波普艺术为什么把广告和商品变成绘画？ |
| 78 | 08 | 历史、记忆与照片如何进入战后欧洲绘画？ |

The first six came from the 79-course draft; 66, 75, 76 and 78 were added in the final revision. In the draft,
Fauvism and Expressionism was 62 and Surrealism was 65.

## v1.0 → v2.0 numbers

1–43 and 63 are unchanged. The rest:

44→45, 45→47, 46→48, 47→49, **48→50** (published: `ukiyo-e-city-prints`), 49→51, 50→52, 51→53, 52→54, 53→55, 54→56,
55→57, 56→59, 57→60, 58→65, 59→67, 60→62, 61→69, 62→70, 64→71, 65→72, 66→73,
67→74, 68→77, 69→79, 70→80, 71→81, 72→82, 73→83.

For reference, the 79-course draft → final step was: 1–61 unchanged; 62→64, 63→65, 64→67, 65→68, 66→62, 67→69,
68→70, 69→63, 70→71, 71→72, 72→73, 73→74, 74→77, 75→79, 76→80, 77→81, 78→82, 79→83.

## Cards and saved state

- **Course cards** are numbered by their course: No.001–083. Of the 32 published lessons, courses 1–31 keep their
  numbers. The ukiyo-e lesson (Sharaku, `art-sharaku-oniji-001`) moved from course 48 to 50. Its card is now
  **No.050** (was No.048), and its slug and URL (`/lessons/ukiyo-e-city-prints/`) are unchanged.
- **Artist Story cards** start at **No.084** and have no fixed upper end. Each number is a whole number from 84 up,
  given once by hand in `src/lib/publication.js`. *The Tortoise Trainer* (`art-osman-hamdi-tortoise-trainer-001`) is
  now **No.084** (No.074 on the 73-course site). The collection's artists' cabinet is labelled "No.084 起". Case cards,
  when they come, follow the whole artist series; no number is reserved for them.
- **Saved state needed no runtime migration.** Browser state never stores a course or card number:
  - Claims are kept by artwork id (`artpilot.collection`).
  - The continue-reading entry and per-article places are kept by kind and slug (`artpilot.reading`,
    `artpilot.places`).
  - Card links are `#card-<artwork id>`.

  Saved claims and reading places from the 73-course site are read back unchanged and shown with the new numbers. The
  legacy-state test feeds such a saved state through the real readers.
