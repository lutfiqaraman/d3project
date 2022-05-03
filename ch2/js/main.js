//JS of D3

//Building the SVG to display data
const svg = d3.select('.responsive-svg-container')
    .append('svg')
        .attr('viewBox', '0 0 1200 1600')
        .style('border', "1px solid black")
        .style('background', "#F8F0E3");
