export function updateGraphAndTriangles(indepSet, adjSet, trianglesCoordinates, holes){
    trianglesCoordinates = updateTriangles(indepSet, trianglesCoordinates);
    ({adjSet, holes} = updateGraph(adjSet, indepSet));
    return {adjSet, holes, trianglesCoordinates};
}

function updateTriangles(indepSet, trianglesCoordinates){
    let oriIndepSet = indepSet.map(item => JSON.parse(item));
    let restTriangles = trianglesCoordinates.filter(triangle =>
        !oriIndepSet.some(point => isVertexOfTriangle(point, triangle))
    );
    return restTriangles;
}

function updateGraph(adjSet, points, holes) {
    holes = new Map();
    for(let point of points) {
        holes.set(point, adjSet.get(point));
        adjSet.delete(point);
        // Iterate through the remaining entries and remove the point from each set
        adjSet.forEach((value, key) => {
            value.delete(point);
        });
    }
    return {adjSet, holes};
}

function isVertexOfTriangle(point, triangle) {
    return triangle.some(vertex => 
        vertex[0] === point[0] && vertex[1] === point[1]
    );
}
