// Images new in Phase 4.1A (preview only), with their rights. Loaded by the preview route only when previews are
// enabled, so a normal production build neither renders nor emits them.
import hokusaiWave from '../../assets/preview/hokusai-wave.jpg';
import cholaNataraja from '../../assets/preview/chola-nataraja.jpg';

export const previewImages = {
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

export type PreviewImages = typeof previewImages;
