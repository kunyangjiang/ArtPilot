// Which syllabus courses are published: a lesson says which course it is (`course` in its frontmatter), and that is
// the one place the course book, the homepage and the tests learn it from.
export const TOTAL_COURSES = 73;

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

// Cards awarded by an artist story, outside the core courses. The artist series is No.074–093; each card's number is
// given here by hand, once, and never changes after it is published. (The case series will start after 093; cases award
// no cards yet.)
export const ARTIST_SERIES = { first: 74, last: 93 };
export const ARTIST_CARDS = {
  'art-osman-hamdi-tortoise-trainer-001': 74,
};

/** The artist-series number of a card ('074'), or undefined when the artwork is not an artist-series card. */
export function artistCardNumber(artworkId, cards = ARTIST_CARDS) {
  const n = cards[artworkId];
  if (n === undefined) return undefined;
  if (!Number.isInteger(n) || n < ARTIST_SERIES.first || n > ARTIST_SERIES.last) throw new Error(`Artist card ${artworkId} has number ${n}, outside ${ARTIST_SERIES.first}–${ARTIST_SERIES.last}`);
  return String(n).padStart(3, '0');
}
