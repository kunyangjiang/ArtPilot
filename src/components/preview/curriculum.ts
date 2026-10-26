// The design previews read the approved syllabus from the production data, so there is one source of truth.
export { stages, TOTAL_COURSES, courseTitles, sampleIntro } from '../../data/curriculum';
// A frozen copy for these concept pages (the live pages learn it from each lesson's `course` field).
export const implemented: Record<number, string> = { 1: 'mountain-and-smallness', 30: 'stone-and-light' };
export type { Stage } from '../../data/curriculum';
