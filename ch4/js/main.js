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

    const firstDate = d3.min(data, d => d.date);
    const lastDate  = d3.max(data, d => d.date);

    const xScale = d3.scaleTime()
        .domain([firstDate, lastDate])
        .range([0, innerWidth]);

    const maxTemp = d3.max(data, d => d.max_temp_F);
    const yScale = d3.scaleLinear()
        .domain([0, maxTemp])
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale);
    innerChart
        .append("g")
        .attr("class", "axis-x")
        .call(bottomAxis);


}
