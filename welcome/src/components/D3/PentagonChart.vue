<template>
    <div ref="svgContainer"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    name: 'PentagonDiagram',
    mounted() {
      this.drawPentagon();
    },
    methods: {
      drawPentagon() {
        const width = 400;
        const height = 400;
        const radius = 100;
        const numSides = 5;
        const centerX = width / 2;
        const centerY = height / 2;
  
        // Create SVG container
        const svg = d3.select(this.$refs.svgContainer)
          .append('svg')
          .attr('width', width)
          .attr('height', height);
  
        // Calculate points for the pentagon
        const angleStep = (2 * Math.PI) / numSides;
        const points = d3.range(numSides).map(i => {
          const angle = i * angleStep - Math.PI / 2; // Start at the top
          return [
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle),
          ];
        });
  
        // Close the pentagon by repeating the first point at the end
        points.push(points[0]);
  
        // Create a line generator
        const line = d3.line()
          .x(d => d[0])
          .y(d => d[1]);
  
        // Draw the pentagon
        svg.append('path')
          .attr('d', line(points))
          .attr('stroke', 'black')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
      }
    }
  };
  </script>
  
  <style scoped>
  svg {
    background-color: #f3f3f3;
  }
  </style>
  