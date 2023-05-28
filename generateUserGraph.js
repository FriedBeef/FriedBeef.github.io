import { convertTrianglesToAdjset } from './convertTrianglesToAdjset.js';
export function generateUserGraph(width, height, userT){
    let points = [];
    let t = [];

    for(let triangle of userT){
        for(let point of triangle){
            points.push(point);
        }
    }
    
    //Define outer rectangle
    let outerRectangle = [[10.0, 10.0], [width-10.0, 10.0], [width-10.0, height-10.0], [10.0, height-10.0]]; 

    //Compute convex hull of userT
    let delaunay = d3.Delaunay.from(points);
    let hullPolygon = delaunay.hullPolygon();
    hullPolygon.pop();
    hullPolygon.reverse();

    let {minXPoint, minYPoint, maxXPoint, maxYPoint} = findExtremaPoints(hullPolygon);
    t = [...userT];

    //Triangulate userT with outer rectangle
    //top left
    recTriangulation(hullPolygon, t, outerRectangle[0], outerRectangle[1], minXPoint, minYPoint);

    //top right
    recTriangulation(hullPolygon, t, outerRectangle[1], outerRectangle[2], minYPoint, maxXPoint);

    //bottom right
    recTriangulation(hullPolygon, t, outerRectangle[2], outerRectangle[3], maxXPoint, maxYPoint);

    //bottom left
    recTriangulation(hullPolygon, t, outerRectangle[3], outerRectangle[0], maxYPoint, minXPoint);

    // console.log(t);
    let adjSet = convertTrianglesToAdjset(t);
    return {adjSet, t, outerRectangle};
}

function recTriangulation(hullPolygon, t, currVertex, nextVertex, start, end){
    let started = false;
    let finished = false;
    let prev = [];
    let idx = 0;
    while(true){
        let i = idx % hullPolygon.length;
        let curr = hullPolygon[i];
        if(arePointsEqual(curr, end)){
            // console.log("end case");
            t.push([currVertex, nextVertex, curr]);
            if(started == true){
                // console.log("end case: add prev");
                t.push([currVertex, prev, curr]);
            }
            started = false;
            break;
        }
        else if(arePointsEqual(curr, start)){
            // console.log("start case");
            started = true;
            prev = curr;
        }
        else if(started == true){
            // console.log("mid case");
            t.push([currVertex, prev, curr]);
            prev = curr;
        }
        idx++;
    }
}

function arePointsEqual(point1, point2) {
    return point1[0] === point2[0] && point1[1] === point2[1];
}

function findExtremaPoints(hullPolygon) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    let minXPoint, minYPoint, maxXPoint, maxYPoint;

    for (let point of hullPolygon) {
        let x = point[0];
        let y = point[1];

        if (x < minX) {
            minX = x;
            minXPoint = point;
        }

        if (x > maxX) {
            maxX = x;
            maxXPoint = point;
        }

        if (y < minY) {
            minY = y;
            minYPoint = point;
        }

        if (y > maxY) {
            maxY = y;
            maxYPoint = point;
        }
    }

    return {minXPoint, minYPoint, maxXPoint, maxYPoint};
}

