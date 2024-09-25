<template>
  <div class="display-graphs">
    <div id="bar-chart"></div>
    <lineGraphView />
    <areaGraph />
    <PentagonChartVue />
    <div class="tooltip"></div>
  </div>
  </template>
  <script>
  import * as d3 from 'd3';
  import lineGraphView from "./D3LineGraph.vue"
  import areaGraph from './AreaGraph.vue';
  import PentagonChartVue from './PentagonChart.vue';
  
  export default {
    mounted() {
      this.createChart();
    },
    components: {
      lineGraphView,
      areaGraph,
      PentagonChartVue
    },
    methods: {
      createChart() {
        // using categorical data on both x-axis, y-axis
        const data = [{xLabel: '2023', yLabel: 'Jan'},{xLabel: '2024', yLabel: 'Feb'},{xLabel: '2025', yLabel: 'Mar'}];
        const margin = {top: 50, left: 50, right: 50, bottom: 50};
        const width = 400;
        const height = 400;
        const container = {width: width - margin.left - margin.right, height: height- margin.top - margin.bottom};
        const svg = d3.select("#bar-chart")
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
            const yAxis = d3.scaleBand().domain(data.map((d) => d.yLabel)).range([container.height, 0]).padding(1);

            svg
            .append("g")
            .call(d3.axisBottom(xAxis))
            .attr("transform", `translate(0, ${container.height})`);
            svg.
            append("g")
            .call(d3.axisLeft(yAxis));

            const tooltip = d3.select("#bar-chart")
                            .append("div")
                            .attr("class", "tooltip");
            svg.selectAll(".bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bars")
            .attr("x", (d) => xAxis(d.xLabel))
            .attr("y", (d)=> yAxis(d.yLabel))
            .attr("width", xAxis.bandwidth())
            // when you draw horizontal line from yaxis, bar top should equal to y-axis label. this logic helps for that.
            .attr("height", (d) => container.height - (yAxis(d.yLabel) + yAxis.bandwidth()/2))
            .attr("transform", `translate(0, ${yAxis.bandwidth()/2})`)
            .attr("fill", "red")
            .on('mouseover', (event, d)=>{
              tooltip.html(`<div>xLabel:${d.xLabel}</div>
              <div>yLabel:${d.value}</div>`)
              .style("left", `${event.pageX + 20}px`)
              .style("top", `${event.pageY + 20}px`)
              .style("opacity", 1);
            })
            .on('mousemove', (event, d)=>{
              tooltip.html(`<div>xLabel:${d.xLabel}</div>
              <div>yLabel:${d.value}</div>`)
              .style("left", `${event.pageX + 20}px`)
              .style("top", `${event.pageY + 20}px`)
              .style("opacity", 1);
            })
            .on('mouseout', ()=>{
              tooltip.style("opacity", 0); 
            });
      }
    }
  };
  </script>
  
  <style scoped>
    .display-graphs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .tooltip {
      position: absolute;
      background-color: #151b42;
      color: white;
      padding: 6px;
      opacity: 0;
    }
  </style>
  