<template>
  <div>
    <!-- <d3Graph /> -->
     <ColumnRangeVue />
     <VerticalBarChart />
     <HorizontalBarChart />
      <GroupedColumnBarchartVue />
        <StackedBarsVue />
  </div>
</template>
<script>
import d3Graph from "./components/D3/D3Graph.vue";
import VerticalBarChart from "./components/D3/BarCharts/VerticalBarChart.vue";
import HorizontalBarChart from "./components/D3/BarCharts/HorizontalBarChart.vue";
import GroupedColumnBarchartVue from './components/D3/BarCharts/GroupedColumnBarchart.vue';
import StackedBarsVue from './components/D3/BarCharts/StackedBars.vue';
import ColumnRangeVue from './components/D3/BarCharts/ColumnRange.vue';
export default {
  name: 'App',
  components: {
    d3Graph,
    VerticalBarChart,
    HorizontalBarChart,
    GroupedColumnBarchartVue,
    StackedBarsVue,
    ColumnRangeVue
  },
  data () {
    return {}
  }
}
</script>
