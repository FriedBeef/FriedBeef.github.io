import { showPoints } from './showPoints.js';
export function findIndepSetAndShow(svg, adjSet, outerPoly){
    //find indep set and display
    let indepSet = findIndepSet(adjSet, outerPoly);
    showPoints(svg, indepSet.map(item => JSON.parse(item)), "steelblue");
    return indepSet;
}

function findIndepSet(adjSet, outerPoly){
    let stringifiedArr = outerPoly.map(subArr => JSON.stringify(subArr));
    let indepSet = [];
    adjSet.forEach((neighbors, point) => {
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