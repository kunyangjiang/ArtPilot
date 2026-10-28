// The site's background, "light from the works" (作品之光): each work on the page gives off a soft glow of its own
// colour onto the dark ground around it (the colour is read from the image itself), and the whole room takes on a faint
// wash of the works in view, so scrolling down a page slowly changes its light. Pointing at (or tapping) a work
// brightens its glow. Each glow is the blurred shadow of the work's own box, so it hugs the print, card, folder or
// board; a work near the edge of the window dims and its light fades with it (src/lib/scrollFade.ts).
//
// A page names its works with a selector: on the homepage the prints the day deals onto the desk, the story folder and
// the case board; in the halls each article's picture; in the catalogue each stage's prints; in the collection only the
// cards this browser holds. The selector is read again whenever the page changes, so works drawn later (the
// collection's cabinets and cards) light up as they appear. The canvas is drawn at half resolution and redraws only on
// scroll, resize or a change.
import { presence } from './scrollFade';

type RGB = [number, number, number];
// `lit` turns true once a tone has been read: a work with no picture (an empty plate) gives no light.
type Source = { el: HTMLElement; rgb: RGB; lit: boolean; lift: number; target: number };

const PAPER: RGB = [236, 226, 205];
const K = 2;

export const HOME_WORKS = '[data-slot] [data-print], .st-folder, .st-board';

// The image's characteristic colour: the average of its pixels weighted towards the saturated ones (so a bronze reads
// as its verdigris, not as grey), then set to one brightness so every work glows about as strongly. Kept per image
// address, since the collection shows the same card in several places.
const tones = new Map<string, RGB | null>();
function toneOf(img: HTMLImageElement): RGB | null {
  const key = img.currentSrc || img.src;
  if (!tones.has(key)) tones.set(key, readTone(img));
  return tones.get(key)!;
}
function readTone(img: HTMLImageElement): RGB | null {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  try {
    x.drawImage(img, 0, 0, 32, 32);
    const d = x.getImageData(0, 0, 32, 32).data;
    let r = 0, g = 0, b = 0, w = 0;
    for (let i = 0; i < d.length; i += 4) {
      const hi = Math.max(d[i], d[i + 1], d[i + 2]), lo = Math.min(d[i], d[i + 1], d[i + 2]);
      const s = hi ? (hi - lo) / hi : 0, mid = 1 - Math.abs(hi / 255 - 0.55);
      const k = s * s * mid + 0.01;
      r += d[i] * k; g += d[i + 1] * k; b += d[i + 2] * k; w += k;
    }
    return settle([r / w, g / w, b / w]);
  } catch { return null; }
}
function settle([r, g, b]: RGB): RGB {
  r /= 255; g /= 255; b /= 255;
  const hi = Math.max(r, g, b), lo = Math.min(r, g, b), l = (hi + lo) / 2;
  let h = 0, s = hi === lo ? 0 : (hi - lo) / (1 - Math.abs(2 * l - 1));
  if (hi !== lo) h = hi === r ? ((g - b) / (hi - lo)) % 6 : hi === g ? (b - r) / (hi - lo) + 2 : (r - g) / (hi - lo) + 4;
  s = Math.min(0.75, Math.max(0.3, s * 1.25));
  const L = 0.56, C = (1 - Math.abs(2 * L - 1)) * s, X = C * (1 - Math.abs((h % 2) - 1)), m = L - C / 2;
  const [a, b2, c] = h < 1 ? [C, X, 0] : h < 2 ? [X, C, 0] : h < 3 ? [0, C, X] : h < 4 ? [0, X, C] : h < 5 ? [X, 0, C] : [C, 0, X];
  return [(a + m) * 255, (b2 + m) * 255, (c + m) * 255].map(Math.round) as RGB;
}

export function startWorksLight(canvas: HTMLCanvasElement, works = HOME_WORKS) {
  const ctx = canvas.getContext('2d')!;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let sources: Source[] = [];
  const known = new WeakMap<HTMLElement, Source>();
  let wash: RGB = [...PAPER] as RGB, W = 0, H = 0, raf = 0, last = 0;

  // A work glows with the mean tone of its images (a folder or board holds several), each read once it has loaded.
  const read = (s: Source) => {
    const imgs = [...s.el.querySelectorAll('img')];
    const take = () => {
      const got = imgs.filter((i) => i.complete && i.naturalWidth).map(toneOf).filter(Boolean) as RGB[];
      if (got.length) { s.rgb = [0, 1, 2].map((c) => got.reduce((a, t) => a + t[c], 0) / got.length) as RGB; s.lit = true; kick(); }
    };
    imgs.forEach((i) => { if (!(i.complete && i.naturalWidth)) i.addEventListener('load', take, { once: true }); });
    take();
  };
  // The page's works as they are now: ones seen before keep their tone and their light.
  const collect = () => {
    sources = [...document.querySelectorAll<HTMLElement>(works)].map((el) => {
      let s = known.get(el);
      if (!s) {
        s = { el, rgb: PAPER, lit: false, lift: 0, target: 0 };
        known.set(el, s);
        const on = () => { s!.target = 1; kick(); }, off = () => { s!.target = 0; kick(); };
        el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', off);
        el.addEventListener('focusin', on); el.addEventListener('focusout', off);
        read(s);
      }
      return s;
    });
    kick();
  };
  const size = () => {
    W = innerWidth; H = innerHeight;
    canvas.width = Math.ceil(W / K); canvas.height = Math.ceil(H / K);
    ctx.setTransform(1 / K, 0, 0, 1 / K, 0, 0);
  };

  const frame = (t: number) => {
    const dt = last ? Math.min(64, t - last) : 16; last = t;
    const k = still.matches ? 1 : Math.min(1, dt / 160);
    let moving = false;
    // The room's wash: the colours of the works in view, weighted by how much of each shows.
    let r = 0, g = 0, b = 0, w = 0;
    const boxes = sources.map((s) => {
      s.lift += (s.target - s.lift) * k;
      if (Math.abs(s.target - s.lift) > 0.01) moving = true; else s.lift = s.target;
      const box = s.el.getBoundingClientRect();
      const seen = (s.lit ? presence(box, H) : 0) * Math.max(0, Math.min(box.bottom, H) - Math.max(box.top, 0)) * Math.max(0, Math.min(box.right, W) - Math.max(box.left, 0));
      r += s.rgb[0] * seen; g += s.rgb[1] * seen; b += s.rgb[2] * seen; w += seen;
      return box;
    });
    if (w) {
      const aim: RGB = [r / w, g / w, b / w], q = still.matches ? 1 : Math.min(1, dt / 700);
      wash = wash.map((v, i) => v + (aim[i] - v) * q) as RGB;
      if (wash.some((v, i) => Math.abs(aim[i] - v) > 0.6)) moving = true;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;
    const room = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, Math.hypot(W, H) * 0.62);
    room.addColorStop(0, rgba(wash, 0.095)); room.addColorStop(1, rgba(wash, 0.027));
    ctx.fillStyle = room; ctx.fillRect(0, 0, W, H);
    // A glow is the shadow of the box drawn far off-canvas and shifted back, so only the soft halo lands on the desk.
    const off = 4 * Math.max(W, H);
    sources.forEach((s, i) => {
      const box = boxes[i];
      if (!s.lit || !box.width || !box.height) return;
      // The folder and board cast deep shadows of their own, so their light reaches further and stronger to show past them.
      const big = box.width * box.height > 200000;
      const blur = (big ? 155 : 60) + Math.min(box.width, box.height) * 0.24 + 32 * s.lift;
      if (box.bottom < -blur * 2 || box.top > H + blur * 2) return;
      // A work near the edge of the window is dimmed and settling back (src/lib/scrollFade.ts); its light fades with it.
      ctx.shadowColor = rgba(s.rgb, ((big ? 0.72 : 0.44) + 0.3 * s.lift) * presence(box, H));
      ctx.shadowBlur = blur / K;
      ctx.shadowOffsetX = off / K;
      ctx.fillStyle = '#000';
      ctx.fillRect(box.left - off, box.top, box.width, box.height);
    });
    ctx.shadowColor = 'transparent';
    raf = moving ? requestAnimationFrame(frame) : 0;
    if (!raf) last = 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  // Works drawn or shown later (the collection's views) are picked up on the next frame after the page changes.
  let pending = 0;
  new MutationObserver(() => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; collect(); }); })
    .observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
  // The phone's pile moves under the finger without the page scrolling.
  document.querySelector('[data-deck]')?.addEventListener('st-deck-move', kick);
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => { size(); kick(); });
  size(); collect();
}
