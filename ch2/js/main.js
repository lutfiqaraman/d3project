const svg = d3.select('.responsive-svg-container')
    .append('svg')
        .attr('viewBox', '0 0 1200 1600')

svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 414)
    .attr('height', 16)
