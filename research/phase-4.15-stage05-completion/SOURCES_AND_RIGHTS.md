# Phase 4.15: Stage 05 Completion (Courses 51–56): sources, image rights and selection

**Checked:** 2026-10-28.

## Where the data came from

| Source | How it was read |
|---|---|
| Met | Collection API (`v1/objects/{id}`; search through `v1.1/search`). Object pages, Heilbrunn essays and educational pages read in the built-in browser. Catalogue Entry, inscription and provenance tabs opened with real clicks. |
| Korea Heritage Service | Open API (`khs.go.kr/cha/SearchKindOpenapiDt.do`): designation texts and official photographs, the latter used under KOGL Type 1. |
| Smithsonian National Museum of Asian Art | Object page read in the browser. |
| Ashmolean Islamic ceramics teaching site | Read with WebFetch. |
| *Korea JoongAng Daily* (2021) | Read with WebFetch. |
| Commons | Licence data from the Commons API. |

## How images were handled

Every image was resized to at most 1600 px on its long side and recompressed. Where stated, it was cropped. Nothing was recoloured, sharpened or annotated in the file.

## Not consulted

- Every book listed under 延伸阅读.
- Choi Sun-u's 1963 column.
- Dapper's 1668 book.
- Jerez's 1534 account.
- Guaman Poma's manuscript.
- Necipoğlu and Beach.

The lessons cite all of these only through the museum texts that quote them.

## Repeats checked

`public/img`, the artwork records and the lesson MDX were searched before selection. None of the works below is featured in another lesson.

| Avoided | Already used in |
|---|---|
| Padshahnama page | Course 3 |
| Iznik dish 66.4.2 | Course 40 |
| Isfahan mihrab | Course 21 |
| Isfahan square | Course 32 |
| Olmec head | Course 14 |
| Maya lintel | Course 24 |
| Ife heads | Course 37 |

Each of these is mentioned only by course number.

Course 50 was not edited.

## Development GPT plans: retained or adjusted

### Course 51: retained

- **Arc kept:** the moon jar followed by Jeong Seon, with the brief's warning against a single unified aesthetic made explicit.
- **Moon jar:** the anchor is the National Treasure moon jar at the National Palace Museum of Korea (KHS designation 2007-2), not an NMK piece. Its KHS text documents the Bunwon / Geumsa-ri kiln, two-part construction and asymmetry. The NMK Treasure jar was considered; its KHS text is less specific.
- **Jeong Seon:** 《风岳图帖》 (1711, NMK), 《金刚全图》 (1734) and 《仁王霁色图》 (1751, NMK) are all documented by KHS.
- **Painting against landscape:** done with a modern Inwangsan photograph. It was taken from a different side than the painting, and the lesson says so instead of claiming a viewpoint match. No sourced viewpoint photograph of the Diamond Mountains was available.

### Course 52: retained, with a sharper mechanism

- **Arc kept:** an Ottoman–Safavid contrast that never reduces the difference to sect.
- **Safavid anchor:** the Tahmasp *Shahnama* folio "The Feast of Sada" (Met).
- **Pattern travelling across media:** Shah Quli's drawing → Iznik tile → silk → Rüstem Paşa Mosque walls.
- **Exchange:** Shah Quli emigrated from Iran, and the *Shahnama* was sent as a gift to Selim II in 1568.
- **Not used:** an Ottoman illustrated manuscript, for lack of a well-documented CC0 example; the lesson notes that both courts made books.

### Course 53: adjusted

- **Change:** Bichitr's *Jahangir Preferring a Sufi Shaikh to Kings* (Freer F1942.15a) is marked "Usage Conditions Apply" by the Smithsonian, so its image is not reproduced. The work is discussed in text with its documented provenance, including Nadir Shah in 1739.
- **Replacement anchor:** Chitarman's *Shah Jahan on a Terrace* (Met, CC0), which carries the same argument of visual ranking and borrowed means. It has a halo, European angels, a signature on the platform and Persian calligraphy on the verso.
- **Comparison works:**
  - a Bichitr portrait from the Met (CC0);
  - Manohar's Jahangir and his vizier;
  - Abu'l Hasan's natural-history page.

### Course 54: retained

- **Three settings:** the Inca Andes, central Mexico (Mexica) and the Taíno Antilles.
- **Why Taíno as the third:** the first society in contact with Europeans after 1492, and a documented chiefly regalia system, which avoids repeating the Maya of Course 24.
- **Anchor:** the Inca checkerboard tunic, Met 2017.674.
- **No map engine:** the setting changes are carried by section headings and an EraLine.

### Course 55: retained

- **Anchor:** the colonial miniature tabard (Met 2007.470), whose museum text documents imported silk and metal thread alongside Andean technique.
- **Same-scale comparison:** the Inca votive tunic (2018.5).
- **Further evidence:** the viceregal tapestry fragment (2011.324), with the museum's explicit caution against reading subversion, and New Spain featherwork (Met 88.3.1).
- **Not included:** an African-descended artist. No specific, consulted evidence was found within scope, so the lesson does not assert it.

### Course 56: retained

- **Anchor:** the Met's *Plaque with Warrior and Attendants* (1990.332).
- **Hierarchy:** read from the Met's text on hierarchical proportions, regalia and attendants.
- **Comparisons:** the equestrian oba plaque, the Portuguese-and-manillas plaque and a commemorative brass head.
- **Lost-wax process:** explained as a static four-step list, with the hollow back of the plaque as visible evidence.
- **The palace:** Dapper's description and the "card index" idea are presented as testimony and conjecture.
- **1897 and restitution:** 1897 is given only as context; restitution is deferred to the planned Case.

## Main sources by course

### Course 51

- KHS designation texts:
  - 백자 달항아리 (2007-2) and (2005-1);
  - 정선 필 풍악도첩;
  - 정선 필 금강전도;
  - 정선 필 인왕제색도.
- Met, "In Pursuit of White: Porcelain in the Joseon Dynasty".
- Met moon jar 1979.413.1.
- *Korea JoongAng Daily*, 9 March 2021, on the name "moon jar".

### Course 52

- Met, Leoni, "The Shahnama of Shah Tahmasp" (2008).
- Met, "The Art of the Ottomans before 1600".
- Met educational page "Ottoman Art".
- Met objects 1970.301.2, 57.51.26, 64.27.17 and 52.20.17.
- Ashmolean Iznik "Peak (1560–1600)".

### Course 53

- Met objects:
  - 55.121.10.24 (description and signature);
  - 55.121.10.23;
  - 55.121.10.1;
  - 55.121.10.15;
  - 452104.
- Met, Viswanathan, "The Shah Jahan Album" (2010).
- Met, "The Art of the Mughals after 1600" and "… before 1600".
- Smithsonian F1942.15a: provenance and rights status.

### Course 54

- Met objects 2017.674, 33.149.100, 00.5.32, 00.5.36, 1979.206.1209 and 2022.467.

### Course 55

- Met objects 2007.470 (Giuntini 2017), 2018.5, 2011.324 and 88.3.1.

### Course 56

- Met objects 1990.332 (including the long text "The Legacy of Benin Court Art"), 1978.412.309, 1991.17.13, 1979.206.86 and 1991.17.7.

## Main uncertainties stated in the lessons

- **Course 51:** the use of the moon jar; the true coinage of the name "moon jar"; Jeong Seon's viewpoints.
- **Course 52:**
  - the dates of the *Shahnama*;
  - the Rüstem Paşa Mosque date (completed 1559 according to the Ashmolean, 1561–63 in other accounts);
  - which tiles are original;
  - whether Shah Quli invented the *saz* style.
- **Course 53:** which European image Chitarman used; artists' social status; the reason Bichitr's image is not shown.
- **Course 54:** the specific use of the zemí; colonial-era sources such as Jerez, Guaman Poma and the Spanish accounts.
- **Course 55:** the figure the tabard dressed; the weaver's intentions (subversion is explicitly not asserted).
- **Course 56:**
  - the plaques' original arrangement;
  - whether Dapper visited Benin;
  - the plaque's ownership between 1897 and 1990;
  - the details of the casting process.

## Image rights

| Files | Source | Licence |
|---|---|---|
| `moon-jar-national-treasure.jpg`, `jeong-seon-geumgang-1711.jpg` | Korea Heritage Service | KOGL Type 1 (attribution) |
| `moon-jar-met*.jpg` and all Met-derived files in Courses 52–56 (see the artwork records) | The Met | CC0 |
| `jeong-seon-geumgang-1734.jpg`, `jeong-seon-inwang.jpg` | Commons scans of 18th-century paintings | PD-Art |
| `inwangsan-photo.jpg` | Commons, MonasteryInwang | CC BY-SA 4.0 (cropped; shared under the same licence) |
| `rustem-pasha-interior.jpg`, `rustem-pasha-saz-tiles.jpg` | Commons, Dosseman | CC BY-SA 4.0 |

Each image's credit, licence URL, source URL and changes are recorded in the artwork JSON. The Benin images' CC0 status is separate from the ownership and restitution debate, and the record says so.

## Components

No new component was added. The lessons reuse:

- FindOnImage;
- FeatureCompare;
- SortGame (three items each);
- EraLine;
- InferenceChain;
- ObservationQuiz;
- Split, Callout and Term.

In every lesson, each find game comes before any text that reveals its answers.
