// The desk's ground: a canvas laid just beneath the page's light canvas ([data-web]), fixed to the window, on which a
// drawing paints the whole ground from the base colour up, so the page's own background does not show through. The
// homepage draws its room on it (combined.ts) and the halls their quieter version (hall.ts); the background
// comparison on the dev server (src/lib/bgStudies/) draws its studies with it too.
// The drawing follows the scroll like a camera rather than locked to it: the scroll it is handed eases towards the
// page's, so a quick flick of the page glides the room into place instead of jumping it there.
export type RGB = [number, number, number];
export type Draw = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number, sy: number) => void;

export const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.max(0, a).toFixed(3)})`;
export const PAPER: RGB = [236, 235, 231];

export function startGround(web: HTMLCanvasElement, draw: Draw) {
  const ground = web.cloneNode() as HTMLCanvasElement;
  ground.removeAttribute('data-web');
  ground.style.opacity = '1';
  web.before(ground);
  const ctx = ground.getContext('2d')!;
  // The page's scroll, held inside the page: a phone's bounce past either end (scrollY below 0, or beyond the bottom)
  // would otherwise hand the drawings a scroll they were never made for.
  const scroll = () => Math.max(0, Math.min(scrollY, document.documentElement.scrollHeight - innerHeight));
  let W = 0, H = 0, raf = 0, eased = scroll(), last = 0;
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    ground.width = W * dpr; ground.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  // The camera: about a tenth of a second to close most of the way to the page's scroll; it keeps drawing until it lands.
  const frame = (t: number) => {
    raf = 0;
    const dt = last ? Math.min(64, t - last) : 16;
    last = t;
    const to = scroll();
    eased += (to - eased) * (1 - Math.exp(-dt / 110));
    if (Math.abs(to - eased) < 0.5) { eased = to; last = 0; } else kick();
    ctx.clearRect(0, 0, W, H);
    draw(ctx, W, H, t, eased);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  size();
  // Resizing a canvas empties it, and a phone resizes the window as its address bar comes and goes: redraw at once,
  // so the room is never shown blank for a frame.
  addEventListener('resize', () => { size(); ctx.clearRect(0, 0, W, H); draw(ctx, W, H, performance.now(), eased); kick(); });
  addEventListener('scroll', kick, { passive: true });
  kick();
}

// The homepage's desk, as the room is set out on it: a 1440 × 820 table, centred and scaled to fit the window
// (StudyTable.astro), its top on the page. A desktop room piece is placed in the desk's own units, so it keeps its
// place among the cards at any window size. Elsewhere (the halls) the same frame is taken from the window alone.
let frameCache: { at: number; W: number; H: number; f: { s: number; top: number } } | null = null;
export function deskFrame(W: number, H: number) {
  const now = performance.now();
  if (!frameCache || frameCache.W !== W || frameCache.H !== H || now - frameCache.at > 1000) {
    const st = document.querySelector<HTMLElement>('[data-st]'), table = pageRect(document.querySelector<HTMLElement>('.st-table'));
    const s = parseFloat(st ? getComputedStyle(st).getPropertyValue('--s') : '') || Math.min(1.25, W / 1440, (H - 56) / 820);
    frameCache = { at: now, W, H, f: { s, top: table ? table.y : 56 } };
  }
  const { s, top } = frameCache.f;
  return { s, X: (u: number) => W / 2 + (u - 720) * s, Y: (v: number) => top + v * s };
}

export type Rect = { x: number; y: number; w: number; h: number };
// An element's box on the page (offsets, so the scroll fade's movement does not shift it).
export function pageRect(el: HTMLElement | null): Rect | null {
  if (!el || !el.offsetWidth) return null;
  let x = 0, y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) { x += n.offsetLeft; y += n.offsetTop; }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

// A flat polygon.
export function poly(ctx: CanvasRenderingContext2D, pts: [number, number][], fill: string | CanvasGradient) {
  ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach((p) => ctx.lineTo(...p)); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
}
