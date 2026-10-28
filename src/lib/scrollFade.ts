// Content leaving the window settles back into the desk: as a block passes out over the top or bottom edge it dims and
// shrinks a little, and comes back as it returns. It is tied to the scroll position, not to a timer, so it follows the
// finger and reverses exactly. `presence` is the shared measure; the background light uses it too, so a work's glow
// fades with the work. With reduced motion only the dimming remains.
//
// A block is wholly present while it is wholly on screen, and fades only as the edge cuts it: by how much of it is still
// showing, out of its own height or, for a tall block (the story folder, the case board), out of a fixed stretch, so a
// tall panel stays clear until most of it has gone and never turns grey all over while its body is still in view.
export function presence(r: { top: number; bottom: number; height: number }, H = innerHeight) {
  if (!r.height) return 1;
  const showing = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
  const u = Math.min(1, showing / Math.min(r.height, Math.min(260, H * 0.3)));
  return u * u * (3 - 2 * u);
}

// `blocks` is a selector, read again on every frame, so blocks a page draws later (the collection's cabinets) fade too.
export function startScrollFade(blocks: string) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  const frame = () => {
    raf = 0;
    const H = innerHeight;
    for (const el of document.querySelectorAll<HTMLElement>(blocks)) {
      const r = el.getBoundingClientRect();
      if (!r.height) continue;
      const p = presence(r, H);
      el.style.opacity = p > 0.999 ? '' : (0.4 + 0.6 * p).toFixed(3);
      el.style.scale = p > 0.999 || still.matches ? '' : (0.97 + 0.03 * p).toFixed(4);
    }
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick);
  kick();
}
