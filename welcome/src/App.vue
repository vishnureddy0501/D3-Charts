<template>
  <div>
    <div v-for="item in items">
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
    </div>
  </div>
  <repActivity />
</template>
<script>
import repActivity from './components/AgGrid/repActivity.vue';
export default {
  name: 'App',
  components: {
    repActivity
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
  methods: {
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

<style>
</style>
