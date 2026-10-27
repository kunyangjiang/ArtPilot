// The homepage's five destinations, with the labels approved in Phase 4.1A. `href` only where a real page exists;
// the other three areas are shown as in preparation and are not links.
import hokusaiWave from '../assets/home/hokusai-wave.jpg';
import cholaNataraja from '../assets/home/chola-nataraja.jpg';

export type Destination = {
  id: 'courses' | 'stories' | 'cases' | 'atlas' | 'collection';
  no: string;
  label: string; // the primary label, exactly as approved
  sub: string; // a secondary line in the other language
  premise: string; // one sentence on what the area is
  href?: string; // present only when the area exists
};

export const destinations: Destination[] = [
  { id: 'courses', no: '01', label: '全球艺术史课程', sub: 'Global Art History Courses', href: '/courses/',
    premise: '从一件真实的作品出发，读懂它为什么是这样。' },
  { id: 'stories', no: '02', label: '艺术家故事馆', sub: 'Artist Stories', href: '/stories/',
    premise: '一位艺术家的生平，与他的艺术怎样一步步形成。' },
  { id: 'cases', no: '03', label: 'Cases', sub: '叙事案例', href: '/cases/',
    premise: '从一件作品或一处遗址出发的调查与重建。' },
  { id: 'atlas', no: '04', label: '同时代的世界', sub: 'The World at the Same Time',
    premise: '选一个时代，看世界各地同时在创造什么。' },
  { id: 'collection', no: '05', label: 'Art Collection', sub: '藏品图鉴', href: '/collection/',
    premise: '学完一门课，领取它的藏品卡；翻到背面，进入完整的藏品记录。' },
];

export const SOON = '筹备中 · 尚未开放';

// Images hung on the homepage that are not part of a lesson record, with their rights.
export const homeImages = {
  wave: {
    img: hokusaiWave,
    alt: '葛饰北斋《神奈川冲浪里》：巨浪卷起，浪下三条小船，远处是富士山。',
    caption: '葛饰北斋《神奈川冲浪里》，约 1830–1832 年，木版画。大都会艺术博物馆藏（45434）。',
    credit: '公有领域（Wikimedia Commons，据大都会艺术博物馆藏品图像）',
    source: 'https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg',
  },
  nataraja: {
    img: cholaNataraja,
    alt: '青铜湿婆舞王像：湿婆在火焰环中单足起舞，四臂舒展，头发向两侧飞扬。',
    caption: '《舞王湿婆》，印度泰米尔纳德，大都会艺术博物馆断代为 12 世纪末至 13 世纪初，铜合金。大都会艺术博物馆藏（64.251）。',
    credit: 'CC0（大都会艺术博物馆开放获取，经 Wikimedia Commons）',
    source: 'https://commons.wikimedia.org/wiki/File:MET_DP221497.jpg',
  },
};
