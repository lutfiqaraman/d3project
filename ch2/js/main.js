const svg = d3.select('.responsive-svg-container')
    .append('svg')
        .attr('viewBox', '0 0 1200 1600')
        .style('border', "1px solid black")
        .style('background', "#F8F0E3")


svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 414)
    .attr('height', 16)
    .attr('fill', '#30D5C8');


