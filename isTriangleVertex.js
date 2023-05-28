export function isTriangleVertex(point, triangle) {
    for (let vertex of triangle) {
        if (vertex[0] === point[0] && vertex[1] === point[1]) {
            return true;
        }
    }
    return false;
}