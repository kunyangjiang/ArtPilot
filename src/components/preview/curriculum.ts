// Phase 4.1B-0 catalogue preview: the approved core syllabus v1.0 (73 courses in seven recommended stages), copied
// verbatim from "ArtPilot — Master Product Baseline", §5 (2026-10-25). Only the two stages shown as samples carry
// their course lists. Courses that exist are linked by lesson id; their titles come from the lesson itself (course 30
// uses the title the Product Owner approved in Phase 4.0-A, which replaces the baseline's working title).

export type Stage = { no: string; title: string; first: number; last: number };

export const stages: Stage[] = [
  { no: '01', title: '学会欣赏艺术', first: 1, last: 5 },
  { no: '02', title: '图像、仪式与早期文明', first: 6, last: 14 },
  { no: '03', title: '信仰、图像与文化传播', first: 15, last: 25 },
  { no: '04', title: '成熟艺术传统与新的视觉语言', first: 26, last: 37 },
  { no: '05', title: '传统、宫廷、市场与全球交流', first: 38, last: 54 },
  { no: '06', title: '现代社会与艺术变革', first: 55, last: 66 },
  { no: '07', title: '艺术走向当代世界', first: 67, last: 73 },
];

export const TOTAL_COURSES = 73;

// Course titles for the two sample stages, numbered as in the syllabus.
export const courseTitles: Record<number, string> = {
  1: '一座山，为什么让人感到如此渺小？',
  2: '为什么有些肖像并不像真人？',
  3: '画家是怎样引导你的目光的？',
  4: '为什么艺术不只是绘画？',
  5: '我们怎么知道一件作品意味着什么？',
  26: '北宋画家为什么如此重视山水？',
  27: '南宋绘画为什么可以只画山的一角？',
  28: '为什么宋元陶瓷能够呈现不同的美？',
  29: '元代画家为什么强调笔墨与古意？',
  30: '一座哥特式教堂为什么让人感到渺小？', // baseline working title; the lesson's approved title is shown instead
  31: '乔托的绘画为什么让后人重新思考空间？',
  32: '伊斯兰世界为什么拥有多样的建筑与装饰？',
  33: '印度寺庙与青铜神像如何进入仪式？',
  34: '日本绘卷如何让故事沿画面展开？',
  35: '高丽青瓷为什么有独特的美感？',
  36: '吴哥与蒲甘为何形成宏伟的宗教空间？',
  37: '伊费头像如何表现权力与艺术技艺？',
};

// Syllabus number → implemented lesson id.
export const implemented: Record<number, string> = {
  1: 'mountain-and-smallness',
  30: 'stone-and-light',
};

// Short introductions for the sample stages. Not approved copy: shown on the page as sample text.
export const sampleIntro: Record<string, string> = {
  '01': '这一阶段不按年代排列。先学会看一件作品：画面怎样引导目光，肖像为什么不必像真人，艺术为什么不只是绘画，我们又凭什么说一件作品意味着什么。',
  '04': '大致对应公元 10 至 14 世纪前后。世界各地的艺术传统在这一时期各自走向成熟：中国的山水与陶瓷，欧洲的哥特式教堂，伊斯兰世界的建筑与装饰，南亚的寺庙与青铜神像，日本的绘卷，吴哥与蒲甘，伊费的头像。',
};
