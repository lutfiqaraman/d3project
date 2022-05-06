//Loading the data
d3
    .csv("../ch3/data/data.csv", d => {
        return {
            technology: d.technology,
            count: +d.count
        }
    })
    .then(data => {
        // Sort data in descending order
        data.sort((a, b) => b.count - a.count);

        createBarChart(data);
    });

// Create the SVG diagram
const svg = d3.select(".responsive-svg-container")
    .append("svg")
        .attr("viewBox", "0 0 600 700")
        .attr("class", "barChartTable")
        .style("border", "1px solid black")
        .style("background", "#000FEB");

// Create the bar chart
const createBarChart = (data) => {

    svg
        .append("line")
            .attr("x1", 100)
            .attr("y1", 0)
            .attr("x2", 100)
            .attr("y2", 700)
            .attr("stroke", "#FFFFFF");

    //Declare scale
    const xScale = d3.scaleLinear()
        .domain([0, 1078])
        .range([0, 450]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.technology))
        .range([0, 700])
        .paddingInner(0.2);

    const bar = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.technology)})`);

    // Create bars of the chart
    bar
        .append("rect")
            .attr("width", d => xScale(d.count))
            .attr("height", yScale.bandwidth())
            .attr("x", 100)
            .attr("y", 0)
            .attr("fill", d => d.technology === "D3.js" ? "#7C0CF6":"#0C97F6");

    // Add the label of the technology
    bar
        .append("text")
            .text(d => d.technology)
                .attr("x", 95)
                .attr("y", 12)
                .attr("text-anchor", "end")
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .style("fill", "#FFFFFF")

    // Add the label of count of the users
    bar
        .append("text")
        .text(d => d.count)
            .attr("x", d => 100 + xScale(d.count) + 4)
            .attr("y", 12)
            .style("font-family", "sans-serif")
            .style("font-size", "9px")
            .style("fill", "#FFFFFF");


}
