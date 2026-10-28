// Phones: today's prints as a sprung carousel instead of a scroll-snapped row. A print follows the finger, with a
// slight magnetic pull towards the nearest resting place and a rubber-band give past either end; let go, and the
// flick's speed decides how far it travels, then a lightly underdamped spring settles it there (a small overshoot,
// then still). Prints away from the middle sit a little smaller and dimmer. Vertical swipes are left to the page.
// Each change of the print in the middle is reported, and every frame of motion is announced on the deck as
// `st-deck-move` (the background light follows the prints). With reduced motion a print moves straight to its place.
const STIFF = 210, DAMP = 20, MAGNET = 0.12, BAND = 0.35;

export function startDeck(deck: HTMLElement, narrow: MediaQueryList, onIndex: (k: number) => void) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const slots = [...deck.querySelectorAll<HTMLElement>('[data-slot]')].filter((s) => s.querySelector('[data-print]'));
  if (slots.length < 2) return;
  let x = 0, v = 0, target = 0, index = 0, raf = 0, last = 0;
  let drag: { id: number; x0: number; y0: number; from: number; on: boolean; samples: [number, number][] } | null = null;
  let moved = false;
  const step = () => slots[1].offsetLeft - slots[0].offsetLeft;
  const min = () => -(slots.length - 1) * step();

  const render = () => {
    const s = step(), mid = -x / s;
    slots.forEach((el, k) => {
      const d = Math.min(1, Math.abs(k - mid));
      el.style.translate = `${x}px 0`;
      el.style.scale = String(1 - 0.08 * d);
      el.style.opacity = String(1 - 0.3 * d);
    });
    const k = Math.max(0, Math.min(slots.length - 1, Math.round(mid)));
    if (k !== index) { index = k; onIndex(k); }
    deck.dispatchEvent(new Event('st-deck-move'));
  };
  const clear = () => slots.forEach((el) => { el.style.translate = el.style.scale = el.style.opacity = ''; });

  // The spring, integrated in small steps so a slow frame cannot make it jump.
  const frame = (t: number) => {
    let dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60; last = t;
    while (dt > 0) {
      const h = Math.min(dt, 1 / 120);
      v += (-STIFF * (x - target) - DAMP * v) * h; x += v * h; dt -= h;
    }
    const done = Math.abs(x - target) < 0.3 && Math.abs(v) < 4;
    if (done) { x = target; v = 0; }
    render();
    raf = done ? 0 : requestAnimationFrame(frame);
    if (!raf) last = 0;
  };
  const go = (k: number, speed = 0) => {
    target = -Math.max(0, Math.min(slots.length - 1, k)) * step();
    v = speed;
    if (still.matches) { x = target; v = 0; render(); return; }
    if (!raf) raf = requestAnimationFrame(frame);
  };

  deck.addEventListener('pointerdown', (e) => {
    if (!narrow.matches || (e.pointerType === 'mouse' && e.button !== 0)) return;
    cancelAnimationFrame(raf); raf = 0; last = 0;
    drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, from: x, on: false, samples: [[e.timeStamp, e.clientX]] };
    moved = false;
  });
  deck.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    if (!drag.on) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { drag = null; go(Math.round(-x / step())); return; }
      if (Math.abs(dx) < 8) return;
      drag.on = moved = true;
      deck.setPointerCapture(e.pointerId);
    }
    drag.samples.push([e.timeStamp, e.clientX]);
    while (drag.samples.length > 2 && e.timeStamp - drag.samples[0][0] > 100) drag.samples.shift();
    // Follow the finger, give past the ends, and lean towards the nearest resting place.
    let raw = drag.from + dx;
    const lo = min();
    if (raw > 0) raw *= BAND; else if (raw < lo) raw = lo + (raw - lo) * BAND;
    const snap = Math.round(-raw / step()) * -step();
    x = raw + (snap - raw) * MAGNET;
    render();
  });
  const release = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    const was = drag; drag = null;
    if (!was.on) return;
    const [t0, x0] = was.samples[0], [t1, x1] = was.samples[was.samples.length - 1];
    const speed = t1 > t0 ? ((x1 - x0) / (t1 - t0)) * 1000 : 0;
    // Where the flick would carry the pile, at most two prints on from the one it started on.
    const from = Math.round(-was.from / step()), aim = Math.round(-(x + speed * 0.18) / step());
    go(Math.max(from - 2, Math.min(from + 2, aim)), speed);
  };
  deck.addEventListener('pointerup', release);
  deck.addEventListener('pointercancel', release);
  // A drag is not a tap: the print under the finger does not open.
  deck.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  // Keyboard: a focused print comes to the middle.
  deck.addEventListener('focusin', (e) => {
    if (!narrow.matches) return;
    const k = slots.findIndex((s) => s.contains(e.target as Node));
    if (k >= 0) go(k);
  });
  narrow.addEventListener('change', () => { cancelAnimationFrame(raf); raf = 0; x = v = target = 0; if (narrow.matches) render(); else clear(); });
  addEventListener('resize', () => { if (narrow.matches) { x = target = -index * step(); render(); } });
  if (narrow.matches) render();
}
