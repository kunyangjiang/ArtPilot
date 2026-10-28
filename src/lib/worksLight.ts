// The homepage's background, "light from the works" (作品之光): each work on the desk gives off a soft glow of its own
// colour onto the dark surface around it (the colour is read from the image itself), and the whole desk takes on a
// faint wash of the works in view, so scrolling from the prints to the Osman Hamdi folder to the Chartres board slowly changes the room's
// light. Pointing at (or tapping) a work brightens its glow. Each glow is the blurred shadow of the work's own box, so it
// hugs the print, folder or board; a work near the edge of the window dims and its light fades with it. The colours
// come from whichever prints the day deals onto the desk, so the light changes with them. The canvas is drawn at half
// resolution and redraws only on scroll, resize or a change.
import { presence } from './scrollFade';

type RGB = [number, number, number];
type Source = { el: HTMLElement; imgs: HTMLImageElement[]; tones: (RGB | null)[]; rgb: RGB; lift: number; target: number };

const PAPER: RGB = [236, 226, 205];
const K = 2;

// The image's characteristic colour: the average of its pixels weighted towards the saturated ones (so a bronze reads
// as its verdigris, not as grey), then set to one brightness so every work glows about as strongly.
function toneOf(img: HTMLImageElement): RGB | null {
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

export function startWorksLight(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  // The prints, the story folder and the case board; the folder and board glow with the mean of their images' tones.
  const els = [...document.querySelectorAll<HTMLElement>('[data-slot] [data-print], .st-folder, .st-board')];
  const sources: Source[] = els.map((el) => {
    const imgs = [...el.querySelectorAll('img')];
    return { el, imgs, tones: imgs.map(() => null), rgb: PAPER, lift: 0, target: 0 };
  });
  let wash: RGB = [...PAPER] as RGB, W = 0, H = 0, raf = 0, last = 0;

  const read = (s: Source) => s.imgs.forEach((img, i) => {
    const take = () => {
      s.tones[i] = toneOf(img);
      const got = s.tones.filter(Boolean) as RGB[];
      if (got.length) { s.rgb = [0, 1, 2].map((c) => got.reduce((a, t) => a + t[c], 0) / got.length) as RGB; kick(); }
    };
    if (img.complete && img.naturalWidth) take(); else img.addEventListener('load', take, { once: true });
  });
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
      const seen = presence(box, H) * Math.max(0, Math.min(box.bottom, H) - Math.max(box.top, 0)) * Math.max(0, Math.min(box.right, W) - Math.max(box.left, 0));
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
    room.addColorStop(0, rgba(wash, 0.12)); room.addColorStop(1, rgba(wash, 0.035));
    ctx.fillStyle = room; ctx.fillRect(0, 0, W, H);
    // A glow is the shadow of the box drawn far off-canvas and shifted back, so only the soft halo lands on the desk.
    const off = 4 * Math.max(W, H);
    sources.forEach((s, i) => {
      const box = boxes[i];
      // The folder and board cast deep shadows of their own, so their light reaches further and stronger to show past them.
      const big = box.width * box.height > 200000;
      const blur = (big ? 170 : 70) + Math.min(box.width, box.height) * 0.26 + 36 * s.lift;
      if (box.bottom < -blur * 2 || box.top > H + blur * 2) return;
      // A work near the edge of the window is dimmed and settling back (src/lib/scrollFade.ts); its light fades with it.
      ctx.shadowColor = rgba(s.rgb, ((big ? 0.85 : 0.55) + 0.35 * s.lift) * presence(box, H));
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

  sources.forEach((s) => {
    read(s);
    s.el.addEventListener('pointerenter', () => { s.target = 1; kick(); });
    s.el.addEventListener('pointerleave', () => { s.target = 0; kick(); });
    s.el.addEventListener('focusin', () => { s.target = 1; kick(); });
    s.el.addEventListener('focusout', () => { s.target = 0; kick(); });
  });
  // The phone's pile moves under the finger without the page scrolling.
  document.querySelector('[data-deck]')?.addEventListener('st-deck-move', kick);
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => { size(); kick(); });
  size(); kick();
}
