import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { stages, courseTitles, v1ToV2, TOTAL_COURSES } from '../src/data/curriculum.ts';
import { publishedCards } from './published-cards.js';
import { COLLECTION_KEY, readCollection, collect } from '../src/lib/collection.js';
import { READING_KEY, PLACES_KEY, readReading, readPlaces, startingPlace, resolveEntry } from '../src/lib/reading.js';

// The 73-course syllabus v1.0 exactly as it stood before the 2026-10-28 revision (src/data/curriculum.ts at 73a4a4f).
const V1 = {
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
  30: '一座哥特式教堂为什么让人感到渺小？',
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
  44: '巴洛克艺术如何通过光影与空间感染观众？',
  45: '荷兰画家为什么热衷描绘日常生活？',
  46: '为什么18世纪艺术在优雅与庄严之间变化？',
  47: '日本茶室、庭园和屏风有什么审美联系？',
  48: '浮世绘为什么成为城市流行艺术？',
  49: '朝鲜王朝为什么重视白瓷与真景山水？',
  50: '奥斯曼与萨法维艺术有何不同？',
  51: '莫卧儿宫廷绘画为何融合多种传统？',
  52: '约1500年的美洲拥有哪些艺术世界？',
  53: '殖民扩张如何改变美洲的艺术？',
  54: '贝宁王国的金属艺术如何表现王权？',
  55: '浪漫主义为什么重视情感与自然？',
  56: '摄影出现后，绘画必须改变吗？',
  57: '印象派为什么一再描绘光线？',
  58: '为什么画家开始拆解和重组世界？',
  59: '一件普通物品为什么能够成为艺术？',
  60: '晚清艺术家怎样回应新的城市生活？',
  61: '民国艺术家为什么争论中国画的未来？',
  62: '日本与朝鲜半岛如何面对艺术现代化？',
  63: '19世纪美洲艺术如何塑造国家与自然形象？',
  64: '墨西哥壁画为什么具有公共力量？',
  65: '南亚艺术家怎样回应殖民时期的美术制度？',
  66: '摄影与美术学校如何改变殖民时期的视觉文化？',
  67: '战后艺术为什么突破既有绘画观念？',
  68: '当作品变成行为、空间或观念时怎么办？',
  69: '中国当代艺术怎样回应历史与社会变化？',
  70: '日本与韩国当代艺术有哪些不同路径？',
  71: '两件当代作品如何讲述南亚与东南亚的城市和身份？',
  72: '非洲当代艺术怎样重新使用材料与传统？',
  73: '美洲艺术如何重新讲述身份与历史？',
};
// The approved final numbering (Product Owner, 2026-10-28), written out independently of src/data/curriculum.ts:
// where every v1.0 course moved. Courses 1–43 and 63 keep their numbers. (A 79-course, seven-stage draft came between;
// it was never published, so nothing outside this repository ever saw its numbers.)
const EXPECTED = {
  44: 45, 45: 47, 46: 48, 47: 49, 48: 50, 49: 51, 50: 52, 51: 53, 52: 54, 53: 55, 54: 56,
  55: 57, 56: 59, 57: 60, 58: 65, 59: 67, 60: 62, 61: 69, 62: 70, 64: 71, 65: 72, 66: 73,
  67: 74, 68: 77, 69: 79, 70: 80, 71: 81, 72: 82, 73: 83,
};
// The ten added courses: six European painting courses (first added in the 79-course draft), then four more.
const ADDED = {
  44: '威尼斯画家为什么让色彩成为绘画的主角？', 46: '西班牙黄金时代的绘画为什么既逼真又虔诚？',
  58: '19世纪现实主义为什么要描绘普通人和日常劳动？', 61: '后印象派画家为什么不再满足于描绘光线？',
  64: '野兽派与表现主义为什么用强烈的色彩表达感受？', 68: '超现实主义画家为什么要画出梦境？',
  66: '当画面不再描绘现实，抽象艺术还在表达什么？', 75: '战后欧洲画家为什么仍然坚持描绘人物？',
  76: '波普艺术为什么把广告和商品变成绘画？', 78: '历史、记忆与照片如何进入战后欧洲绘画？',
};
const STAGES = [
  ['01', '学会欣赏艺术', 1, 5], ['02', '图像、仪式与早期文明', 6, 14], ['03', '信仰、图像与文化传播', 15, 25],
  ['04', '成熟艺术传统与新的视觉语言', 26, 37], ['05', '传统、宫廷、市场与全球交流', 38, 56],
  ['06', '19世纪：现实、光色与现代生活', 57, 63], ['07', '20世纪上半叶：现代主义与全球艺术转型', 64, 73],
  ['08', '战后艺术与全球当代世界', 74, 83],
];
const v2Of = (n) => v1ToV2[n] ?? n;

test('v2.0 numbers 1–83 once each, in eight contiguous stages of 5, 9, 11, 12, 19, 7, 10 and 10', () => {
  assert.equal(TOTAL_COURSES, 83);
  assert.deepEqual(Object.keys(courseTitles).map(Number).sort((a, b) => a - b), Array.from({ length: 83 }, (_, i) => i + 1));
  assert.deepEqual(stages.map((s) => [s.no, s.title, s.first, s.last]), STAGES);
  assert.deepEqual(stages.map((s) => s.last - s.first + 1), [5, 9, 11, 12, 19, 7, 10, 10]);
});

test('every v1.0 topic survives exactly once, at the approved number', () => {
  assert.deepEqual(v1ToV2, EXPECTED, 'the recorded mapping is the approved one');
  const targets = Object.keys(V1).map((n) => v2Of(Number(n)));
  assert.equal(new Set(targets).size, 73, 'no two old courses share a new number');
  for (const [n, title] of Object.entries(V1)) {
    assert.equal(courseTitles[v2Of(Number(n))], title, `v1 course ${n}`);
    assert.equal(Object.values(courseTitles).filter((t) => t === title).length, 1, `${title} appears once`);
  }
  for (let n = 1; n <= 43; n++) assert.equal(v2Of(n), n, `course ${n} keeps its number`);
});

test('the ten added courses have their approved numbers and titles, and are new topics', () => {
  const old = new Set(Object.values(V1));
  const targets = Object.keys(V1).map((n) => v2Of(Number(n)));
  for (const [n, title] of Object.entries(ADDED)) {
    assert.equal(courseTitles[n], title, `course ${n}`);
    assert.ok(!old.has(title), `course ${n} is a new topic`);
    assert.ok(!targets.includes(Number(n)), `no old course is mapped onto ${n}`);
  }
  assert.equal(83 - Object.keys(ADDED).length, 73);
});

// The published lessons and the v1.0 course each one was: 1–31, and the ukiyo-e lesson, which was course 48.
const PUBLISHED_V1 = { 'ukiyo-e-city-prints': 48 };
// The 32 lessons published at the migration (src/content/lessons at 66953d9). Later lessons may join them; none may go.
const PUBLISHED_AT_MIGRATION = [
  'ancient-american-visual-worlds', 'animal-faces-on-bronze', 'art-beyond-painting', 'borobudur-walking', 'brush-and-line',
  'buddha-image-formation', 'buddhism-korea-japan', 'byzantine-icons', 'early-chinese-jade-and-pottery', 'egypt-nubia-burials',
  'giotto-space', 'greek-ideal-body', 'guiding-the-eye', 'how-we-know-meaning', 'indus-evidence', 'maya-rulers-and-cities',
  'mesopotamian-gods-and-kings', 'mihrab-and-script', 'mountain-and-smallness', 'northern-song-landscape',
  'pacific-ancestors-and-waves', 'portraits-and-identity', 'roman-monuments', 'silk-road-buddhist-art', 'song-yuan-ceramics',
  'southern-song-corner', 'stone-and-light', 'telling-faith', 'tomb-worlds', 'ukiyo-e-city-prints', 'why-humans-made-images',
  'yuan-brush-and-antiquity',
];
test('every lesson published at the migration sits on its v1.0 topic, only the ukiyo-e lesson moved (48 → 50) and none claims an added course; later lessons sit on their v2.0 topic', () => {
  const dir = new URL('../src/content/lessons/', import.meta.url);
  const lessons = readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => {
    const text = readFileSync(new URL(f, dir), 'utf8');
    return { id: f.replace(/\.mdx$/, ''), course: Number(text.match(/^course: (\d+)\r?$/m)[1]), title: text.match(/^title: (.+?)\r?$/m)[1] };
  });
  assert.equal(PUBLISHED_AT_MIGRATION.length, 32);
  const ids = new Set(lessons.map((l) => l.id));
  for (const id of PUBLISHED_AT_MIGRATION) assert.ok(ids.has(id), `${id}, published at the migration, is still published`);
  assert.equal(new Set(lessons.map((l) => l.course)).size, lessons.length, 'no two lessons claim the same course');
  // Lessons written after the migration are numbered on the v2.0 syllabus from the start, added courses included.
  const migrated = new Set(PUBLISHED_AT_MIGRATION);
  for (const { id, course, title } of lessons.filter((l) => !migrated.has(l.id))) {
    assert.equal(title, courseTitles[course], `${id} carries the v2.0 title of course ${course}`);
  }
  for (const { id, course } of lessons.filter((l) => migrated.has(l.id))) {
    const was = PUBLISHED_V1[id] ?? course;
    assert.equal(course, v2Of(was), `${id}: v1 course ${was} is now ${v2Of(was)}`);
    assert.equal(courseTitles[course], V1[was], `${id} keeps its syllabus topic`);
    assert.ok(!(course in ADDED), `${id} is not on an added course`);
  }
  assert.equal(lessons.filter((l) => l.course <= 31).length, 31, 'courses 1–31 are all published and unmoved');
  assert.equal(lessons.find((l) => l.id === 'ukiyo-e-city-prints').course, 50);
  assert.equal(publishedCards().get('art-sharaku-oniji-001').course, 50, 'its card, still claimed by artwork id, is awarded by course 50 (No.048 on the 73-course site)');
});

// A browser that saved its state on the 73-course site: claims under artwork ids, the continue-reading entry and the
// per-article places under article slugs. Nothing in it is a course or card number, so it reads back whole.
test('browser state saved on the 73-course site is recovered unchanged under the A+ numbering', () => {
  const data = {
    [COLLECTION_KEY]: JSON.stringify({
      'art-fan-kuan-travelers-001': { at: '2026-10-26T10:00:00.000Z' },
      'art-chartres-cathedral-001': { at: '2026-10-26T11:00:00.000Z' },
      'art-osman-hamdi-tortoise-trainer-001': { at: '2026-10-27T09:00:00.000Z' }, // shown as No.074 before
    }),
    [READING_KEY]: JSON.stringify({ v: 1, kind: 'artist-story', id: 'osman-hamdi-bey', p: 0.42, at: '2026-10-27T09:30:00.000Z' }),
    [PLACES_KEY]: JSON.stringify({
      'lesson:stone-and-light': { p: 0.448, at: '2026-10-27T08:00:00.000Z' },
      'artist-story:osman-hamdi-bey': { p: 0.42, at: '2026-10-27T09:30:00.000Z' },
    }),
  };
  const storage = { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, removeItem: (k) => { delete data[k]; } };

  assert.deepEqual(Object.keys(readCollection(storage)).sort(),
    ['art-chartres-cathedral-001', 'art-fan-kuan-travelers-001', 'art-osman-hamdi-tortoise-trainer-001']);
  // The same claims under the A+ numbering (numbers are display only): No.001 stays, Chartres moves from No.030 to
  // No.042 after twelve extra cards in courses 4–25, and the artist card (No.074, later No.084, No.105 with the first
  // A+ cards) follows every course slot and extra card, wherever that ends.
  const cards = publishedCards();
  assert.equal(cards.get('art-fan-kuan-travelers-001').no, '001');
  assert.equal(cards.get('art-chartres-cathedral-001').no, '042');
  const extras = [...cards].filter(([id, c]) => c.series === 'core' && c.group[0] !== id).length;
  assert.equal(Number(cards.get('art-osman-hamdi-tortoise-trainer-001').no), TOTAL_COURSES + extras + 1);
  assert.ok(Number(cards.get('art-osman-hamdi-tortoise-trainer-001').no) > TOTAL_COURSES, 'artist numbers start after every course slot');
  // Claiming a card already held adds no second copy and keeps the original date.
  assert.equal(collect(storage, 'art-osman-hamdi-tortoise-trainer-001', '2026-10-28T00:00:00.000Z').added, false);
  assert.equal(readCollection(storage)['art-osman-hamdi-tortoise-trainer-001'].at, '2026-10-27T09:00:00.000Z');
  // Continue reading and the per-article places still resolve.
  const registry = { 'artist-story': { label: '艺术家故事', items: { 'osman-hamdi-bey': { title: 't', href: '/stories/osman-hamdi-bey/' } } } };
  assert.equal(resolveEntry(readReading(storage), registry).href, '/stories/osman-hamdi-bey/');
  assert.equal(Object.keys(readPlaces(storage)).length, 2);
  assert.equal(startingPlace(storage, 'lesson', 'stone-and-light'), 0.448);
});

test('no browser state is written under a course or card number', () => {
  for (const f of ['src/lib/collection.js', 'src/lib/reading.js', 'src/components/LessonComplete.astro', 'src/components/ReadingTracker.astro']) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    assert.doesNotMatch(src, /setItem\([^)]*\b(cardNumber|course)\b/, `${f} stores nothing under a number`);
  }
});
