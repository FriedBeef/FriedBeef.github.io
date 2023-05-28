import { hasSharedVertex } from "./hasSharedVertex.js";
export function triangulation(inputPoints, outerTriangle) {
    const delaunay = d3.Delaunay.from(inputPoints);
    const {points, triangles} = delaunay;
    let adjSet = new Map();
    let innerTrianglesCoordinates = [];
    let t = [];
    // Process triangles three indices at a time
    for (let i = 0; i < triangles.length; i += 3) {
      let t0 = triangles[i];
      let t1 = triangles[i + 1];
      let t2 = triangles[i + 2];
    
      // Look up the coordinates using the indices
      let p0 = [points[t0*2], points[t0*2 + 1]];
      let p1 = [points[t1*2], points[t1*2 + 1]];
      let p2 = [points[t2*2], points[t2*2 + 1]];
      let currTriangle = [p0,p1,p2];
      // Add [p0,p1,p2] to t
      t.push(currTriangle);

      // Add [p0,p1,p2] to innerTrianglesCoordinates
      //if it doesn't share vertex with the outer triangle
      if(!hasSharedVertex(currTriangle, outerTriangle)){
        innerTrianglesCoordinates.push(currTriangle);
      }

      // Create keys for each point
      let key1 = JSON.stringify(p0);
      let key2 = JSON.stringify(p1);
      let key3 = JSON.stringify(p2);
    
      // Ensure each key has a corresponding Set in the Map
      if (!adjSet.has(key1)) adjSet.set(key1, new Set());
      if (!adjSet.has(key2)) adjSet.set(key2, new Set());
      if (!adjSet.has(key3)) adjSet.set(key3, new Set());
    
      // Add edges to the adjacency set
      adjSet.get(key1).add(key2).add(key3);
      adjSet.get(key2).add(key1).add(key3);
      adjSet.get(key3).add(key1).add(key2);
    }
    return {adjSet, t, innerTrianglesCoordinates};
}
