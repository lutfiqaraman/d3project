const csvFilePathWeeklyTemperatureData = "../ch4/data/weeklyTemperature.csv";

d3
    .csv(csvFilePathWeeklyTemperatureData, d3.autoType)
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

    const innerWidth  = width - (margin.right + margin.left);
    const innerHeight = height - (margin.top + margin.bottom);

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //====================
    //====================

    const firstDate = d3.min(data, d => d.date);
    const lastDate  = d3.max(data, d => d.date);

    const xScale = d3.scaleTime()
        .domain([d3.timeMonth.floor(firstDate), lastDate])
        .range([0, innerWidth]);

    const maxTemp = d3.max(data, d => d.max_temp_F);

    const yScale = d3.scaleLinear()
        .domain([0, maxTemp])
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b"));

    //X axis configuration
    innerChart
        .append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    d3.selectAll(".axis-x text")
        .attr("x", d => {
            const currentMonth = d;
            const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
            return (xScale(nextMonth) - xScale(currentMonth)) / 2;
        })
        .attr("y", "10px");

    //Y axis configuration
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("class", "axis-y")
        .call(leftAxis);

    d3.selectAll(".axis-y text")
        .attr("x", "-5px");

    d3.selectAll(".axis-x text, .axis-y text")
        .style("font-family", "Roboto, sans-serif")
        .style("font-size", "12px");

    svg
        .append("text")
        .text("Temperature (°F)")
        .attr("y", 20);

    const blueSky = "#2d5d83";

    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("r", 4)
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.avg_temp_F))
            .attr("fill", blueSky);

    const lineGenerator = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.avg_temp_F));

    innerChart
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", blueSky);

    const areaGenerator = d3.area()
        .x(d => xScale(d.date))
        .y0(d => yScale(d.min_temp_F))
        .y1(d => yScale(d.max_temp_F))
        .curve(d3.curveCatmullRom);

    innerChart
        .append("path")
        .attr("d", areaGenerator(data))
        .attr("fill", blueSky)
        .attr("fill-opacity", 0.2);

    innerChart
        .append("text")
        .text("Average temperature")
        .attr("x", xScale(lastDate) + 10)
        .attr("y", yScale(data[data.length - 1].avg_temp_F))
        .attr("dominant-baseline", "middle")
        .attr("fill", blueSky);

    innerChart
        .append("text")
        .text("Maximum temperature")
        .attr("x", xScale(data[data.length - 4].date) + 13)
        .attr("y", yScale(data[data.length - 4].max_temp_F) - 20)
        .attr("fill", blueSky);

    innerChart
        .append("line")
        .attr("x1", xScale(data[data.length - 4].date))
        .attr("y1", yScale(data[data.length - 4].max_temp_F) - 3)
        .attr("x2", xScale(data[data.length - 4].date) + 10)
        .attr("y2", yScale(data[data.length - 4].max_temp_F) - 20)
        .attr("stroke", blueSky)
        .attr("stroke-width", 2);

    innerChart
        .append("text")
        .text("Minimum temperature")
        .attr("x", xScale(data[data.length - 3].date) + 13)
        .attr("y", yScale(data[data.length - 3].min_temp_F) + 20)
        .attr("alignment-baseline", "hanging")
        .attr("fill", blueSky);

    innerChart
        .append("line")
        .attr("x1", xScale(data[data.length - 3].date))
        .attr("y1", yScale(data[data.length - 3].min_temp_F) + 3)
        .attr("x2", xScale(data[data.length - 3].date) + 10)
        .attr("y2", yScale(data[data.length - 3].min_temp_F) + 20)
        .attr("stroke", blueSky)
        .attr("stroke-width", 2);
}

