export function showTriangle(svg, triangle) {
    // Append lines to the SVG
    for (let i = 0; i < 3; i++) {
      const p1 = triangle[i];
      const p2 = triangle[(i + 1) % 3];
  
      svg.append("line")
        .attr("x1", p1[0])
        .attr("y1", p1[1])
        .attr("x2", p2[0])
        .attr("y2", p2[1])
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("class", "triangle-edge-class");
    }
  }
  