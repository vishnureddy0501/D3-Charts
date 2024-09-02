<template>
    <div>
        <div>Line Graph</div>
        <div id="line-graph-view"></div>
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
        const data = [
    { xLabel: '2021', value: 50 },
    { xLabel: '2022', value: 180 },
    { xLabel: '2023', value: 90 },
    { xLabel: '2024', value: 300 },
    { xLabel: '2025', value: 150 },
    { xLabel: '2026', value: 275 },
    { xLabel: '2027', value: 60 },
    { xLabel: '2028', value: 340 },
    { xLabel: '2029', value: 230 },
    { xLabel: '2030', value: 410 },
    { xLabel: '2031', value: 95 },
    { xLabel: '2032', value: 500 },
    { xLabel: '2033', value: 330 },
    { xLabel: '2034', value: 240 },
    { xLabel: '2035', value: 120 },
    { xLabel: '2036', value: 360 },
    { xLabel: '2037', value: 260 },
    { xLabel: '2038', value: 180 },
    { xLabel: '2039', value: 440 },
    { xLabel: '2040', value: 280 },
    { xLabel: '2041', value: 320 },
    { xLabel: '2042', value: 230 },
    { xLabel: '2043', value: 170 },
    { xLabel: '2044', value: 460 },
    { xLabel: '2045', value: 210 },
    { xLabel: '2046', value: 250 },
    { xLabel: '2047', value: 70 },
    { xLabel: '2048', value: 370 },
    { xLabel: '2049', value: 190 },
    { xLabel: '2050', value: 400 },
    { xLabel: '2051', value: 140 },
    { xLabel: '2052', value: 310 },
    { xLabel: '2053', value: 220 },
    { xLabel: '2054', value: 340 },
    { xLabel: '2055', value: 160 },
    { xLabel: '2056', value: 430 },
    { xLabel: '2057', value: 120 },
    { xLabel: '2058', value: 290 },
    { xLabel: '2059', value: 250 },
    { xLabel: '2060', value: 380 },
    { xLabel: '2061', value: 200 },
    { xLabel: '2062', value: 420 },
    { xLabel: '2063', value: 150 },
    { xLabel: '2064', value: 370 },
    { xLabel: '2065', value: 100 },
    { xLabel: '2066', value: 450 },
    { xLabel: '2067', value: 240 },
    { xLabel: '2068', value: 330 },
    { xLabel: '2069', value: 160 },
    { xLabel: '2070', value: 390 },
    { xLabel: '2071', value: 280 },
    { xLabel: '2072', value: 320 },
    { xLabel: '2073', value: 230 },
    { xLabel: '2074', value: 350 },
    { xLabel: '2075', value: 270 },
    { xLabel: '2076', value: 400 },
    { xLabel: '2077', value: 120 },
    { xLabel: '2078', value: 410 },
    { xLabel: '2079', value: 220 },
    { xLabel: '2080', value: 360 },
    { xLabel: '2081', value: 260 },
    { xLabel: '2082', value: 380 },
    { xLabel: '2083', value: 170 },
    { xLabel: '2084', value: 330 }
      ];

        const margin = {top: 50, left: 50, right: 50, bottom: 50};
        const width = 400;
        const height = 400;
        const container = {width: width - margin.left - margin.right, height: height- margin.top - margin.bottom};
        const svg = d3.select("#line-graph-view")
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
            // .call(d3.axisBottom(xAxis))
            .call(d3.axisBottom(xAxis).tickValues(xAxis.domain().filter((d, i) => !(i % 15)))) // Display every 5th label
            .attr("transform", `translate(0, ${container.height})`);
            svg.
            append("g")
            .call(d3.axisLeft(yAxis).ticks(5)); // Reduce number of y-axis labels
            // .call(d3.axisLeft(yAxis));

            const line = d3.line()
              .x(d => xAxis(d.xLabel) + (xAxis.bandwidth()/2))
              .y(d => yAxis(d.value));

            svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 2)
              .attr("d", line);

            const tooltip = d3.select("#line-graph-view").append("div").attr("class", "line-tooltip");
            const dotsize = 4;
            svg.selectAll(".dots")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dots")
            .attr("cx", (d) => xAxis(d.xLabel) + (xAxis.bandwidth()/2))
            .attr("cy", (d)=> yAxis(d.value))
            .attr("r", dotsize)
            .attr("fill", "steelblue").
            on('mouseover',function (event, d) {
                d3.select(this)
                  .attr("stroke", "red")
                  .attr("stroke-width", 2);
                const left = event.pageX + 20;
                const top = event.pageY + 20;
                tooltip.style("left", `${left}px`)
                .style("top", `${top}px`)
                .style("opacity", 1)
                .html(`<div>xValue:${d.xLabel}</div><div>yValue${d.value}</div>`);
            }).on('mousemove', function (event, d) {
              d3.select(this)
                  .attr("stroke", "red")
                  .attr("stroke-width", 2);
                const left = event.pageX + 20;
                const top = event.pageY + 20;
                tooltip.style("left", `${left}px`)
                .style("opacity", 1)
                .style("top", `${top}px`)
                .html(`<div>xValue:${d.xLabel}</div><div>yValue${d.value}</div>`);
            }).on('mouseout', function (event, d) {
              d3.select(this)
                .attr("stroke", "none");
              tooltip.style("opacity", 0);
            });

            svg.append("text")
            .attr("class", "label")
            .text('Years')
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${container.width/2}, ${container.height + 40})`)

            svg.append("text")
            .attr("class", "label")
            .text('Number of Companies Applied')
            .attr("text-anchor", "middle")
            .attr("transform", `translate(-40, ${container.height/2}) rotate(-90)`);





            const data1 = [{xLabel: '2023', value: 10},{xLabel: '2024', value: 50},{xLabel: '2025', value: 90}];

            svg.append("path")
              .datum(data1)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 2)
              .attr("d", line);

            svg.selectAll(".dots1")
            .data(data1)
            .enter()
            .append("rect")
            .attr("class", "dots1")
            /*
              you can't write .attr("transform", "rotate(90)").
              Here you are not giving coordinates around which you should rotate. it will cause some issues. 
              so best approach is to rotate around the center of rectange.
              How you will get the center coordinates? nothing but coordinates of point.
            */
            .attr("transform", (d) => {
                const x = xAxis(d.xLabel) + (xAxis.bandwidth() / 2);
                const y = yAxis(d.value);
                return `rotate(35, ${x}, ${y})`;  // Rotate around the center of the rectangle
            })
            .attr("x", (d) => xAxis(d.xLabel) + (xAxis.bandwidth()/2) -6)
            .attr("y", (d)=> yAxis(d.value) - (dotsize/2))
            .attr("width", 2*dotsize)
            .attr("height", 2*dotsize)
            .attr("fill", "steelblue");
      }
    }
  };
  </script>
  
  <style>
  .line-tooltip {
    position: absolute;
    padding: 0.375rem;
    background: white;
    box-shadow: 0.125rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    opacity: 1;
  }
  </style>
  