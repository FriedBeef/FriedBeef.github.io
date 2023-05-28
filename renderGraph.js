// export function renderGraph(svg, adjSet) {
//     // Convert adjacency set to links
//     let links = [];
//     for (let [source, targets] of adjSet) {
//         for (let target of targets) {
//             links.push({
//                 source: JSON.parse(source),
//                 target: JSON.parse(target)
//             });
//         }
//     }
  
//     // Define the line generator
//     var line = d3.line()
//         .x(d => d[0])
//         .y(d => d[1]);

//     // Bind data to SVG lines (edges of the graph)
//     var edges = svg.selectAll(".edge")
//         .data(links)
//         .enter().append("path")
//         .attr("class", "edge")
//         .attr("d", d => line([d.source, d.target]))
//         .attr("stroke", "black"); // Add this line to make sure the edges are visible
// }


export function renderGraph(svg, adjSet, redEdges) {
    // Convert redEdges array to a Set for efficient lookup
    let redEdgesSet = new Set(redEdges.map(edge => edge.sort().toString()));

    let links = [];
    for (let [source, targets] of adjSet) {
        for (let target of targets) {
            links.push({
                source: JSON.parse(source),
                target: JSON.parse(target),
                isRed: redEdgesSet.has([source, target].sort().toString())
            });
        }
    }

    // Define the line generator
    var line = d3.line()
        .x(d => d[0])
        .y(d => d[1]);

    // Bind data to SVG lines (edges of the graph)
    var edges = svg.selectAll(".edge")
        .data(links)
        .enter().append("path")
        .attr("class", "edge")
        .attr("d", d => line([d.source, d.target]))
        .attr("stroke", d => d.isRed ? "red" : "black");
}
