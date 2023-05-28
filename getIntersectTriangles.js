export function getIntersectTriangles(t, arr){
    let t1 = turf.polygon(convertTriangleFormat(t));
    let overlappingTriangles = [];
    for (let i = 0; i < arr.length; i++) {
        let t2 = turf.polygon(convertTriangleFormat(arr[i]));
        if (areIntersect(t1, t2)) {
            overlappingTriangles.push(arr[i]);
        }
    }
    return overlappingTriangles;
}

function areIntersect(t1, t2) {
    let intersection = turf.intersect(t1, t2);
    if (intersection !== null && turf.area(intersection) > 0) {
        return true;
    } else {
        return false;
    }
}

function convertTriangleFormat(triangle) {
    let newTriangle = [...triangle, triangle[0]];
    return [newTriangle];
}