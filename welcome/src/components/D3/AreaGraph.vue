<template>
    <div>
        <div id="area-graph-view"></div>
    </div>
  </template>

  <script>
  import * as d3 from 'd3';
  
  export default {
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        // xAxis categorical data and y axis continuous data
        const data = [{xLabel: '2023', value: 100},{xLabel: '2024', value: 200},{xLabel: '2025', value: 400}];
        const margin = {top: 50, left: 50, right: 50, bottom: 50};
        const width = 400;
        const height = 400;
        const container = {width: width - margin.left - margin.right, height: height- margin.top - margin.bottom};
        const svg = d3.select("#area-graph-view")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);;
                    svg.append("rect")
                    .attr("width", container.width)
                    .attr("height", container.height)
                    .attr("fill", "yellow");

            const xAxis = d3.scaleBand().domain(data.map((d) => d.xLabel)).range([0, container.width]).padding(0.5);
            const yAxis = d3
                    .scaleLinear()
                    .domain([0, Math.max(...data.map((item) => item.value)) + 50]) // Math.max taks input as list of numbers. not array. so passing list to it
                    .range([container.height, 0]);

            svg
            .append("g")
            .call(d3.axisBottom(xAxis))
            .attr("transform", `translate(0, ${container.height})`);
            svg.
            append("g")
            .call(d3.axisLeft(yAxis));

            const area = d3.area()
            .x(d => xAxis(d.xLabel) + xAxis.bandwidth() / 2)
                .y0(container.height)
                .y1(d => yAxis(d.value));

            svg.append("path")
              .datum(data)
              .attr("fill", "green")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 2)
              .attr("d", area);

            svg.selectAll(".dots")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dots")
            .attr("cx", (d) => xAxis(d.xLabel) + (xAxis.bandwidth()/2))
            .attr("cy", (d)=> yAxis(d.value))
            .attr("r", 6)
            .attr("fill", "red");

            svg.append("text")
            .attr("class", "label")
            .text('Years')
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${container.width/2}, ${container.height + 40})`)
      }
    }
  };
  </script>
  
  <style>
  /* Add any styles you need here */
  </style>
  