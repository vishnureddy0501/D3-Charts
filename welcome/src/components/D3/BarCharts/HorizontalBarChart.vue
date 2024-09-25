<template>
	<div class="display-graphs">
		<div class="scrollable-chart">
			<div id="horizontal-bar-chart"></div>
			<div class="labels">
				<div v-for="item in labels" :key="item.label" class="item">
					<div class="circle" :style="{ backgroundColor: item.color }">
					</div>
					<div class="label">{{ item.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as d3 from 'd3';

export default {
	data() {
		return {
			labels: [{ label: 'total', color: 'red' }, { label: 'female', color: 'blue' }, { label: 'male', color: 'green' }]
		}
	},
	mounted() {
		this.createChart();
	},
	methods: {
		createChart() {
			// Data for total, female, and male populations
			const data = [
				{ year: 2023, total: 100, female: 50, male: 50 },
				{ year: 2024, total: 200, female: 100, male: 100 },
				{ year: 2025, total: 300, female: 150, male: 150 },
				{ year: 2026, total: 300, female: 150, male: 150 },
				{ year: 2027, total: 300, female: 150, male: 150 },
				{ year: 2028, total: 300, female: 150, male: 150 },
				{ year: 2029, total: 300, female: 150, male: 150 },
				{ year: 2030, total: 300, female: 150, male: 150 },
				{ year: 2031, total: 300, female: 150, male: 150 }
			];

			const margin = { top: 50, left: 80, right: 50, bottom: 50 };
			const parentWidth = document.querySelector(".scrollable-chart").offsetWidth;
			const width = Math.max(600, parentWidth);
			const height = 600;
			const container = { width: width - margin.left - margin.right, height: height - margin.top - margin.bottom };

			// Create the SVG container
			const svg = d3.select("#horizontal-bar-chart")
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
				.padding(0.3);

			const xScale = d3.scaleLinear()
				.domain([0, d3.max(data, d => d.total)])
				.nice() // round figures
				.range([0, container.width]);

			// Create the sub-groups (for total, female, male) using a sub-scale
			const subgroups = ['total', 'female', 'male'];
			const subYScale = d3.scaleBand()
				.domain(subgroups)
				.range([0, yScale.bandwidth()])
				.padding(0.15);

			// Set colors for total, female, and male bars
			const colorScale = d3.scaleOrdinal()
				.domain(subgroups)
				.range(['red', 'blue', 'green']);

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
				.data(d => subgroups.map(key => ({ key, value: d[key] })))
				.enter()
				.append("rect")
				.attr("class", d => d.key)
				.attr("y", d => subYScale(d.key))
				.attr("x", 0)
				.attr("height", subYScale.bandwidth())
				.attr("width", d => xScale(d.value))
				.attr("fill", d => colorScale(d.key))
				.attr("rx", 5)
				.attr("ry", 5);

			// Append text labels to the bars
			bars.selectAll("text")
				.data(d => subgroups.map(key => ({ key, value: d[key] })))
				.enter()
				.append("text")
				.attr("x", d => xScale(d.value) + 5)  // Position text to the right of the bar
				.attr("y", d => subYScale(d.key) + subYScale.bandwidth() / 2)
				.attr("dy", ".35em")  // Vertically center the text
				.text(d => d.value)
				.attr("fill", "black")
				.attr("font-size", "12px");


			// Tooltip
			const tooltip = d3.select("#horizontal-bar-chart")
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
					const containerChart = document.querySelector("#horizontal-bar-chart").getBoundingClientRect();
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
					const containerChart = document.querySelector("#horizontal-bar-chart").getBoundingClientRect();
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
	/* Limit visible width */
	overflow-x: auto;
	/* Enable horizontal scrolling */
}

.labels {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	margin-top: 1rem;
	justify-content: center;
}

.item {
	display: flex;
	gap: 8px;
	align-items: center;

	.circle {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
}
</style>