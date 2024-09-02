<template>
  <div>
    <div class="">Learning Vue js</div>
    <i class="fa-solid fa-pencil"></i>
    <loadingAnimation />
    <toolTips />
    <Transitions />

    <d3Graph />
    <!--
    <div>
      <select @change="handleChange($event)">
        <option v-for="(item,index) in options" :key="index + item.value" :value="item.value">{{ item.label }}</option>
      </select>
    </div> -->
    <refs />
  </div>
  <!-- <repActivity /> -->
</template>
<script>
import loadingAnimation from './components/CSS/LoadingAnimation.vue';
import toolTips from './components/CSS/toolTips.vue';
import Transitions from './components/CSS/Transitions.vue'

import repActivity from './components/AgGrid/repActivity.vue';
import refs from "./components/ReusableComponents/Refs.vue"
import d3Graph from "./components/D3/D3Graph.vue";
export default {
  name: 'App',
  components: {
    repActivity,
    refs,
    d3Graph,
    loadingAnimation,
    toolTips,
    Transitions
  },
  data () {
    return {
      items: [{
          value: true,
          label: "vishnu"
        },
        {
          value: false,
          label: "vardhan"

        }
      ],
      options: [{
          value: "vishnu",
          label: "vishnu",
          selected: false
        },
        {
          value: "vardhan",
          label: "vardhan",
          selected: false

        }
      ],
      radios: [{
          value: false,
          label: "vishnu"
        },
        {
          value: false,
          label: "vardhan"
        }
      ]
    }
  },
  mounted () {
    const data =  [{name: "vishnu", age: 22}, {name: "sneha", age: 20}, {name: "vijaya", age: 40}];
    const sortedData = [];
    sortedData.push(data[0]);
    for(let i = 1;i<data.length;i++){
      const index = sortedData.findIndex(item => item.age >data[i].age);
      if(index == -1) {
        sortedData.push(data[i]);
      } else {
        sortedData.splice(index, 0, data[i]);
      }
    }
  },
  methods: {
    handleScrollend (event) {
      console.log("make api call");
    },
    handleEvent (event) {
      // console.log(event);
    },
    handleChange (event) {
      console.log(event.target.selectedIndex); // this gives the slected index
    },
    handleCheckbox () {
      console.log(this.items);
    },
    handleRadios (selectedItem) {
      this.radios = this.radios.map((item, index)=>{
        if(index === selectedItem) {
          return {
            ...item,
            value: true
          }
        } else {
          return {
            ...item,
            value: false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.hello {
  height: 150px;
  width: 150px;
  white-space: nowrap;
  overflow: scroll;
}
</style>
