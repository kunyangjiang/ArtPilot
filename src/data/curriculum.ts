// The approved core syllabus v2.0: 83 courses in eight recommended stages. v1.0 (73 courses, seven stages) was copied
// verbatim from "ArtPilot — Master Product Baseline", §5 (2026-10-25). The Product Owner's 2026-10-28 revision keeps all
// 73 topics, adds ten (six European painting courses in Stages 05–06, then abstraction, postwar European figuration, Pop
// Art and postwar European painting with photography and memory), and splits the old Stage 06 into a nineteenth-century
// Stage 06 and an early-twentieth-century Stage 07; the old Stage 07 becomes Stage 08. Courses 1–43 keep their numbers
// (see v1ToV2 below). An intermediate 79-course draft was never published. The stages are a recommended pathway, not a
// replacement for separate strands.
// Courses that exist are the lessons whose frontmatter names their course number (see src/lib/publication.js); for
// those the page shows the lesson's own title (course 30 uses the title the Product Owner approved in Phase 4.0-A,
// which replaces the baseline's working title below).

export type Stage = { no: string; title: string; first: number; last: number };

export const stages: Stage[] = [
  { no: '01', title: '学会欣赏艺术', first: 1, last: 5 },
  { no: '02', title: '图像、仪式与早期文明', first: 6, last: 14 },
  { no: '03', title: '信仰、图像与文化传播', first: 15, last: 25 },
  { no: '04', title: '成熟艺术传统与新的视觉语言', first: 26, last: 37 },
  { no: '05', title: '传统、宫廷、市场与全球交流', first: 38, last: 56 },
  { no: '06', title: '19世纪：现实、光色与现代生活', first: 57, last: 63 },
  { no: '07', title: '20世纪上半叶：现代主义与全球艺术转型', first: 64, last: 73 },
  { no: '08', title: '战后艺术与全球当代世界', first: 74, last: 83 },
];

export { TOTAL_COURSES } from '../lib/publication.js';

export const courseTitles: Record<number, string> = {
  1: '一座山，为什么让人感到如此渺小？',
  2: '为什么有些肖像并不像真人？',
  3: '画家是怎样引导你的目光的？',
  4: '为什么艺术不只是绘画？',
  5: '我们怎么知道一件作品意味着什么？',
  6: '人类为什么开始创造图像？',
  7: '中国早期的玉器与陶器意味着什么？',
  8: '青铜器上的动物纹饰告诉我们什么？',
  9: '一座城市如何展示神与国王的权力？',
  10: '为什么古埃及与努比亚如此重视墓葬？',
  11: '古希腊为什么塑造理想人体？',
  12: '罗马为什么到处建造纪念性建筑？',
  13: '印度河文明留下了什么艺术证据？',
  14: '古代美洲如何创造自己的视觉世界？',
  15: '为什么古人把世界画进墓里？',
  16: '佛像是怎样形成并传播的？',
  17: '穿过丝绸之路，佛教艺术如何进入中国？',
  18: '魏晋到唐代，书法和人物画怎样发展？',
  19: '拜占庭圣像为什么不只是肖像？',
  20: '欧洲中世纪如何用艺术讲述信仰？',
  21: '清真寺与书法怎样形成艺术语言？',
  22: '婆罗浮屠为什么像一座可以行走的故事？',
  23: '太平洋的艺术如何承载祖先、土地与航海知识？',
  24: '玛雅艺术怎样记录城市与统治者？',
  25: '佛教如何改变日本与朝鲜半岛的艺术？',
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
  38: '明代文人为什么反复临摹古画？',
  39: '清代画家怎样重新理解传统？',
  40: '为什么中国瓷器会影响遥远的世界？',
  41: '文艺复兴画家怎样创造画面空间？',
  42: '北方文艺复兴为什么如此重视细节？',
  43: '达·芬奇、拉斐尔与米开朗基罗改变了什么？',
  44: '威尼斯画家为什么让色彩成为绘画的主角？', // added in v2.0
  45: '巴洛克艺术如何通过光影与空间感染观众？',
  46: '西班牙黄金时代的绘画为什么既逼真又虔诚？', // added in v2.0
  47: '荷兰画家为什么热衷描绘日常生活？',
  48: '为什么18世纪艺术在优雅与庄严之间变化？',
  49: '日本茶室、庭园和屏风有什么审美联系？',
  50: '浮世绘为什么成为城市流行艺术？',
  51: '朝鲜王朝为什么重视白瓷与真景山水？',
  52: '奥斯曼与萨法维艺术有何不同？',
  53: '莫卧儿宫廷绘画为何融合多种传统？',
  54: '约1500年的美洲拥有哪些艺术世界？',
  55: '殖民扩张如何改变美洲的艺术？',
  56: '贝宁王国的金属艺术如何表现王权？',
  57: '浪漫主义为什么重视情感与自然？',
  58: '19世纪现实主义为什么要描绘普通人和日常劳动？', // added in v2.0
  59: '摄影出现后，绘画必须改变吗？',
  60: '印象派为什么一再描绘光线？',
  61: '后印象派画家为什么不再满足于描绘光线？', // added in v2.0
  62: '晚清艺术家怎样回应新的城市生活？',
  63: '19世纪美洲艺术如何塑造国家与自然形象？',
  64: '野兽派与表现主义为什么用强烈的色彩表达感受？', // added in v2.0
  65: '为什么画家开始拆解和重组世界？',
  66: '当画面不再描绘现实，抽象艺术还在表达什么？', // added in v2.0
  67: '一件普通物品为什么能够成为艺术？',
  68: '超现实主义画家为什么要画出梦境？', // added in v2.0
  69: '民国艺术家为什么争论中国画的未来？',
  70: '日本与朝鲜半岛如何面对艺术现代化？',
  71: '墨西哥壁画为什么具有公共力量？',
  72: '南亚艺术家怎样回应殖民时期的美术制度？',
  73: '摄影与美术学校如何改变殖民时期的视觉文化？',
  74: '战后艺术为什么突破既有绘画观念？',
  75: '战后欧洲画家为什么仍然坚持描绘人物？', // added in v2.0
  76: '波普艺术为什么把广告和商品变成绘画？', // added in v2.0
  77: '当作品变成行为、空间或观念时怎么办？',
  78: '历史、记忆与照片如何进入战后欧洲绘画？', // added in v2.0
  79: '中国当代艺术怎样回应历史与社会变化？',
  80: '日本与韩国当代艺术有哪些不同路径？',
  81: '两件当代作品如何讲述南亚与东南亚的城市和身份？',
  82: '非洲当代艺术怎样重新使用材料与传统？',
  83: '美洲艺术如何重新讲述身份与历史？',
};

// Syllabus v1.0 (73 courses) → v2.0 (83): where each v1.0 course went. Courses not listed (1–43, and 63) kept their
// numbers; the ten added courses (44, 46, 58, 61, 64, 66, 68, 75, 76, 78) have no v1.0 number. Nothing in the browser
// stores a course number (claims are kept by artwork id, reading places by article slug), so this is a record for the
// docs and tests, not a runtime migration.
export const v1ToV2: Record<number, number> = {
  44: 45, 45: 47, 46: 48, 47: 49, 48: 50, 49: 51, 50: 52, 51: 53,
  52: 54, 53: 55, 54: 56, 55: 57, 56: 59, 57: 60, 58: 65, 59: 67,
  60: 62, 61: 69, 62: 70, 64: 71, 65: 72, 66: 73, 67: 74, 68: 77,
  69: 79, 70: 80, 71: 81, 72: 82, 73: 83,
};

// Short introductions for the two stages that have built lessons. Not approved copy: shown on the page as sample text.
export const sampleIntro: Record<string, string> = {
  '01': '这一阶段不按年代排列。先学会看一件作品：画面怎样引导目光，肖像为什么不必像真人，艺术为什么不只是绘画，我们又凭什么说一件作品意味着什么。',
  '04': '大致对应公元 10 至 14 世纪前后。世界各地的艺术传统在这一时期各自走向成熟：中国的山水与陶瓷，欧洲的哥特式教堂，伊斯兰世界的建筑与装饰，南亚的寺庙与青铜神像，日本的绘卷，吴哥与蒲甘，伊费的头像。',
};
