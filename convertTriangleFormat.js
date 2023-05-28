export function convertTriangleFormat(triangle) {
    let newTriangle = [...triangle, triangle[0]];
    return [newTriangle];
}