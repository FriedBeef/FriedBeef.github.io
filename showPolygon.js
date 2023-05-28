export function showPolygon(svg, polygon, color, fill){
    let pathData = d3.line()(polygon);
    svg.append("path")
       .attr("d", pathData)
       .attr("fill", fill)
       .attr("stroke", color);
}