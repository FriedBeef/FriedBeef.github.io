export function isPointInTriangle(p, t) {
    // Close the polygon (triangle) by repeating the first point
    let point = turf.point(p);
    let triangle = turf.polygon(convertTriangleFormat(t));
    return turf.booleanPointInPolygon(point, triangle, { ignoreBoundary: false });
}

function convertTriangleFormat(triangle) {
    let newTriangle = [...triangle, triangle[0]];
    return [newTriangle];
}
