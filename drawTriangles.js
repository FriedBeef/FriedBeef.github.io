export function drawTriangles(){
    let points = [];
    let triangles = [];
    let edges = [];

    svg.on('click', function(event) {
        // Add a point where the user clicked
        let coords = d3.pointer(event);
        let newPoint = [coords[0], coords[1]];
        points.push(newPoint);

        // Draw the point on the SVG
        svg.append('circle')
            .attr('cx', newPoint[0])
            .attr('cy', newPoint[1])
            .attr('r', 5)
            .style('fill', 'black');

        // If there are at least three points, we can form a triangle
        if (points.length >= 3) {
            let newTriangle = [points[points.length-3], points[points.length-2], points[points.length-1]];
            triangles.push(newTriangle);
            edges.push();
            // Draw the triangle on the SVG
            showTriangle(svg, newTriangle);
        }
    });

    svg.on('mousemove', function(event) {
        // Remove any existing possible triangle
        svg.selectAll('.possible').remove();

        // If there are fewer than two points, we can't form a triangle, so exit
        if (points.length <= 2) return;

        // Get the mouse position
        let coords = d3.pointer(event);

        // Create a possible triangle using the last point and the mouse position
        let closestLine = getClosestLine(coords, triangles);
        let possibleTriangle = [closestLine[0], closestLine[1], [coords[0], coords[1]]];
        // Draw the possible triangle on the SVG
        svg.append('polygon')
            .attr('class', 'possible')
            .attr('points', possibleTriangle.map(p => [p[0], p[1]]).join(' '))
            .style('stroke', 'yellow')
            .style('fill', 'yellow')
            .style('opacity', 0.5);
    });
}
function getClosestLine(coords, triangles) {
    // Iterate over each triangle
    let minDist = Infinity;
    let closestLine = null;
    for (let triangle of triangles) {
        // For each triangle, calculate the distance to each line
        for (let i = 0; i < 3; i++) {
            let p1 = triangle[i];
            let p2 = triangle[(i+1)%3];
            // Calculate the distance from the mouse to the line
            let dist = Math.abs((p2.y - p1.y)*coords[0] - (p2.x - p1.x)*coords[1] + p2.x*p1.y - p2.y*p1.x) / Math.sqrt((p2.y - p1.y)**2 + (p2.x - p1.x)**2);
            // Update minDist and closestLine if this line is closer
            if (dist < minDist) {
                minDist = dist;
                closestLine = [p1, p2];
            }
        }
    }
    return closestLine;
}