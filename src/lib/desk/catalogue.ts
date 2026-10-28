// The course catalogue's room: the homepage's room behind the entrance, and then one bay of the same room for each stage,
// so the room carries on down the whole long page instead of being left behind after the first screen. A bay is fixed
// to its stage's section (measured from the page) and keeps to the ground the section leaves open:
// - in one margin, a top-lit stone wall with a brass edge, casting a crisp shadow towards the page; the side alternates
//   from stage to stage, as the walls of a gallery do;
// - down the other margin, a strip of daylight and the faint band it lays on the wall;
// - in the open band above the stage's head row, towards the right, clear of its title and its prints, one more
//   element of the two artists, none of them a box, turning from stage to stage:
//   Lissitzky's disc, flat and lit from above; Scarpa's niche, a dark recess cut into the wall, its upper and left
//   edges catching the light and its sill finished in brass; and Lissitzky's wedge, in the cube's red.
// On a phone, where the sections fill the width, the wall and the daylight keep to the gutters and the element stands
// beside the stage's numeral.
import { rgba, poly, pageRect, PAPER, type RGB, type Rect, type Draw } from './ground';
import { drawScarpa } from './scarpa';
import { drawProunBodies, BRICK } from './proun';

const BRASS: RGB = [182, 152, 104], DAY: RGB = [232, 226, 212];

// The stages' sections and their head rows, measured again at most once a second.
let cache: { at: number; W: number; stages: { s: Rect; head: Rect | null }[] } | null = null;
function stages(W: number) {
  const now = performance.now();
  if (!cache || cache.W !== W || now - cache.at > 1000) {
    const list = [...document.querySelectorAll<HTMLElement>('.ec-stage')].map((el) => ({ s: pageRect(el), head: pageRect(el.querySelector<HTMLElement>('.ec-head')) }));
    cache = { at: now, W, stages: list.filter((x) => x.s) as { s: Rect; head: Rect | null }[] };
  }
  return cache.stages;
}

export const drawCatalogueRoom: Draw = (ctx, W, H, t, sy) => {
  // The entrance: the homepage's room, its cube moved into the open right margin beside the stage tiles.
  drawScarpa(ctx, W, H, t, sy);
  drawProunBodies(ctx, W, H, sy, { ring: false, plate: false, axis: rgba(BRASS, 0.4), cubeAt: [1385, 640] });

  const phone = W < 901, u = phone ? W / 390 : Math.min(1.25, W / 1440);
  stages(W).forEach(({ s, head }, i) => {
    const top = s.y - sy, bottom = s.y + s.h - sy;
    if (bottom < -40 || top > H + 40) return;
    const left = i % 2 === 0;

    // The wall, in the margin on this stage's side.
    const inner = phone ? (left ? 10 : W - 10) : left ? s.x + 44 * u : s.x + s.w - 44 * u;
    const x0 = left ? 0 : inner, x1 = left ? inner : W, wt = top + (phone ? 30 : 60), wb = bottom - (phone ? 20 : 40);
    const sh = (phone ? 8 : 40) * (left ? 1 : -1) * u;
    poly(ctx, [[inner, wt], [inner + sh, wt], [inner + sh, wb + Math.abs(sh) * 0.7], [inner, wb]], 'rgba(0,0,0,.45)');
    const g = ctx.createLinearGradient(0, wt, 0, wb);
    g.addColorStop(0, 'rgb(50,48,44)'); g.addColorStop(0.5, 'rgb(37,36,33)'); g.addColorStop(1, 'rgb(27,27,25)');
    ctx.fillStyle = g; ctx.fillRect(x0, wt, x1 - x0, wb - wt);
    ctx.fillStyle = rgba(BRASS, 0.55); ctx.fillRect(left ? inner - 1.5 : inner, wt, 1.5, wb - wt);
    ctx.fillStyle = rgba(DAY, 0.1); ctx.fillRect(x0, wb - 1, x1 - x0, 1);

    // The daylight down the other margin.
    const lx = phone ? (left ? W - 6 : 6) : left ? s.x + s.w + (W - s.x - s.w) * 0.6 : s.x * 0.4;
    const lt = top + (phone ? 60 : 120), lb = bottom - (phone ? 60 : 120), band = (phone ? 0.1 : 0.09) * W * (left ? -1 : 1);
    const spill = ctx.createLinearGradient(lx, 0, lx + band, 0);
    spill.addColorStop(0, rgba(DAY, 0.07)); spill.addColorStop(1, rgba(DAY, 0));
    ctx.fillStyle = spill; ctx.fillRect(Math.min(lx, lx + band), lt, Math.abs(band), lb - lt);
    ctx.fillStyle = rgba(DAY, 0.5); ctx.fillRect(lx - 1.5, lt, 3, lb - lt);

    // The stage's element in the band above its head row (beside the numeral on a phone), drifting a little against
    // the page.
    const hy = (phone ? (head ? head.y + head.h * 0.82 : s.y + 300) : (head ? (s.y + head.y) / 2 : s.y + 58)) - sy, drift = (hy - H / 2) * -0.06;
    const cx = phone ? 0.9 * W : s.x + s.w * 0.62, cy = hy + drift, e = (phone ? 0.5 : 0.62) * u;
    const kind = i % 3;
    if (kind === 0) {
      // The disc: flat, lit from above, with a soft shadow beneath it.
      const r = 70 * e, g = ctx.createLinearGradient(0, cy - r, 0, cy + r);
      g.addColorStop(0, rgba(PAPER, 0.17)); g.addColorStop(1, rgba(PAPER, 0.06));
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 24 * e; ctx.shadowOffsetX = 8 * e; ctx.shadowOffsetY = 14 * e;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.restore();
    } else if (kind === 1) {
      // The niche: a dark recess, its upper and left edges lit, the right and lower in shadow, a brass sill.
      const w = 120 * e, h = 170 * e, x = cx - w / 2, y = cy - h / 2, d = 9 * e;
      ctx.fillStyle = 'rgba(6,6,6,.75)'; ctx.fillRect(x, y, w, h);
      poly(ctx, [[x, y], [x + w, y], [x + w - d, y + d], [x + d, y + d]], rgba(DAY, 0.14));
      poly(ctx, [[x, y], [x + d, y + d], [x + d, y + h - d], [x, y + h]], rgba(DAY, 0.08));
      poly(ctx, [[x + w, y], [x + w, y + h], [x + w - d, y + h - d], [x + w - d, y + d]], 'rgba(0,0,0,.4)');
      ctx.fillStyle = rgba(BRASS, 0.6); ctx.fillRect(x - 6 * e, y + h, w + 12 * e, 2);
    } else {
      // The wedge: a long sharp triangle of red, its lower side a darker red where it turns away from the light.
      const L = 210 * e, T = 46 * e, a = -0.32, ex = Math.cos(a), ey = Math.sin(a), nx = -ey, ny = ex;
      const tip: [number, number] = [cx - ex * L / 2, cy - ey * L / 2], b1: [number, number] = [cx + ex * L / 2 - nx * T / 2, cy + ey * L / 2 - ny * T / 2], b2: [number, number] = [cx + ex * L / 2 + nx * T / 2, cy + ey * L / 2 + ny * T / 2];
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 20 * e; ctx.shadowOffsetX = 6 * e; ctx.shadowOffsetY = 12 * e;
      poly(ctx, [tip, b1, b2], rgba(BRICK, 0.82));
      ctx.restore();
      poly(ctx, [tip, [(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2], b2], rgba([110, 44, 34], 0.55));
    }
  });
};
