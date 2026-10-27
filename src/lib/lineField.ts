// The line network drawn behind the homepage (src/components/home/StudyTable.astro) and the collection. One canvas, fixed
// to the window; call startLineField(canvas) once. Reads only the pointer, the scroll position and the motion setting.
// Opt-in `touch`: on a phone the magnet also follows a finger while it scrolls (pointer events stop as soon as a touch
// becomes a scroll; touch events keep coming), springs back when the finger lifts, and the field is a little sparser.
// The homepage and the collection do not pass it, so they behave exactly as before.
export function startLineField(web: HTMLCanvasElement, origin: [number, number] = [0.86, 0.12], opts: { touch?: boolean } = {}) {
  // The desk's network. Points are scattered loosely over the whole screen, each joined to its nearest neighbours,
  // with a few faint facets filled in. Every point has a depth: nearer
  // ones are brighter and drift further; scrolling carries them up, and the points near the pointer follow it (below).
  // Reduced motion: drawn once, still.
  const ctx = web.getContext('2d')!;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  type Pt = { x: number; y: number; z: number; ph: number; nb: number[]; ox: number; oy: number; vx: number; vy: number; at: number };
  let pts: Pt[] = [], tris: [number, number, number, number][] = [], W = 0, H = 0;
  // The field covers the whole screen (with a margin above and below, so points can scroll through and wrap round).
  let M = 0, HF = 0, LMAX = 0;
  const build = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    web.width = W * dpr; web.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed = 7;
    const phone = W < 901, cell = phone ? (opts.touch ? 124 : 108) : 152;
    M = cell; HF = H + 2 * M; LMAX = cell * 2.4;
    pts = [];
    // A jittered grid with gaps, plus the odd close neighbour: loose overall, with a few tighter knots.
    for (let gy = 0; gy * cell < HF; gy++) for (let gx = -1; gx * cell < W + cell; gx++) {
      if (rnd() < 0.15) continue;
      const p: Pt = { x: (gx + rnd()) * cell, y: (gy + rnd()) * cell, z: 0.25 + rnd() * 0.75, ph: rnd() * Math.PI * 2, nb: [], ox: 0, oy: 0, vx: 0, vy: 0, at: 0 };
      pts.push(p);
      if (rnd() < 0.22) pts.push({ x: p.x + (rnd() - 0.5) * cell * 0.7, y: p.y + (rnd() - 0.5) * cell * 0.7, z: 0.25 + rnd() * 0.75, ph: rnd() * Math.PI * 2, nb: [], ox: 0, oy: 0, vx: 0, vy: 0, at: 0 });
    }
    pts.forEach((p, i) => {
      p.nb = pts.map((q, j) => [j, (q.x - p.x) ** 2 + (q.y - p.y) ** 2] as [number, number]).filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1]).slice(0, 2 + Math.floor(rnd() * 2)).map(([j]) => j);
    });
    // The entrance: each point's moment to appear, by its distance from the origin (a fraction of the window: on the
    // homepage, where the stacks are that the prints are dealt from), so the network spreads out across the screen.
    const [ox0, oy0] = [origin[0] * W, origin[1] * H], far = Math.hypot(Math.max(ox0, W - ox0), Math.max(oy0, H - oy0) + M);
    pts.forEach((p) => { p.at = 150 + (Math.hypot(p.x - ox0, p.y - M - oy0) / far) * 1700 + rnd() * 260; });
    tris = [];
    pts.forEach((p, i) => { if (rnd() < (phone ? 0.2 : 0.22) && p.nb.length > 1) tris.push([i, p.nb[0], p.nb[1], 0.04 + rnd() * 0.09]); });
  };
  // The pointer is a magnet with a reach: points within it are drawn towards the pointer and follow it; once it moves
  // on, they ease back to rest and the points in its new reach take over. Nothing else moves
  // with the pointer.
  let px = -9999, py = -9999;
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', () => { px = py = -9999; });
  addEventListener('pointercancel', () => { px = py = -9999; });
  if (opts.touch) {
    const follow = (e: TouchEvent) => { const t = e.touches[0]; if (t) { px = t.clientX; py = t.clientY; } };
    addEventListener('touchstart', follow, { passive: true });
    addEventListener('touchmove', follow, { passive: true });
    addEventListener('touchend', (e) => { if (!e.touches.length) px = py = -9999; }, { passive: true });
    addEventListener('touchcancel', () => { px = py = -9999; }, { passive: true });
  }
  const REACH = 190, PULL = 72;
  const pos = (p: Pt, t: number) => {
    const drift = still.matches ? 0 : 1;
    const x = p.x + Math.sin(t * 0.00021 + p.ph) * 18 * drift * p.z;
    // Scrolling carries the field up at a speed set by depth; a point that leaves one edge comes back at the other.
    let y = p.y + Math.cos(t * 0.00017 + p.ph) * 15 * drift * p.z - scrollY * (0.2 + 0.35 * p.z);
    y = ((y % HF) + HF) % HF - M;
    // The magnet: a target offset towards the pointer when it is within reach, none otherwise; a spring gets there.
    let gx = 0, gy = 0;
    const dx = px - x, dy = py - y, d = Math.hypot(dx, dy);
    if (!still.matches && d < REACH) { const u = 1 - d / REACH, k = u * u * (3 - 2 * u) * (0.75 + 0.25 * p.z); gx = dx * 0.6 * k; gy = dy * 0.6 * k; const g = Math.hypot(gx, gy); if (g > PULL) { gx *= PULL / g; gy *= PULL / g; } }
    // Firm, not springy: heavily damped, so a point settles without bouncing past its place.
    p.vx = (p.vx + (gx - p.ox) * 0.16) * 0.5; p.vy = (p.vy + (gy - p.oy) * 0.16) * 0.5;
    p.ox += p.vx; p.oy += p.vy;
    return [x + p.ox, y + p.oy];
  };
  // Lines and facets are drawn only between points that are close on screen (a wrapped point is not joined across it).
  const near = (a: number[], b: number[]) => Math.abs(a[0] - b[0]) < LMAX && Math.abs(a[1] - b[1]) < LMAX;
  // How far each point is into its entrance (0 → 1, eased); 1 for everyone once the entrance has played, or with
  // reduced motion. It plays once per page, not again on resize.
  let t0 = -1, entered = still.matches;
  const ease = (u: number) => 1 - (1 - Math.min(1, Math.max(0, u))) ** 3;
  const draw = (t: number) => {
    if (t0 < 0) t0 = t;
    const e = (p: Pt, lag = 0, len = 700) => (entered ? 1 : ease((t - t0 - p.at - lag) / len));
    if (!entered && t - t0 > 3600) entered = true;
    ctx.clearRect(0, 0, W, H);
    const xy = pts.map((p) => pos(p, t));
    for (const [a, b, c, o] of tris) {
      if (!near(xy[a], xy[b]) || !near(xy[a], xy[c]) || !near(xy[b], xy[c])) continue;
      ctx.beginPath(); ctx.moveTo(xy[a][0], xy[a][1]); ctx.lineTo(xy[b][0], xy[b][1]); ctx.lineTo(xy[c][0], xy[c][1]); ctx.closePath();
      // A facet fills in only after its three corners are joined.
      const k = Math.min(e(pts[a], 500, 900), e(pts[b], 500, 900), e(pts[c], 500, 900));
      if (k <= 0) continue;
      ctx.fillStyle = `rgba(236,235,231,${(o * (pts[a].z + 0.3) * k).toFixed(3)})`; ctx.fill();
    }
    pts.forEach((p, i) => p.nb.forEach((j) => {
      if ((j < i && pts[j].nb.includes(i)) || !near(xy[i], xy[j])) return;
      // A line grows out of whichever end appeared first, towards the other.
      const [a, b] = p.at <= pts[j].at ? [i, j] : [j, i];
      const k = e(pts[a], 120, 900);
      if (k <= 0) return;
      ctx.beginPath(); ctx.moveTo(xy[a][0], xy[a][1]); ctx.lineTo(xy[a][0] + (xy[b][0] - xy[a][0]) * k, xy[a][1] + (xy[b][1] - xy[a][1]) * k);
      ctx.strokeStyle = `rgba(236,235,231,${(0.04 + 0.13 * Math.min(p.z, pts[j].z)).toFixed(3)})`; ctx.lineWidth = 0.6 + 0.5 * p.z; ctx.stroke();
    }));
    // A point comes up as a small flash that settles to its size.
    pts.forEach((p, i) => {
      const k = e(p);
      if (k <= 0) return;
      const r = (0.8 + 1.6 * p.z) * (k < 1 ? 1 + 1.2 * Math.sin(k * Math.PI) : 1);
      ctx.beginPath(); ctx.arc(xy[i][0], xy[i][1], r, 0, Math.PI * 2); ctx.fillStyle = `rgba(236,235,231,${((0.12 + 0.4 * p.z) * k).toFixed(3)})`; ctx.fill();
    });
  };
  let raf = 0;
  const loop = (t: number) => { draw(t); raf = still.matches ? 0 : requestAnimationFrame(loop); };
  const start = () => { cancelAnimationFrame(raf); build(); raf = requestAnimationFrame(loop); };
  start();
  addEventListener('resize', start);
  addEventListener('scroll', () => { if (still.matches) requestAnimationFrame(draw); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else start(); });
}
