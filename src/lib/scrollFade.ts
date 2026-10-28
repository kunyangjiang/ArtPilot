// Content leaving the window settles back into the desk: as a block nears the top or bottom edge it dims and shrinks a
// little, and comes back as it returns. It is tied to the scroll position, not to a timer, so it follows the finger and
// reverses exactly. `presence` is the shared measure (1 well inside the window, 0 at the edge); the background light
// uses it too, so a work's glow fades with the work. With reduced motion only the dimming remains.
// The zone at the foot is shallower than at the top, so the first screen arrives whole and only content leaving
// upwards fades over a longer stretch.
export function presence(r: { top: number; bottom: number; height: number }, H = innerHeight) {
  const top = Math.min(220, H * 0.28), foot = Math.min(140, H * 0.16);
  const u = Math.min(1, Math.max(0, r.bottom / top), Math.max(0, (H - r.top) / foot));
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
      el.style.opacity = p > 0.999 ? '' : (0.2 + 0.8 * p).toFixed(3);
      el.style.scale = p > 0.999 || still.matches ? '' : (0.95 + 0.05 * p).toFixed(4);
    }
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick);
  kick();
}
