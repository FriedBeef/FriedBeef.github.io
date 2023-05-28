export function showPoints(svg, points, color) {
    svg.selectAll("circle")  // select all current points (initially, there are none)
        .data(points)  // bind the points data
        .enter()  // for any new points in the data...
        .append("circle")  // append a circle to the SVG for each one
        .attr("cx", d => d[0])  // the x-coordinate of the center of the circle is the x property of the point
        .attr("cy", d => d[1])  // the y-coordinate of the center of the circle is the y property of the point
        .attr("r", 5)  // the radius of the circle is 5
        .style("fill", color);  // the color of the circle is steel blue
}
