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
