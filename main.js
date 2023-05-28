import { handleRandomMode } from './handleRandomMode.js';
import { handleInputMode } from './handleInputMode.js';
import { generateRandomGraph } from './generateRandomGraph.js';
import { generateUserGraph } from './generateUserGraph.js';
import { getValidInput } from './getValidInput.js';

var width = 500;
var height = 500;
const instructions1 = d3.select("#instructions1");
const svg = d3.select("body").append('svg') //Create canvas
    .attr("id", "canvas")
    .attr("width", width)
    .attr("height", height)
    .attr('class', 'svg-element') 
    .style("cursor", "crosshair");

let currentMode = null;
document.getElementById("randomMode").addEventListener("click", randomMode);
document.getElementById("inputMode").addEventListener("click", inputMode);
document.getElementById("drawingMode").addEventListener("click", drawingMode);

let trianglesList = [];

function randomMode() {
    if (currentMode === null) {
        currentMode = "randomMode";
        document.getElementById("randomMode").remove();
        document.getElementById("inputMode").remove();
        document.getElementById("drawingMode").remove();
        instructions1.text("Click on the canvas to generate a randon traingulated planar graph");
        let {adjSet, t, innerTrianglesCoordinates, outerTriangle} = generateRandomGraph(width, height);
        trianglesList.push(t); 
        d3.select('#canvas').on('click', function(event) {
            handleRandomMode(svg, width, height, event, instructions1, adjSet, innerTrianglesCoordinates, t, outerTriangle, trianglesList);
        });
    } else {
        console.log("Mode is already set");
    }
}

async function inputMode() {
    if (currentMode === null) {
        currentMode = "inputMode";
        console.log(currentMode);
        document.getElementById("randomMode").remove();
        document.getElementById("inputMode").remove();
        document.getElementById("drawingMode").remove();
        let userT = await getValidInput();  // Wait for Promise resolution
        console.log(userT);
        let {adjSet, t, outerRectangle} = generateUserGraph(width, height, userT);
        console.log(userT);
        console.log(t);
        trianglesList.push(t); 
        instructions1.text("Click on the canvas to visualize your input");
        d3.select('#canvas').on('click', function(event) {
            handleInputMode(svg, width, height, event, instructions1, adjSet, userT, t, outerRectangle, trianglesList);
        });
    } else {
        console.log("Mode is already set");
        console.log(currentMode);
    }
}

function drawingMode() {
    if (currentMode === null) {
        currentMode = "drawingMode";
        document.getElementById("randomMode").remove();
        document.getElementById("inputMode").remove();
        document.getElementById("drawingMode").remove();
        
    } else {
        console.log("Mode is already set");
    }
}
