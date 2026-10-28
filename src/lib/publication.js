// Which syllabus courses are published: a lesson says which course it is (`course` in its frontmatter), and that is
// the one place the course book, the homepage and the tests learn it from.
export const TOTAL_COURSES = 83;

/** { [course number]: lesson } for the given lessons. A missing, out-of-range or repeated number is an error. */
export function courseIndex(lessons, total = TOTAL_COURSES) {
  const byCourse = {};
  for (const lesson of lessons) {
    const n = lesson.course;
    if (!Number.isInteger(n) || n < 1 || n > total) throw new Error(`Lesson "${lesson.id}" needs a course number from 1 to ${total}, got ${n}`);
    if (byCourse[n]) throw new Error(`Course ${n} is claimed by both "${byCourse[n].id}" and "${lesson.id}"`);
    byCourse[n] = lesson;
  }
  return byCourse;
}

/** The lessons in syllabus order. */
export const inCourseOrder = (lessons) => [...lessons].sort((a, b) => a.course - b.course);

/** A lesson's collectible card is numbered by its course: course 1 → '001', course 30 → '030'. */
export function cardNumber(course, total = TOTAL_COURSES) {
  if (!Number.isInteger(course) || course < 1 || course > total) throw new Error(`No card number for course ${course}`);
  return String(course).padStart(3, '0');
}

// Cards awarded by an artist story, outside the core courses. The artist series starts at No.084, right after the last
// course; it has no fixed end (how many stories there will be is not decided), and the case series, when cases award
// cards, follows the whole artist series. Each card's number is given here by hand: a whole number from 84 up, used
// once. A card is identified everywhere by its artwork id (claims in the browser, #card-… links), never by its number,
// so a number can move without touching anyone's collection: with the 83-course syllabus (2026-10-28) The Tortoise
// Trainer moved from No.074 to No.084.
export const ARTIST_SERIES = { first: 84 };
export const ARTIST_CARDS = {
  'art-osman-hamdi-tortoise-trainer-001': 84, // No.074 on the 73-course site
};

/** The artist-series number of a card ('084'), or undefined when the artwork is not an artist-series card. */
export function artistCardNumber(artworkId, cards = ARTIST_CARDS) {
  const n = cards[artworkId];
  if (n === undefined) return undefined;
  if (!Number.isInteger(n) || n < ARTIST_SERIES.first) throw new Error(`Artist card ${artworkId} has number ${n}, below ${ARTIST_SERIES.first}`);
  if (Object.values(cards).filter((m) => m === n).length > 1) throw new Error(`Artist card number ${n} is given twice`);
  return String(n).padStart(3, '0');
}
