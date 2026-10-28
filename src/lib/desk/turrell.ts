// Layer H, Turrell (特瑞尔): after James Turrell's apertures, where a knife-edged opening in a wall seems filled with
// nothing but coloured light. One opening is cut in the back wall: its edge is sharp, its field flat but a little
// brighter towards the middle, as light reads in his rooms, and the room around it takes on a trace of the same colour.
// The light changes as the page goes down, from dusk blue through violet to the last ember of evening, as the sky does
// in his skyspaces. No object is added: only an opening and its light, laid between the walls and the bodies.
// The opening and its evening are shared with the three studies built on it on the dev server (src/lib/bgStudies/).
import { drawScarpa } from './scarpa';
import { drawRoomBodies } from './combined';
import { rgba, deskFrame, type RGB, type Draw } from './ground';

// The evening, as the page goes down.
const SKY: RGB[] = [[52, 74, 128], [84, 60, 128], [128, 62, 72], [150, 78, 52]];
export const mix = (a: RGB, b: RGB, u: number): RGB => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * u) as RGB;

export function evening(H: number, sy: number): RGB {
  const span = Math.max(1, document.documentElement.scrollHeight - H), p = Math.max(0, Math.min(1, sy / span)) * (SKY.length - 1);
  const i = Math.min(SKY.length - 2, Math.floor(p));
  return mix(SKY[i], SKY[i + 1], p - i);
}

// Where the opening is cut on the window at this scroll: on a desktop in the desk's own units, behind the middle of
// the prints; on a phone, by the window.
export function aperture(W: number, H: number, sy: number) {
  if (W < 901) return { x: 0.24 * W, y: 0.3 * H - sy * 0.08, w: 0.68 * W, h: 0.56 * H };
  const { s, X, Y } = deskFrame(W, H);
  return { x: X(475), y: Y(52) - sy * 0.08, w: 605 * s, h: 594 * s };
}

// The opening filled with light of colour c: brighter towards its middle, with a hairline where the wall is cut.
export function drawAperture(ctx: CanvasRenderingContext2D, W: number, H: number, sy: number, c: RGB, strength = 1) {
  const { x, y, w, h } = aperture(W, H, sy);
  const g = ctx.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, Math.hypot(w, h) / 2);
  g.addColorStop(0, rgba(c, 0.3 * strength)); g.addColorStop(1, rgba(c, 0.16 * strength));
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = rgba(mix(c, [255, 255, 255], 0.4), 0.22); ctx.lineWidth = 1;
  ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(w), Math.round(h));
  return { x, y, w, h };
}

export const drawTurrell: Draw = (ctx, W, H, t, sy) => {
  drawScarpa(ctx, W, H, t, sy);
  const c = evening(H, sy);
  // The room takes the light's colour, faintly.
  ctx.fillStyle = rgba(c, 0.05); ctx.fillRect(0, 0, W, H);
  drawAperture(ctx, W, H, sy, c);
  drawRoomBodies(ctx, W, H, sy);
};
