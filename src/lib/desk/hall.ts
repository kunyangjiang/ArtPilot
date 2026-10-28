// The halls' room (the course catalogue, the collection, the stories and cases halls). Its pieces are its own, none of
// the homepage's (no wall panel, slit, beam, dark plate or cube), but they are made by the homepage's rules, so the halls
// and the desk read as one family: solid bodies in Lissitzky's isometric projection, lit from above so each face has its
// own tone; Scarpa's stone and red lit from above too; brass as the finishing edge; one brick red; the same dark ground
// and the same eased camera (ground.ts). No drawn diagrams, and everything keeps to the edges, since a hall's content runs
// down the middle of the page. Two rooms:
// - drawHallBodies, for the collection: a Lissitzky composition cropped at the margins, a
//   broad grey slab, a large red slab with a brass front edge and a long black rod crossing them, and a smaller echo
//   low on the left;
// - drawHallWall, for the stories and cases halls: Scarpa's Venetian red, one tall wall of it down the right, lit from
//   above, its edge finished in brass and casting a crisp shadow, with a grey slab and a black rod floating low on the
//   left.
// Each piece scrolls slowly at its own depth.
import { rgba, poly, type RGB, type Draw } from './ground';
import { BRICK, INK, isoBox } from './proun';

const PAPER: RGB = [236, 235, 231], BRASS: RGB = [182, 152, 104];
type Size = [number, number, number];
type Faces = [string, string, string];

// The homepage's body faces: top lightest, the front a little darker, the side between (as its beam and cube).
const GREY = (a = 1): Faces => [rgba(PAPER, 0.11 * a), rgba(PAPER, 0.07 * a), rgba(PAPER, 0.09 * a)];
const RED = (a = 1): Faces => [rgba(BRICK, 0.82 * a), rgba(BRICK, 0.5 * a), rgba(BRICK, 0.64 * a)];
const BLACK: Faces = [rgba(INK, 0.85), rgba(PAPER, 0.08), rgba(PAPER, 0.05)];

const ground = (ctx: CanvasRenderingContext2D, W: number, H: number) => { ctx.fillStyle = 'rgb(18,18,17)'; ctx.fillRect(0, 0, W, H); };
const scale = (W: number) => (W < 901 ? W / 560 : Math.min(1.25, W / 1440) * 0.9);

// A body standing at (x, y) of the window (fractions), scrolling at its own depth, with a soft shadow beneath it;
// returns its projection, so an edge can be finished in brass.
function body(ctx: CanvasRenderingContext2D, W: number, H: number, sy: number, x: number, y: number, depth: number, size: Size, faces: Faces) {
  const k = scale(W);
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 22 * k; ctx.shadowOffsetX = 8 * k; ctx.shadowOffsetY = 14 * k;
  const P = isoBox(ctx, x * W, y * H - sy * depth, k, size, faces);
  ctx.restore();
  return P;
}
function brassEdge(ctx: CanvasRenderingContext2D, P: ReturnType<typeof isoBox>, [dx, dy, dz]: Size) {
  ctx.strokeStyle = rgba(BRASS, 0.7); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(...P(0, dy, dz)); ctx.lineTo(...P(dx, dy, dz)); ctx.stroke();
}

// The collection: Proun bodies.
export const drawHallBodies: Draw = (ctx, W, H, _t, sy) => {
  ground(ctx, W, H);
  const R: Size = W < 901 ? [130, 100, 12] : [210, 150, 14];
  if (W < 901) {
    body(ctx, W, H, sy, 0.62, 0.1, 0.05, [240, 170, 8], GREY());
    brassEdge(ctx, body(ctx, W, H, sy, 0.74, 0.2, 0.09, R, RED()), R);
    body(ctx, W, H, sy, 0.5, 0.12, 0.12, [420, 9, 9], BLACK);
    body(ctx, W, H, sy, -0.04, 0.8, 0.08, [200, 150, 6], GREY(0.8));
    body(ctx, W, H, sy, 0.04, 0.76, 0.11, [34, 34, 5], RED());
    return;
  }
  body(ctx, W, H, sy, 0.8, 0.1, 0.05, [330, 240, 10], GREY());
  brassEdge(ctx, body(ctx, W, H, sy, 0.86, 0.33, 0.09, R, RED()), R);
  body(ctx, W, H, sy, 0.72, 0.22, 0.13, [620, 12, 12], BLACK);
  body(ctx, W, H, sy, 0.8, 0.62, 0.16, [50, 50, 5], GREY(1.2));
  body(ctx, W, H, sy, -0.03, 0.74, 0.07, [300, 220, 8], GREY(0.8));
  body(ctx, W, H, sy, 0.05, 0.7, 0.1, [40, 40, 6], RED());
  body(ctx, W, H, sy, -0.04, 0.88, 0.12, [420, 10, 10], BLACK);
};

// The stories and cases halls: the red wall.
export const drawHallWall: Draw = (ctx, W, H, _t, sy) => {
  ground(ctx, W, H);
  const phone = W < 901, x = W - (phone ? 0.07 : 0.085) * W, top = -sy * 0.06;
  // The wall's crisp shadow on the room to its left, then the wall itself, lit from above, and its brass edge.
  const sh = (phone ? 0.06 : 0.045) * W;
  poly(ctx, [[x, 0], [x - sh, 0], [x - sh, H], [x, H]], 'rgba(0,0,0,.4)');
  const g = ctx.createLinearGradient(0, top, 0, top + 1.4 * H);
  g.addColorStop(0, rgba([196, 92, 70], 0.7)); g.addColorStop(0.5, rgba(BRICK, 0.58)); g.addColorStop(1, rgba([110, 44, 34], 0.52));
  ctx.fillStyle = g; ctx.fillRect(x, 0, W - x, H);
  ctx.fillStyle = rgba(BRASS, 0.6); ctx.fillRect(x, 0, 1.5, H);
  // The shadow of something above, falling across the wall at a slant.
  ctx.save(); ctx.filter = `blur(${phone ? 3 : 6}px)`;
  poly(ctx, [[x, top + 0.06 * H], [W + 20, top - 0.04 * H], [W + 20, top + 0.34 * H], [x, top + 0.5 * H]], 'rgba(0,0,0,.36)');
  ctx.restore();
  // Floating low on the left: a grey slab and a black rod.
  body(ctx, W, H, sy, phone ? -0.04 : -0.02, phone ? 0.8 : 0.72, 0.08, [300, 200, 8], GREY());
  body(ctx, W, H, sy, phone ? -0.06 : -0.04, phone ? 0.9 : 0.84, 0.12, [phone ? 380 : 520, 10, 10], BLACK);
};
