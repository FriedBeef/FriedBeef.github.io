export function ec(holes, trianglesCoordinates, adjSet){
    let newEdges = [];
    for (let [center, neighbors] of holes) {
        const sortedNeighbors = sortPointsClockwise(center, neighbors);
        let edges = ecTriangulation(sortedNeighbors, trianglesCoordinates, adjSet);
        newEdges = newEdges.concat(edges);
    }
    return {trianglesCoordinates, adjSet, newEdges};
}

function ecTriangulation(hole, trianglesCoordinates, adjSet){
    let polygon = Array.from(hole).map(JSON.parse).flat();
    let triangles = earcut(polygon);
    let newEdges = [];
    // Transform indices into coordinates
    for (let i = 0; i < triangles.length; i += 3) {
        // Look up the coordinates using the indices
        let p0 = [polygon[triangles[i] * 2], polygon[triangles[i] * 2 + 1]];
        let p1 = [polygon[triangles[i + 1] * 2], polygon[triangles[i + 1] * 2 + 1]];
        let p2 = [polygon[triangles[i + 2] * 2], polygon[triangles[i + 2] * 2 + 1]];
        let currTriangle = [p0,p1,p2];

        // Add [p0,p1,p2] to trianglesCoordinates
        trianglesCoordinates.push(currTriangle);

        // Create keys for each point
        let key1 = JSON.stringify(p0);
        let key2 = JSON.stringify(p1);
        let key3 = JSON.stringify(p2);
        
        // Ensure each key has a corresponding Set in the Map
        // if (!adjSet.has(key1)) adjSet.set(key1, new Set());
        // if (!adjSet.has(key2)) adjSet.set(key2, new Set());
        // if (!adjSet.has(key3)) adjSet.set(key3, new Set());
        
        // Add edges to the adjacency set
        // adjSet.get(key1).add(key2).add(key3);
        // adjSet.get(key2).add(key1).add(key3);
        // adjSet.get(key3).add(key1).add(key2);

        addNeighborsAndEdges(key1, key2, newEdges, adjSet);
        addNeighborsAndEdges(key1, key3, newEdges, adjSet);
        addNeighborsAndEdges(key2, key3, newEdges, adjSet);
    }
    return newEdges;
}

function addNeighborsAndEdges(key1, key2, newEdges, adjSet) {
    if (!adjSet.get(key1).has(key2)) {
        adjSet.get(key1).add(key2);
        adjSet.get(key2).add(key1);
        newEdges.push([key1, key2]);
    }
}

function sortPointsClockwise(center, points) {
    const centerPoint = JSON.parse(center);
    // Function to calculate angle between center and a point
    const calcAngle = (point) => {
        const [x, y] = JSON.parse(point);
        return Math.atan2(y - centerPoint[1], x - centerPoint[0]);
    }
    // Sort the points based on the calculated angle
    return Array.from(points).sort((a, b) => calcAngle(a) - calcAngle(b));
}

