export function showTriangles(svg, trianglesCoordinates, color, fill){
    // Define the line generator
    let line = d3.line().x(d => d[0]).y(d => d[1]);

    // Draw each triangle
    trianglesCoordinates.forEach(triangle => {
        svg.append("path")
            .datum(triangle.concat([triangle[0]])) // Add the first point at the end to close the triangle
            .attr("d", line)
            .attr("stroke", color)
            .attr("fill", fill)
            .attr("fill-opacity", 0.5);
    });
}