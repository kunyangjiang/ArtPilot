// Phase 4.1A homepage concepts: the five destinations both concepts must offer, with identical labels, so the
// comparison is about spatial design, not about what is on offer. `href` only where a real page exists.

export type Destination = {
  id: 'courses' | 'stories' | 'cases' | 'atlas' | 'collection';
  no: string;
  label: string; // the primary label, exactly as approved
  sub: string; // a secondary line in the other language
  premise: string; // one sentence on what the area is
  href?: string; // present only when the area exists
};

export const destinations: Destination[] = [
  { id: 'courses', no: '01', label: '全球艺术史课程', sub: 'Global Art History Courses', href: '/',
    premise: '从一件真实的作品出发，读懂它为什么是这样。' },
  { id: 'stories', no: '02', label: '艺术家故事馆', sub: 'Artist Stories',
    premise: '一位艺术家的生平，与他的艺术怎样一步步形成。' },
  { id: 'cases', no: '03', label: 'Cases', sub: '叙事案例',
    premise: '从一件作品或一处遗址出发的调查与重建。' },
  { id: 'atlas', no: '04', label: '同时代的世界', sub: 'The World at the Same Time',
    premise: '选一个时代，看世界各地同时在创造什么。' },
  { id: 'collection', no: '05', label: 'Art Collection', sub: '藏品图鉴', href: '/collection/',
    premise: '学完一门课，领取它的藏品卡；翻到背面，进入完整的藏品记录。' },
];

export const SOON = '筹备中 · 尚未开放';
