// The place register for the site search: which city (and country) every artwork in the records is in, worked out
// from the institution its record names, so a reader can search a city — 华盛顿 — without knowing that the National
// Gallery of Art, the Library of Congress and the Smithsonian are there. Plain JS, so the tests can read it.
//
// A place lists the names a reader may type for it (`names`), its country (with the country's names), and the
// institutions or sites in it (`match`), each a piece of text as the records and the lessons write it. The longest
// piece wins where two overlap (旧金山现代艺术博物馆 before 现代艺术博物馆). An institution mentioned only in a lesson's
// text (弗利尔美术馆) belongs here too: searching its city then finds those lessons.
// tests/search.test.js fails when a record names an institution or a site that no place matches.

const US = ['美国', 'USA', 'United States', '美利坚'];
const UK = ['英国', 'UK', 'United Kingdom', 'Britain'];

export const places = [
  { id: 'washington', name: '华盛顿', country: '美国', names: ['华盛顿', 'Washington', '华府', 'D.C.', 'DC', '哥伦比亚特区'], countryNames: US,
    match: ['美国国家美术馆', '国会图书馆', '史密森尼', '弗利尔', '赛克勒', '赫希霍恩', '菲利普斯收藏', '国家儿童博物馆', '敦巴顿橡树园'] },
  { id: 'new-york', name: '纽约', country: '美国', names: ['纽约', 'New York', 'NYC', '曼哈顿'], countryNames: US,
    match: ['大都会艺术博物馆', '纽约现代艺术博物馆', '现代艺术博物馆', '美国民间艺术博物馆', '古根海姆', '惠特尼美国艺术博物馆', '布鲁克林博物馆'] },
  { id: 'san-francisco', name: '旧金山', country: '美国', names: ['旧金山', 'San Francisco', '三藩市'], countryNames: US, match: ['旧金山现代艺术博物馆', '旧金山亚洲艺术博物馆'] },
  { id: 'chicago', name: '芝加哥', country: '美国', names: ['芝加哥', 'Chicago'], countryNames: US, match: ['芝加哥艺术博物馆', '芝加哥艺术学院'] },
  { id: 'cleveland', name: '克利夫兰', country: '美国', names: ['克利夫兰', 'Cleveland'], countryNames: US, match: ['克利夫兰艺术博物馆'] },
  { id: 'kansas-city', name: '堪萨斯城', country: '美国', names: ['堪萨斯城', 'Kansas City'], countryNames: US, match: ['纳尔逊-阿特金斯艺术博物馆', '纳尔逊—阿特金斯'] },
  { id: 'baltimore', name: '巴尔的摩', country: '美国', names: ['巴尔的摩', 'Baltimore'], countryNames: US, match: ['沃尔特斯艺术博物馆'] },
  { id: 'des-moines', name: '德梅因', country: '美国', names: ['德梅因', 'Des Moines', '艾奥瓦'], countryNames: US, match: ['德梅因艺术中心'] },
  { id: 'minneapolis', name: '明尼阿波利斯', country: '美国', names: ['明尼阿波利斯', 'Minneapolis'], countryNames: US, match: ['沃克艺术中心'] },
  { id: 'boston', name: '波士顿', country: '美国', names: ['波士顿', 'Boston'], countryNames: US, match: ['波士顿美术馆'] },

  { id: 'london', name: '伦敦', country: '英国', names: ['伦敦', 'London'], countryNames: UK,
    match: ['大英博物馆', '泰特现代美术馆', '泰特美术馆', '泰特', '维多利亚与艾伯特博物馆', '英国国家美术馆', '伦敦国家美术馆'] },
  { id: 'surrey', name: '萨里郡', country: '英国', names: ['萨里', 'Surrey', '克兰登'], countryNames: UK, match: ['克兰登庄园'] },
  { id: 'paris', name: '巴黎', country: '法国', names: ['巴黎', 'Paris'], countryNames: ['法国', 'France'],
    match: ['卢浮宫', '奥赛博物馆', '蓬皮杜', '赛努奇博物馆', '吉美博物馆', '橘园美术馆'] },
  { id: 'chartres', name: '沙特尔', country: '法国', names: ['沙特尔', 'Chartres'], countryNames: ['法国', 'France'], match: ['沙特尔'] },
  { id: 'conques', name: '孔克', country: '法国', names: ['孔克', 'Conques'], countryNames: ['法国', 'France'], match: ['孔克'] },
  { id: 'dijon', name: '第戎', country: '法国', names: ['第戎', 'Dijon'], countryNames: ['法国', 'France'], match: ['第戎美术馆'] },
  { id: 'amsterdam', name: '阿姆斯特丹', country: '荷兰', names: ['阿姆斯特丹', 'Amsterdam'], countryNames: ['荷兰', 'Netherlands'],
    match: ['荷兰国立博物馆', '阿姆斯特丹国立博物馆', '阿姆斯特丹世界博物馆', '梵高博物馆'] },
  { id: 'the-hague', name: '海牙', country: '荷兰', names: ['海牙', 'The Hague', 'Den Haag'], countryNames: ['荷兰', 'Netherlands'], match: ['海牙美术馆', '莫瑞泰斯'] },
  { id: 'madrid', name: '马德里', country: '西班牙', names: ['马德里', 'Madrid'], countryNames: ['西班牙', 'Spain'], match: ['普拉多博物馆', '索菲亚王后国家艺术中心'] },
  { id: 'granada', name: '格拉纳达', country: '西班牙', names: ['格拉纳达', 'Granada'], countryNames: ['西班牙', 'Spain'], match: ['阿尔罕布拉'] },
  { id: 'barcelona', name: '巴塞罗那', country: '西班牙', names: ['巴塞罗那', 'Barcelona'], countryNames: ['西班牙', 'Spain'], match: ['巴塞罗那'] },
  { id: 'santillana', name: '桑蒂利亚纳德尔马尔', country: '西班牙', names: ['桑蒂利亚纳', '坎塔布里亚', 'Altamira'], countryNames: ['西班牙', 'Spain'], match: ['阿尔塔米拉洞穴'] },
  { id: 'rome', name: '罗马', country: '意大利', names: ['罗马', 'Rome', 'Roma'], countryNames: ['意大利', 'Italy'], match: ['罗马圣路易吉教堂', '战神广场', '梵蒂冈', '西斯廷'] },
  { id: 'florence', name: '佛罗伦萨', country: '意大利', names: ['佛罗伦萨', 'Florence', '翡冷翠'], countryNames: ['意大利', 'Italy'], match: ['乌菲齐美术馆', '佛罗伦萨学院美术馆'] },
  { id: 'padua', name: '帕多瓦', country: '意大利', names: ['帕多瓦', 'Padua', 'Padova'], countryNames: ['意大利', 'Italy'], match: ['斯克罗维尼礼拜堂'] },
  { id: 'hamburg', name: '汉堡', country: '德国', names: ['汉堡', 'Hamburg'], countryNames: ['德国', 'Germany'], match: ['汉堡美术馆'] },
  { id: 'berlin', name: '柏林', country: '德国', names: ['柏林', 'Berlin'], countryNames: ['德国', 'Germany'], match: ['柏林国家博物馆', '柏林民族学博物馆'] },
  { id: 'vladslo', name: '弗拉兹洛', country: '比利时', names: ['弗拉兹洛', 'Vladslo'], countryNames: ['比利时', 'Belgium'], match: ['弗拉兹洛德国士兵公墓'] },
  { id: 'moscow', name: '莫斯科', country: '俄罗斯', names: ['莫斯科', 'Moscow'], countryNames: ['俄罗斯', 'Russia'], match: ['特列季亚科夫画廊'] },
  { id: 'istanbul', name: '伊斯坦布尔', country: '土耳其', names: ['伊斯坦布尔', 'Istanbul'], countryNames: ['土耳其', 'Türkiye', 'Turkey'], match: ['佩拉博物馆'] },

  { id: 'taipei', name: '台北', country: '中国', names: ['台北', 'Taipei'], countryNames: ['中国', '台湾'], match: ['国立故宫博物院', '台北故宫博物院', '台北故宫'] },
  { id: 'beijing', name: '北京', country: '中国', names: ['北京', 'Beijing'], countryNames: ['中国'], match: ['北京故宫博物院', '故宫博物院', '中国国家博物馆'] },
  { id: 'changsha', name: '长沙', country: '中国', names: ['长沙', 'Changsha', '湖南'], countryNames: ['中国'], match: ['湖南博物院', '湖南省博物馆'] },
  { id: 'datong', name: '大同', country: '中国', names: ['大同', 'Datong', '山西'], countryNames: ['中国'], match: ['云冈石窟'] },
  { id: 'hong-kong', name: '香港', country: '中国', names: ['香港', 'Hong Kong'], countryNames: ['中国'], match: ['M+ 博物馆', 'M+'] },
  { id: 'seoul', name: '首尔', country: '韩国', names: ['首尔', 'Seoul', '汉城'], countryNames: ['韩国', 'Korea'], match: ['国立中央博物馆', '国立古宫博物馆'] },
  { id: 'iksan', name: '益山', country: '韩国', names: ['益山', 'Iksan'], countryNames: ['韩国', 'Korea'], match: ['国立益山博物馆'] },
  { id: 'tokyo', name: '东京', country: '日本', names: ['东京', 'Tokyo'], countryNames: ['日本', 'Japan'], match: ['东京国立博物馆'] },
  { id: 'nara', name: '奈良', country: '日本', names: ['奈良', 'Nara', '斑鸠'], countryNames: ['日本', 'Japan'], match: ['法隆寺'] },
  { id: 'inuyama', name: '犬山', country: '日本', names: ['犬山', 'Inuyama', '爱知'], countryNames: ['日本', 'Japan'], match: ['有乐苑'] },
  { id: 'kolkata', name: '加尔各答', country: '印度', names: ['加尔各答', 'Kolkata', 'Calcutta'], countryNames: ['印度', 'India'], match: ['加尔各答维多利亚纪念馆'] },
  { id: 'thanjavur', name: '坦贾武尔', country: '印度', names: ['坦贾武尔', 'Thanjavur'], countryNames: ['印度', 'India'], match: ['坦贾武尔'] },
  { id: 'siem-reap', name: '暹粒', country: '柬埔寨', names: ['暹粒', 'Siem Reap', '吴哥'], countryNames: ['柬埔寨', 'Cambodia'], match: ['吴哥'] },
  { id: 'magelang', name: '马格朗', country: '印度尼西亚', names: ['马格朗', 'Magelang', '中爪哇'], countryNames: ['印度尼西亚', '印尼', 'Indonesia'], match: ['克杜盆地', '婆罗浮屠'] },

  { id: 'mexico-city', name: '墨西哥城', country: '墨西哥', names: ['墨西哥城', 'Mexico City'], countryNames: ['墨西哥', 'Mexico'], match: ['墨西哥城国家艺术博物馆', '国家人类学博物馆'] },
  { id: 'xalapa', name: '哈拉帕（墨西哥）', country: '墨西哥', names: ['Xalapa', '韦拉克鲁斯'], countryNames: ['墨西哥', 'Mexico'], match: ['哈拉帕人类学博物馆'] },
  { id: 'guadalajara', name: '瓜达拉哈拉', country: '墨西哥', names: ['瓜达拉哈拉', 'Guadalajara'], countryNames: ['墨西哥', 'Mexico'], match: ['卡瓦尼亚斯'] },
  { id: 'bonampak', name: '博南帕克', country: '墨西哥', names: ['博南帕克', 'Bonampak', '恰帕斯'], countryNames: ['墨西哥', 'Mexico'], match: ['博南帕克考古区'] },
  { id: 'sao-paulo', name: '圣保罗', country: '巴西', names: ['圣保罗', 'São Paulo', 'Sao Paulo'], countryNames: ['巴西', 'Brazil'], match: ['圣保罗大学保利斯塔博物馆', '伊皮兰加博物馆'] },
  { id: 'chavin', name: '查文德万塔尔', country: '秘鲁', names: ['查文', 'Chavín', 'Chavin', '安卡什'], countryNames: ['秘鲁', 'Peru'], match: ['查文德万塔尔'] },
  { id: 'benin-city', name: '贝宁城', country: '尼日利亚', names: ['贝宁城', 'Benin City'], countryNames: ['尼日利亚', 'Nigeria'], match: [] },
  { id: 'online', name: '网络', country: '', names: ['网络', '网上', 'online'], countryNames: [], match: [] },
];

// Where a record's text cannot say it plainly: a work that has left the museum it names, an original that is lost, a
// temporary or online work. Roles: held 现藏, site 原址/所在地, former 曾藏, copy 复制件藏, unknown 现藏地不明.
export const placeOverrides = {
  'art-benin-plaque-82-5-3-001': [{ place: 'benin-city', role: 'held', by: '贝宁奥巴与尼日利亚国家博物馆和纪念物委员会' },
    { place: 'washington', role: 'former', by: '史密森尼国立非洲艺术博物馆（1982—2022）' }],
  'art-duchamp-fountain-001': [{ place: 'london', role: 'copy', by: '泰特美术馆（1964 年复制件）' }, { place: 'san-francisco', role: 'copy', by: '旧金山现代艺术博物馆（1964 年复制件）' }],
  'art-eliasson-weather-project-001': [{ place: 'london', role: 'site', by: '泰特现代美术馆涡轮大厅（临时作品，已拆除）' }],
  'art-lialina-boyfriend-war-001': [{ place: 'online', role: 'site', by: '艺术家的网站' }],
  'art-xu-beihong-yuanwen-001': [],
};

export const ROLE_LABEL = { held: '现藏', site: '所在地', former: '曾藏', copy: '复制件藏', unknown: '现藏地不明' };

const byId = new Map(places.map((p) => [p.id, p]));
// Every institution or site name, longest first, so a longer name claims its text before a shorter one inside it.
const pieces = places.flatMap((p) => p.match.map((m) => ({ m, p }))).sort((a, b) => b.m.length - a.m.length);

/** The places a piece of text names, each with the institution text that placed it. */
export function placesIn(text) {
  let rest = text ?? '';
  const found = [];
  for (const { m, p } of pieces) {
    const i = rest.indexOf(m);
    if (i < 0) continue;
    rest = rest.slice(0, i) + '\u0000'.repeat(m.length) + rest.slice(i + m.length);
    if (!found.some((f) => f.place === p.id)) found.push({ place: p.id, by: m });
  }
  return found;
}

/** Where an artwork is: [{ place, role, by }] from its record (collection, or location for a building or a site). */
export function placesOfArtwork(id, data) {
  if (id in placeOverrides) return placeOverrides[id];
  const text = data.collection ?? data.location ?? '';
  const role = data.kind === 'building' || /原址/.test(text) ? 'site' : 'held';
  // A site as the record describes it (to its first semicolon); an institution as the record names it, the text
  // before its first comma (object numbers and gifts follow), without its city: 华盛顿美国国家美术馆 and
  // 美国国家美术馆（华盛顿） are one museum, and the place is shown beside it anyway.
  return placesIn(text).map((f) => {
    const p = byId.get(f.place);
    const parts = splitOutside(text, role === 'site' ? '；;' : '，；;');
    if (role === 'site') return { place: f.place, role, by: parts[0] };
    const cities = [p.name, ...p.names];
    // 马德里，索菲亚王后国家艺术中心博物馆: the city stands first on its own.
    let by = cities.includes(parts[0]) && parts[1] ? parts[1] : parts[0];
    by = by.replace(/（([^）]*)）/g, (all, inner) => ([...cities, p.country].some((n) => n && inner.includes(n)) ? '' : all));
    // 纽约大都会艺术博物馆 → 大都会艺术博物馆, but 克利夫兰艺术博物馆 stays whole: drop the city only before a known name.
    for (const n of cities) {
      if (by.startsWith(n) && p.match.some((m) => by.slice(n.length).startsWith(m))) by = by.slice(n.length);
    }
    return { place: f.place, role, by: by.trim() };
  });
}

// Text split at the given marks where they stand outside （…） and (…).
function splitOutside(text, marks) {
  const out = [];
  let depth = 0, cur = '';
  for (const c of text) {
    if (c === '（' || c === '(') depth++;
    else if ((c === '）' || c === ')') && depth) depth--;
    if (!depth && marks.includes(c)) { out.push(cur.trim()); cur = ''; } else cur += c;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}

export const placeById = (id) => byId.get(id);
