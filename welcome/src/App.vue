<template>
  <div>
    <!-- <div v-for="item in items">
      <input type="checkbox" v-model="item.value" @change="handleCheckbox">
      <div class="label">{{ item.label }}</div>
    </div>
    <div v-for="(item, index) in radios">
      <input type="radio" :checked="item.value" @change="handleRadios(index)">
      <div class="label">{{ item.label }}</div>
    </div>
    <div>
      <select @change="handleChange($event)">
        <option v-for="(item,index) in options" :key="index + item.value" :value="item.value">{{ item.label }}</option>
      </select>
    </div> -->
    <div class="hello" @mouseover="handleEvent" @mouseleave="handleEvent" @mouseup="handleEvent">
      hello world programming
    </div>
    <refs />
  </div>
  <!-- <repActivity /> -->
</template>
<script>
import repActivity from './components/AgGrid/repActivity.vue';
import refs from "./components/ReusableComponents/Refs.vue"
export default {
  name: 'App',
  components: {
    repActivity,
    refs
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
    console.log(sortedData);
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
