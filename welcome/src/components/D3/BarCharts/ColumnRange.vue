<template>
	<div class="display-graphs">
		<div class="scrollable-chart">
            <div class="graph-label"> Population Range in the Start of year and end of the year</div>
			<div id="temparature-variation"></div>
		</div>
	</div>
</template>

<script>
import * as d3 from 'd3';

export default {
	data() {
		return {}
	},
	mounted() {
		this.createChart();
	},
	methods: {
		createChart() {
			const data = [
				{ year: 2023, variation: 100, start: 100, end: 200 },
				{ year: 2024, variation: 200, start: 150, end: 350 },
				{ year: 2025, variation: 300, start: 500, end: 800 },
				{ year: 2026, variation: 300, start: 500, end: 800 }
			];

			const margin = { top: 50, left: 80, right: 50, bottom: 50 };
			const parentWidth = document.querySelector(".scrollable-chart").offsetWidth;
			const width = Math.max(600, parentWidth);
			const height = 600;
			const container = { width: width - margin.left - margin.right, height: height - margin.top - margin.bottom };

			// Create the SVG container
			const svg = d3.select("#temparature-variation")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`);

			svg.append("rect")
				.attr("width", container.width)
				.attr("height", container.height)
				.attr("fill", "white");

			// Set x and y scales
			const yScale = d3.scaleBand()
				.domain(data.map(d => d.year))
				.range([container.height, 0])
				.padding(0.8);

			const xScale = d3.scaleLinear()
				.domain([0, d3.max(data, d => d.end)])
				.nice() // round figures
				.range([0, container.width]);

			const subgroups = ['variation'];
			const subYScale = d3.scaleBand()
				.domain(subgroups)
				.range([0, yScale.bandwidth()])
				.padding(0.15);

			const colorScale = d3.scaleOrdinal()
				.domain(subgroups)
				.range(['red']);

			// Add x and y axis
			svg.append("g")
				.attr("class", "y-axis")
				.call(d3.axisLeft(yScale).ticks(data.length));

			svg.append("g")
				.attr("class", "x-axis")
				.attr("transform", `translate(0, ${container.height})`)
				.call(d3.axisBottom(xScale).ticks(5));

			// Append the bars
			const bars = svg.selectAll("g.layer")
				.data(data)
				.enter()
				.append("g")
				.attr("transform", d => `translate(0, ${yScale(d.year)})`);

			bars.selectAll("rect")
				.data(d => subgroups.map(key => ({ key, value: d[key], start: d.start, end: d.end })))
				.enter()
				.append("rect")
				.attr("class", d => d.key)
				.attr("y", d => subYScale(d.key))
				.attr("x", d => xScale(d.start))
				.attr("height", subYScale.bandwidth())
				.attr("width", d => xScale(d.value))
				.attr("fill", d => colorScale(d.key))
				.attr("rx", 5)
				.attr("ry", 5);

			// Append text labels to the bars
			bars.selectAll(".end-text") // select the end-text in bars.
				.data(d => subgroups.map(key => ({ key, value: d[key], start: d.start, end: d.end })))
				.enter()
				.append("text")
				.attr("x", d => xScale(d.end) + 5)  // Position text to the right of the bar
				.attr("y", d => subYScale(d.key) + subYScale.bandwidth() / 2)
				.attr("dy", ".35em")  // Vertically center the text
				.text(d => d.end)
				.attr("fill", "black")
				.attr("font-size", "12px");
			
			// Append text labels to the bars
			bars.selectAll(".start-text")
				.data(d => subgroups.map(key => ({ key, value: d[key], start: d.start, end: d.end })))
				.enter()
				.append("text")
				.attr("x", d => {
					const val = d.start.toString();
					return xScale(d.start) - val.length * 8;
				})  // Position text to the right of the bar
				.attr("y", d => subYScale(d.key) + subYScale.bandwidth() / 2)
				.attr("dy", ".35em")  // Vertically center the text
				.text(d => d.start)
				.attr("fill", "black")
				.attr("font-size", "11px");


			// Tooltip
			const tooltip = d3.select("#temparature-variation")
				.append("div")
				.attr("class", "tooltip")
				.style("position", "absolute")
				.style("background-color", "white")
				.style("color", "#333")
				.style("padding", "8px")
				.style("border-radius", "4px")
				.style("border", "1px solid #ddd")
				.style("box-shadow", "0px 4px 10px rgba(0, 0, 0, 0.1)")
				.style("font-size", "0.875rem")
				.style("opacity", "0")
				.style("pointer-events", "none");  // Prevent blocking mouse interactions


			svg.selectAll("rect")
				.on("mouseover", (event, d) => {
					const containerChart = document.querySelector("#temparature-variation").getBoundingClientRect();
					if (d) {
						svg.selectAll("rect")
							.filter(function () {
								// console.log(this, d.key);
								return !this.classList.contains(d.key)
								// return this !== event.target;
							})
							.transition()
							.duration(200)
							.style("opacity", 0.5); // Set opacity for non-hovered bars

						tooltip.html(`<div>${d.key}: ${d.value}</div>`)
							.style("left", `${event.clientX - containerChart.left + 20}px`)
							.style("top", `${event.clientY - containerChart.top}px`)
							.style("opacity", 1);
					}
				})
				.on("mousemove", (event, d) => {
					const containerChart = document.querySelector("#temparature-variation").getBoundingClientRect();
					if (d) {
						tooltip.html(`<div>${d.key}: ${d.value}</div>`)
							.style("left", `${event.clientX - containerChart.left + 20}px`)
							.style("top", `${event.clientY - containerChart.top}px`)
							.style("opacity", 1);
					}
				})
				.on("mouseout", () => {
					svg.selectAll("rect")
						.transition()
						.duration(200)
						.style("opacity", 1); // Reset opacity
					tooltip.style("opacity", 0);
				});

			// Remove ticks, but keep x and y axis lines
			d3.selectAll('.tick line').style('stroke', 'none');
			d3.selectAll('.y-axis .domain').style('stroke', 'none');
			d3.selectAll('.x-axis .domain').style('stroke', 'rgb(230, 230, 230)');

			// Y-axis label
			svg.append('text')
				.attr("class", "label")
				.text('Population (in Millions)')
				.attr("text-anchor", "middle")
				.attr("fill", 'rgb(102, 102, 102)')
				.attr("font-size", "0.875rem")
				.attr('transform', `translate(${container.width / 2}, ${container.height + 40})`);

			// X-axis label
			svg.append('text')
				.attr("class", "label")
				.text('Years')
				.attr("text-anchor", "middle")
				.attr("fill", 'rgb(102, 102, 102)')
				.attr("font-size", "0.875rem")
				.attr('transform', `translate(${-50}, ${container.height / 2}) rotate(-90)`);
		}
	}
};
</script>

<style scoped lang="scss">
.display-graphs {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	position: relative;
	margin-left: 2rem;
}

.scrollable-chart {
	width: 900px;
	overflow-x: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .graph-label {
        font-size: 1rem;
        font-weight: 600;
    }
}
</style>