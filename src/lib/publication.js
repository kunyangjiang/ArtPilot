// Which syllabus courses are published: a lesson says which course it is (`course` in its frontmatter), and that is
// the one place the course book, the homepage and the tests learn it from.
export const TOTAL_COURSES = 90;

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

/** A course's three-digit label: course 1 → '001'. Since a course may award more than one card (Art Collection A+), this
 * is no longer a card number from course 5 on; card numbers come from cardIndex. */
export function cardNumber(course, total = TOTAL_COURSES) {
  if (!Number.isInteger(course) || course < 1 || course > total) throw new Error(`No card number for course ${course}`);
  return String(course).padStart(3, '0');
}

// Cards awarded by an artist story, outside the core courses, in the order the artist series runs: one entry per story,
// its own card (the story's `card`); a story's extra cards (`cards`) follow it. The series has no fixed end, and the case
// series, when cases award cards, follows the whole artist series. A card is identified everywhere by its artwork id
// (claims in the browser, #card-… links), never by its number, so a number can move without touching anyone's
// collection: The Tortoise Trainer was No.074 on the 73-course site, No.084 with the 83-course syllabus, and moved again when the syllabus grew to 90; it follows
// the A+ core block now. New stories are appended in the order they are published; this list is also the order of the
// stories hall (src/components/EssayHall.astro).
export const ARTIST_CARDS = [
  'art-osman-hamdi-tortoise-trainer-001',
  'art-van-gogh-bedroom-001',
  'art-hokusai-great-wave-001',
  'art-abad-new-kids-in-class-001',
  'art-howe-war-dancer-001',
];

/**
 * Every collectible card's number, worked out from what is published (Art Collection A+, 2026-10-28).
 * The core block keeps one slot for each of the syllabus courses, published or not, and one more for every extra card
 * a published course awards: a course's own card comes first, then its extras in the order its lesson lists them, and
 * every later number moves up by that many. A course not yet published keeps its single slot and creates no card, so
 * publishing a course with one card renumbers nothing. The artist series follows the whole core block.
 * Numbers are for display only: claims, links and reading places use artwork ids.
 * @param lessons [{ id, course, artwork, cards? }] — artwork ids
 * @param stories [{ id, card, cards? }] — the essays that award cards
 * @returns Map artworkId → { no: '005', series: 'core' | 'artist', course?: number, group: [ids one claim awards], by: lesson or story id }
 */
export function cardIndex(lessons, stories = [], { total = TOTAL_COURSES, artistOrder = ARTIST_CARDS } = {}) {
  const byCourse = courseIndex(lessons, total);
  const index = new Map();
  let n = 0;
  const award = (group, entry) => {
    for (const id of group) {
      if (index.has(id)) throw new Error(`Card ${id} is awarded by both "${index.get(id).by}" and "${entry.by}"`);
      index.set(id, { no: String(++n).padStart(3, '0'), group, ...entry });
    }
  };
  for (let course = 1; course <= total; course++) {
    const lesson = byCourse[course];
    if (lesson) award([lesson.artwork, ...(lesson.cards ?? [])], { series: 'core', course, by: lesson.id });
    else n += 1; // the reserved slot of a course still to come
  }
  for (const story of stories) {
    if (!artistOrder.includes(story.card)) throw new Error(`Story "${story.id}" awards ${story.card}, which is not in ARTIST_CARDS`);
  }
  for (const id of artistOrder) {
    const story = stories.find((s) => s.card === id);
    if (!story) throw new Error(`Artist card ${id} has no story that awards it`);
    award([id, ...(story.cards ?? [])], { series: 'artist', by: story.id });
  }
  return index;
}
