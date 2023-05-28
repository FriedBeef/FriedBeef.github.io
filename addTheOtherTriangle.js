export function addTheOtherTriangle(adjSet, trianglesCoordinates, holes){
    let p1;
    let p2;
    let p3;
    let triangle = [];
    holes.forEach((value, key) => {
        value.forEach(point => {
            let oriPoint = JSON.parse(point);
            triangle.push(oriPoint);
        });
    });
    if (!adjSet.has(p1)) adjSet.set(p1, new Set());
    if (!adjSet.has(p2)) adjSet.set(p2, new Set());
    if (!adjSet.has(p3)) adjSet.set(p3, new Set());
  
    // Add edges to the adjacency set
    adjSet.get(p1).add(p2).add(p3);
    adjSet.get(p2).add(p1).add(p3);
    adjSet.get(p3).add(p1).add(p2);

    trianglesCoordinates.push(triangle);
    return {adjSet, trianglesCoordinates};
}