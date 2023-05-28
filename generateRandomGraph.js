import { generatePointsInTriangle } from "./generatePointsInTriangle.js";
import { triangulation } from './triangulation.js';

export function generateRandomGraph(width, height){
    //Define outer triangle
    let outerTriangle = [[10.0, 10.0], [width-10.0, 10.0], [width/2.0, height-10.0]]; 
    let smallerOuterTriangle = [[50.0, 50.0], [width-50.0, 50.0], [width/2.0, height-50.0]];
    //Generate 10 points in Triangle
    let innerPoints = generatePointsInTriangle(10, smallerOuterTriangle); 
    let allPoints = innerPoints.concat(outerTriangle);
    //Triangulation of all points(including the vertices of the outer triangle)
    let {adjSet, t, innerTrianglesCoordinates} = triangulation(allPoints, outerTriangle);
    return {adjSet, t, innerTrianglesCoordinates, outerTriangle};
}