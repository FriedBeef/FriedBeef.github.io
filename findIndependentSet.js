export function findIndependentSet(adjSet, outerTriangle){
  let stringifiedArr = outerTriangle.map(subArr => JSON.stringify(subArr));
  adjSet.forEach((point, neighbors) => {
    //if not outer triangle vertex and degree <= 8, add to indepSet
    if(!stringifiedArr.includes(point) && neighbors.size<=8){
      indepSet.push(point);
    }
  });
  for (let i = 0; i < indepSet.length; i++) {
    for (let neighbor of adjSet.get(indepSet[i])) {
      if(indepSet.includes(neighbor)){
        indepSet = indepSet.filter(item => item !== neighbor);
      }
    }
  } 
  return indepSet;
}