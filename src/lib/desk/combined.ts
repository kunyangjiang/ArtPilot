// Scarpa + Proun: Scarpa's room is the space (the top-lit wall panel with its brass edge, the slit of daylight, the
// plinth wall and the floor joint), and Proun's bodies float in it as if installed there: the long beam, the dark
// plate and the brick-red cube. The beam's axis line is drawn in the room's brass, so the two languages share one
// material. The Proun ring and broad plate are left out: they would fight the wall panel.
import { rgba, type Draw } from './ground';
import { drawScarpa } from './scarpa';
import { drawProunBodies } from './proun';

export const drawCombined: Draw = (ctx, W, H, t, sy) => drawRoom(ctx, W, H, t, sy);

// The room itself; the stronger version (gallery.ts) lets the cube leave the first screen faster on a desktop, so it
// does not drift down into the sections below, where the page has red pieces of its own.
export function drawRoom(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, sy: number, cubeDepth?: number) {
  drawScarpa(ctx, W, H, t, sy);
  drawRoomBodies(ctx, W, H, sy, cubeDepth);
}
// The Proun half alone, so a layer can be laid between the walls and the bodies (the comparison studies do).
export function drawRoomBodies(ctx: CanvasRenderingContext2D, W: number, H: number, sy: number, cubeDepth?: number) {
  drawProunBodies(ctx, W, H, sy, { ring: false, plate: false, axis: rgba([182, 152, 104], 0.4), cubeDepth });
}
