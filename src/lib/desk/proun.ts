// Constructivist / Proun: after El Lissitzky's Prouns, where solid bodies float in an axonometric space with no ground.
// The volumes are drawn in true isometric projection and lit from above, each face its own flat tone: a long beam
// driving down across the desk, a broad thin plate tilted beneath the works, a dark plate overlapping it, and one small
// cube carrying the only colour, a muted brick red. A single axis line runs the beam's length out past the window, a
// thin vertical rises from the cube and a ring hangs in the upper left. Each body scrolls at its own depth, so their
// overlaps shift as the page moves: unstable balance rather than a fixed picture.
import { rgba, poly, deskFrame, PAPER, type RGB, type Draw } from './ground';

export const BRICK: RGB = [170, 74, 58], INK: RGB = [0, 0, 0];
const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);

export type Faces = [string, string, string]; // top, left (front), right
type Body = { at: [number, number]; depth: number; size: [number, number, number]; faces: Faces };

// The isometric projection with its back corner at (ox, oy), k px to the unit.
export const isoPoint = (ox: number, oy: number, k: number) => (x: number, y: number, z: number): [number, number] =>
  [ox + (x - y) * C * k, oy + (x + y) * S * k - z * k];

// On a phone the cube travels the whole page as one slow, continuous pan: it starts a little below the middle of the
// screen and rises steadily to a little above it by the end of the page, so it is always in view, never too high,
// sometimes partly behind a card. Its path depends only on how far down the page the reader is, and the ground's
// camera (ground.ts) eases it, so it glides rather than tracks the finger.
function phoneCubeY(H: number, sy: number) {
  const span = Math.max(1, document.documentElement.scrollHeight - H), p = Math.min(1, Math.max(0, sy / span));
  return (0.6 - 0.24 * p) * H;
}

// Where the room's bodies stand on the window at this scroll: each one's projection and size. Shared with the layers
// drawn over the room (the comparison studies), so they can find the cube, the beam and the dark plate. On a desktop
// they are set out in the desk's own units (deskFrame), like the walls; on a phone, by the window.
// `cubeAt` moves the desktop cube to another spot in desk units, for a page whose cards stand elsewhere.
export function roomBodies(W: number, H: number, sy: number, cubeDepth = 0.38, cubeAt: [number, number] = [1224, 718]) {
  const phone = W < 901;
  if (phone) {
    // The bodies gather round the pile of dealt prints, where the first screen leaves the most ground open; the cube
    // is a little smaller here.
    const k = W / 760, at = (x: number, y: number, depth: number) => isoPoint(x * W, y * H - sy * depth, k);
    return {
      phone, k,
      plate: { P: at(0.02, 0.8, 0.2), size: [270, 270, 10] as [number, number, number] },
      beam: { P: at(-0.08, 0.5, 0.26), size: [760, 56, 44] as [number, number, number] },
      cube: { P: isoPoint(0.86 * W, phoneCubeY(H, sy), k), size: [56, 56, 56] as [number, number, number] },
    };
  }
  const { s, X, Y } = deskFrame(W, H), k = 0.9 * s, at = (u: number, v: number, depth: number) => isoPoint(X(u), Y(v) - sy * depth, k);
  return {
    phone, k,
    plate: { P: at(864, 466, 0.2), size: [270, 270, 10] as [number, number, number] },
    beam: { P: at(634, -20, 0.26), size: [980, 56, 44] as [number, number, number] },
    cube: { P: at(cubeAt[0], cubeAt[1], cubeDepth), size: [64, 64, 64] as [number, number, number] },
  };
}

// A box in isometric projection, k px to the unit, its back corner at (ox, oy): the two visible sides, then the top.
// Returns the projection, so lines can be drawn from the box's own points.
export function isoBox(ctx: CanvasRenderingContext2D, ox: number, oy: number, k: number, [dx, dy, dz]: [number, number, number], [top, left, right]: Faces) {
  const P = isoPoint(ox, oy, k);
  poly(ctx, [P(0, dy, 0), P(dx, dy, 0), P(dx, dy, dz), P(0, dy, dz)], left);
  poly(ctx, [P(dx, 0, 0), P(dx, dy, 0), P(dx, dy, dz), P(dx, 0, dz)], right);
  poly(ctx, [P(0, 0, dz), P(dx, 0, dz), P(dx, dy, dz), P(0, dy, dz)], top);
  return P;
}

export const drawProun: Draw = (ctx, W, H, _t, sy) => {
  ctx.fillStyle = 'rgb(20,20,19)'; ctx.fillRect(0, 0, W, H);
  drawProunBodies(ctx, W, H, sy);
};

// The bodies and lines alone, on whatever ground is already drawn. The combined study (combined.ts) leaves out the ring
// and the broad plate, which would fight its wall panel, and draws the beam's axis in its own colour.
export function drawProunBodies(ctx: CanvasRenderingContext2D, W: number, H: number, sy: number,
  { ring = true, plate = true, axis = rgba(PAPER, 0.18), cubeDepth = 0.38, cubeAt }: { ring?: boolean; plate?: boolean; axis?: string; cubeDepth?: number; cubeAt?: [number, number] } = {}) {
  const phone = W < 901, R = roomBodies(W, H, sy, cubeDepth, cubeAt), k = R.k;

  const body = ({ at, depth, size, faces }: Body) => isoBox(ctx, at[0] * W, at[1] * H - sy * depth, k, size, faces);

  // The ring.
  ctx.strokeStyle = rgba(PAPER, 0.14); ctx.lineWidth = 1;
  if (ring) { ctx.beginPath(); ctx.arc((phone ? 0.78 : 0.22) * W, 0.26 * H - sy * 0.08, (phone ? 0.2 : 0.13) * Math.max(W, H), 0, Math.PI * 2); ctx.stroke(); }

  // The broad plate and the dark plate over it.
  if (plate) body({ at: [phone ? 0.1 : 0.12, 0.5], depth: 0.1, size: [360, 460, 14], faces: [rgba(PAPER, 0.09), rgba(PAPER, 0.16), rgba(PAPER, 0.06)] });
  const place = ({ P, size }: { P: ReturnType<typeof isoPoint>; size: [number, number, number] }, faces: Faces) => {
    const [ox, oy] = P(0, 0, 0);
    return isoBox(ctx, ox, oy, k, size, faces);
  };
  place(R.plate, [rgba(INK, 0.5), rgba(PAPER, 0.13), rgba(PAPER, 0.08)]);

  // The beam, and its axis carried out past the window.
  const B = place(R.beam, [rgba(PAPER, 0.18), rgba(PAPER, 0.1), rgba(PAPER, 0.13)]);
  ctx.strokeStyle = axis;
  ctx.beginPath(); ctx.moveTo(...B(-3000, 28, 22)); ctx.lineTo(...B(4000, 28, 22)); ctx.stroke();

  // The cube, the one colour, and the vertical rising from it.
  const cube = R.cube.size[0];
  const Q = place(R.cube, [rgba(BRICK, 0.5), rgba(BRICK, 0.3), rgba(BRICK, 0.4)]);
  const [qx, qy] = Q(cube / 2, cube / 2, cube);
  ctx.strokeStyle = rgba(PAPER, 0.1);
  ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(qx, -10); ctx.stroke();
}
