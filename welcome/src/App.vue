<template>
  <div>
    <div class="">Learning Vue js</div>
    <d3Graph />
  </div>
</template>
<script>
import d3Graph from "./components/D3/D3Graph.vue";
export default {
  name: 'App',
  components: {
    d3Graph
  },
  data () {
    return {}
  }
}
</script>
