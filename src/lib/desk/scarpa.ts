// Scarpa / gallery light: the desk as a dark exhibition room in the manner of Carlo Scarpa's museum installations. A
// tall freestanding wall panel stands on the left, lit from above, its edge finished in a brass strip, casting a crisp
// shadow to its right; a narrow slit of daylight cuts down the right of the room and lays a faint band of light on
// the wall beside it; lower down, a long low plinth wall with a lit top edge, and a fine joint in the stone floor.
// Each element scrolls at its own depth.
import { rgba, poly, deskFrame, PAPER, type RGB, type Draw } from './ground';

const BRASS: RGB = [182, 152, 104], DAY: RGB = [232, 226, 212];

// Where the room's walls stand on the window at this scroll. Shared with the layers drawn over the room. On a desktop
// they are set out in the desk's own units (deskFrame), so they keep their places among the cards at any window size;
// on a phone, where the page is one column, by the window. `u` is one desk unit in pixels on a desktop.
export function roomWalls(W: number, H: number, sy: number) {
  const phone = W < 901;
  if (phone) return {
    phone, u: W / 390,
    // The panel runs the length of the page down the left, its edge just clear of the dealt prints; the slit runs down
    // the right-hand gutter.
    panel: { x: 0.2 * W, top: -sy * 0.12, bottom: 3.4 * H - sy * 0.12 },
    slit: { x: 0.962 * W, top: 0.12 * H - sy * 0.2, bottom: 3.4 * H - sy * 0.2 },
    plinth: { x: 0.42 * W, top: 1.35 * H - sy * 0.28 },
    joint: 2.3 * H - sy * 0.3,
  };
  const { s, X, Y } = deskFrame(W, H);
  return {
    phone, u: s,
    // The panel's edge stands in the gap between the opening card and the first print; the slit, in the margin right
    // of the stage list; the plinth wall, low behind the right of the desk.
    panel: { x: X(415), top: -sy * 0.12, bottom: Y(736) - sy * 0.12 },
    slit: { x: X(1414), top: Y(-2) - sy * 0.2, bottom: Y(754) - sy * 0.2 },
    plinth: { x: X(835), top: Y(610) - sy * 0.28 },
    joint: Y(2014) - sy * 0.3,
  };
}

export const drawScarpa: Draw = (ctx, W, H, _t, sy) => {
  const { phone, u, panel, slit, plinth, joint } = roomWalls(W, H, sy);
  ctx.fillStyle = 'rgb(18,18,17)'; ctx.fillRect(0, 0, W, H);

  // The wall panel: top-lit, a brass edge, and its shadow on the wall behind.
  const ax = panel.x, ay = panel.top, ab = panel.bottom;
  const sh = phone ? 0.08 * W : 79 * u;
  poly(ctx, [[ax, ay - 10], [ax + sh, ay - 10], [ax + sh, ab + sh * 0.7], [ax, ab]], 'rgba(0,0,0,.5)');
  const g = ctx.createLinearGradient(0, ay, 0, ab);
  g.addColorStop(0, 'rgb(50,48,44)'); g.addColorStop(0.5, 'rgb(37,36,33)'); g.addColorStop(1, 'rgb(27,27,25)');
  ctx.fillStyle = g; ctx.fillRect(0, ay - 10, ax, ab - ay + 10);
  ctx.fillStyle = rgba(BRASS, 0.55); ctx.fillRect(ax - 1.5, ay - 10, 1.5, ab - ay + 10);
  ctx.fillStyle = rgba(DAY, 0.1); ctx.fillRect(0, ab - 1, ax, 1);

  // The slit of daylight, in the open margin at the right, and the band it lays on the wall to its left.
  const sx = slit.x, st = slit.top, sb = slit.bottom;
  const band = phone ? 0.12 * W : 173 * u;
  const spill = ctx.createLinearGradient(sx, 0, sx - band, 0);
  spill.addColorStop(0, rgba(DAY, 0.08)); spill.addColorStop(1, rgba(DAY, 0));
  ctx.fillStyle = spill; ctx.fillRect(sx - band, st, band, sb - st);
  ctx.fillStyle = rgba(DAY, 0.55); ctx.fillRect(sx - 1.5, st, 3, sb - st);

  // The plinth wall: lower right, darker below a lit top edge with a brass line beneath it.
  const px = plinth.x, py = plinth.top;
  const pg = ctx.createLinearGradient(0, py, 0, py + 0.5 * H);
  pg.addColorStop(0, 'rgb(31,30,28)'); pg.addColorStop(1, 'rgb(20,20,19)');
  ctx.fillStyle = pg; ctx.fillRect(px, py, W - px, H * 3);
  ctx.fillStyle = rgba(DAY, 0.2); ctx.fillRect(px, py, W - px, 1);
  ctx.fillStyle = rgba(BRASS, 0.4); ctx.fillRect(px, py + 7, W - px, 1);
  const ps = phone ? 0.04 * W : 58 * u, pd = phone ? 0.03 * H : 27 * u;
  poly(ctx, [[px, py], [px - ps, py + pd], [px - ps, py + H * 3], [px, py + H * 3]], 'rgba(0,0,0,.3)');

  // A joint in the stone floor, further down.
  ctx.fillStyle = rgba(PAPER, 0.07); ctx.fillRect(0, Math.round(joint), W, 1);
};
