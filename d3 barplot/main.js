//Define data
const air = d3.csv("listings1.csv");

air.then(function(data) {
  // Convert string values to numbers
  data.forEach(function(d) {
      d.accommodations = +d.accommodations;
  });
  data.sort((a, b) => b.accommodations - a.accommodations);

// Create SVG
let 
  width = 1000,
  height = 600;
  
let margin = {
  top: 40,
  bottom: 30,
  left: 50,
  right: 50
};

let svg = d3
  .select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#e9f7f2');

// Define Scales
let yScale = d3.scaleLinear()
  .domain([0, 20])
  .range([height - margin.bottom, margin.top]);

let xScale = d3.scaleBand()
  .domain(
    data.map(d => d.property_type)
  )
  .range([margin.left, width - margin.right])
  .padding(0.5);

//Draw Axes
let yAxis = svg
  .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

//Add label
yAxis
  .append('text')
    .attr('y', 30)
    .attr('x', 20)
    .style('stroke', 'black')
    .text('Number of Accommodates');

let xAxis = svg
  .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));
  
//Add label
xAxis
  .append('text')
    .attr('x', width - margin.left)
    .attr('y', -10)
    .style('stroke', 'black')
    .text('Property Types');

//Draw bars
let bar = svg
  .selectAll('rect')
    .data(data)
  .enter()
  .append('rect')
    .attr('x', d => xScale(d.property_type))
    .attr('y', d => yScale(d.accommodations))
    .attr('width', xScale.bandwidth())
    .attr('height', d => 
          height - margin.bottom - yScale(d.accommodations)
      )
      .attr('fill', 'steelblue');

//tooltip:
var tooltip = d3.select("#barplot")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")

//Interaction
bar
    .on('mouseover', function(d) {
      d3.select(this)
        .transition()
          .delay(200)
          .duration(1000)
        .style('fill', 'red');
    })

    
    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
          .delay(200)
          .duration(1000)
        .style('fill', 'steelblue');
    });
});
