export function convertTrianglesToAdjset(triangles){
    let adjSet = new Map();

    // Process triangles three indices at a time
    for (let triangle of triangles) {
      let p0 = triangle[0];
      let p1 = triangle[1];
      let p2 = triangle[2];

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
    
    return adjSet;
}   