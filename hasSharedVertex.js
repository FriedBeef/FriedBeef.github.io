import { isTriangleVertex } from "./isTriangleVertex.js";
export function hasSharedVertex(triangle1, triangle2) {
    for (let vertex of triangle1) {
      if (isTriangleVertex(vertex, triangle2)) {
        return true;
      }
    }
    return false;
}