<template>
  <div>
    <!-- <d3Graph /> -->
     <VerticalBarChart />
  </div>
</template>
<script>
import d3Graph from "./components/D3/D3Graph.vue";
import VerticalBarChart from "./components/D3/VerticalBarChart.vue";
export default {
  name: 'App',
  components: {
    d3Graph,
    VerticalBarChart
  },
  data () {
    return {}
  }
}
</script>
