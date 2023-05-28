import { showTriangles } from './showTriangles.js';
import { findIndepSetAndShow } from './findIndepSetAndShow.js';
import { updateGraphAndTriangles } from './updateGraphAndTriangles.js';
import { renderGraph } from './renderGraph.js';
import { ec } from './ec.js';
import { getIntersectTriangles } from './getIntersectTriangles.js';
import { showPoints } from './showPoints.js';
import { getTargetTriangle } from './getTargetTriangle.js';
import { showPolygon } from './showPolygon.js';
import { addTheOtherTriangle } from './addTheOtherTriangle.js';

let state = 0;
let holes = new Map();
let indepSet = [];
let trianglesCoordinates = [];
let idx = 0;
let targetTriangle = [];
let overlappingTriangles = [];
let targetPoint = [];
let svg2;
let newEdges = [];

export function handleInputMode(svg, width, height, event, instructions, adjSet, userT, t, outerRectangle, trianglesList){
    switch(state) {
        case 0:
            // Show user's input
            showTriangles(svg, userT, 'black', 'none');
            instructions.text("Left click to create a rectangle outer face.");
            state = 1;
            break;
        case 1:
            // Show the whole graph
            svg.selectAll("*").remove();
            trianglesCoordinates = t;
            showTriangles(svg, trianglesCoordinates, "black", "none");
            instructions.text("Now we are going to store the data structure of point location. Left click to continue.");
            state = 2;
            break;
        case 2: // Find indep set
            svg.selectAll("*").remove();
            renderGraph(svg, adjSet, []);
            indepSet = findIndepSetAndShow(svg, adjSet, outerRectangle);
            instructions.text("The highlighted vertices form an independent set with degree <= 8.");
            state = 3;
            break;
        case 3: // Remove vertices and edges
            ({ adjSet, holes, trianglesCoordinates} = updateGraphAndTriangles(indepSet, adjSet, trianglesCoordinates, holes));
            svg.selectAll("*").remove();
            showPolygon(svg, outerRectangle, "black", "none");
            renderGraph(svg, adjSet, []);
            instructions.text("Removed the vertices and all the edges connected to them, create hole/holes");
            state = 4;
            break;
        case 4: // Earcut
            console.log(trianglesCoordinates);
            if (trianglesCoordinates.length==1) {
                console.log(trianglesCoordinates);
                console.log(holes);
                //add the other triangle, update adjset
                ({adjSet, trianglesCoordinates} = addTheOtherTriangle(adjSet, trianglesCoordinates, holes));
                console.log(trianglesCoordinates);
                instructions.text("End of structure storage, now left click to continue. Click again to draw a point on the canvas and we will find which triangle it belongs to in the original graph.");
                trianglesList.push(trianglesCoordinates);
                idx = trianglesList.length-1;
                overlappingTriangles = trianglesList[idx];
                state = 5; // Switch to second sequence
            }else{
                ({trianglesCoordinates, adjSet, newEdges} = ec(holes, trianglesCoordinates, adjSet));
                trianglesList.push(trianglesCoordinates);//Store structure for later use
                svg.selectAll("*").remove();
                renderGraph(svg, adjSet, newEdges);
                instructions.text("Retriangulated the hole/holes, store this! Keep perform the find independent set, remove vertices and edges, retriagulation till there's only the outer triangle left.");
                state = 2;
            }
            break;
        case 5:
            // Input and show target point
            targetPoint = d3.pointer(event, svg); // Get the mouse coordinates relative to the SVG
            showPoints(svg, [targetPoint], "black"); // Show the point on the SVG
            //Create another svg on the side
            svg2 = d3.select("body").append('svg')
                .attr("width", width)
                .attr("height", height)
                .attr('class', 'svg-element') 
                .style("cursor", "crosshair");
            if(isPointInRectangle(targetPoint, outerRectangle)){ // inside outer Triangle?
                state = 7;
            }else{
                instructions.text("Input point is outside with outer rectangle.");
                svg.on("click", null);
            }
            break;
        case 6: // Find overlapping
            if(idx==-1){
                svg2.selectAll("path").remove();
                instructions.text("Found.");
                svg.on("click", null);
            }else{
                svg.selectAll("path").remove();
                showTriangles(svg, trianglesList[idx], "black", "none");
                showTriangles(svg, overlappingTriangles, "black", "red");
                instructions.text("There are the triangles intersect with the previous triangle.");
                state = 7;
            }
            break;
        case 7: // Find triangle contains the point
            targetTriangle = getTargetTriangle(targetPoint, overlappingTriangles);
            svg.selectAll("path").remove();
            showTriangles(svg, trianglesList[idx], "black", "none");
            showTriangles(svg, [targetTriangle], "black", "red");
            if(idx>0){
                overlappingTriangles = getIntersectTriangles(targetTriangle, trianglesList[idx-1]);
                svg2.selectAll("path").remove();
                showTriangles(svg2, overlappingTriangles, "black", "green");
                showTriangles(svg2, trianglesList[idx-1], "black", "none");
            }else{
                svg2.selectAll("path").remove();
            }
            if(idx==0){
                instructions.text("The red triangle contains the target point, and there's no deeper level");
            }else{
                instructions.text("The red triangle contains the target point, the green ones are the triangles overlapping with the red one from the next deeper level");
            }
            idx--;
            state = 6;
            break;
        default:
            console.error('Unknown state:', state);
    }
}


function isPointInRectangle(point, rectangle) {
    // Rectangle points: [topLeft, topRight, bottomRight, bottomLeft]
    let [topLeft, , bottomRight] = rectangle;
    
    let [pointX, pointY] = point;

    let [topLeftX, topLeftY] = topLeft;
    let [bottomRightX, bottomRightY] = bottomRight;

    // Check if the point is within the rectangle
    return pointX >= topLeftX && pointX <= bottomRightX && pointY >= topLeftY && pointY <= bottomRightY;
}