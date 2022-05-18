const csvFilePath = "../ch4/data/weeklyTemperature.csv";

d3
    .csv(csvFilePath, d3.autoType)
    .then(data => {
        drawLineChart(data);
    });

const drawLineChart = (data) => {
    const margin = {
        top: 40,
        right: 170,
        bottom: 25,
        left: 40
    };

    const width = 1000;
    const height = 500;

    const innerWidth  = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


}
