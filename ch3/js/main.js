// Reading data from the file
d3
    .csv('../ch3/data/data.csv', csvFileData => {
        return {
            technology: csvFileData.technology,
            count: +csvFileData.count
        }
    }).then(data => {
    createBarChart(data);
});

// Create the SVG to be used to render the data
const svg = d3.select('.responsive-svg-container')
    .append('svg')
    .attr('viewBox', '0 0 600 700')
    .style('border', "1px solid black")
    .style('background', "#F8F0E3");

// Rendering data as a bar chart
const createBarChart = (data) => {
    const barHeight = 20;

    svg.selectAll('rect')
        .data(data)
        .join('rect')
        .sort((a,b) => b.count - a.count)
        .attr("class", d => {
            return `bar bar-${d.technology}`
        })
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("x", 0)
        .attr("y", (d, i) => (barHeight + 5) * i)
        .attr("fill", "skyblue")
        .attr("fill", d => d.technology === "D3.js" ? "red" : "black")
};
