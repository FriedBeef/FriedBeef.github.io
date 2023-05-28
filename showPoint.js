export function showPoint(svg, p, color) {
    console.log(p);
    console.log(svg);
    console.log(color);
    d3.select(svg)
        .append("circle")
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", 10)  // Radius of the circle
        .style("fill", color);  // Color of the circle
}