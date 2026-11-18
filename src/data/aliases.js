// Names a reader may type for the same artist, for the site search (src/lib/search.js): the spellings ArtPilot does
// not use but readers do (凡高 for 梵高), and the Latin names. Searching any name in a group finds the others.
// The index adds more groups at build time from the artwork records' "中文名（Latin Name）" artist lines
// (src/pages/search-index.json.ts), so a Latin name in a record never has to be repeated here.
export const aliasGroups = [
  ['梵高', '凡高', '梵谷', 'van gogh'],
  ['莫奈', '莫内', 'monet'],
  ['达·芬奇', '达芬奇', '达文西', 'leonardo', 'da vinci'],
  ['米开朗基罗', '米开朗琪罗', '米开朗其罗', 'michelangelo'],
  ['伦勃朗', '林布兰', 'rembrandt'],
  ['毕加索', '毕卡索', 'picasso'],
  ['拉斐尔', '拉菲尔', 'raphael'],
  ['雷诺阿', '雷诺瓦', 'renoir'],
  ['维米尔', '弗美尔', '维梅尔', 'vermeer'],
  ['丢勒', '杜勒', 'dürer', 'durer'],
  ['葛饰北斋', '北斋', 'hokusai'],
  ['歌川广重', '安藤广重', 'hiroshige'],
  ['喜多川歌麿', '歌麿', 'utamaro'],
  ['克里姆特', '克林姆', '克林姆特', 'klimt'],
  ['蒙克', 'munch'],
  ['波提切利', '波提切里', 'botticelli'],
  ['提香', 'titian', 'tiziano'],
  ['委拉斯开兹', '委拉斯凯兹', '维拉斯奎兹', 'velázquez', 'velazquez'],
  ['戈雅', '哥雅', 'goya'],
  ['透纳', '特纳', 'turner'],
  ['修拉', 'seurat'],
  ['马奈', 'manet'],
  ['沃霍尔', '华荷', 'warhol'],
  ['波洛克', '波拉克', 'pollock'],
  ['草间弥生', 'kusama'],
];

/**
 * Groups from artist lines like "克劳德·莫奈（Claude Monet）": the full Chinese name, its last part (莫奈), the name
 * without its dots (克劳德莫奈) and the Latin name. A Chinese, Japanese or Korean name (no dot) keeps only its full
 * forms: its romanised parts (Kuan, Hui) are too short to stand alone.
 */
export function aliasesFromArtist(line) {
  const m = /^([㐀-鿿·\-]+)（([A-Za-zÀ-ÿ' .\-]+)）$/.exec((line ?? '').trim());
  if (!m) return null;
  const [, zh, la] = m;
  const group = new Set([zh, la.toLowerCase()]);
  if (zh.includes('·')) {
    group.add(zh.split('·').at(-1));
    group.add(zh.replace(/·/g, ''));
    const last = la.trim().split(/\s+/).at(-1);
    if (last.length >= 4) group.add(last.toLowerCase());
  }
  return [...group].filter((s) => s.length >= 2);
}
