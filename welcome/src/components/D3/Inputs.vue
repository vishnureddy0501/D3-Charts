<template>
    <div>
        <div> learning input</div>
        <!-- one way data binding -->
        <input type="text" :value="inputValue"/>

        <!-- Two way data binding -->
        <input type="text" v-model="inputValue"/>
        <button @click="handleClick">Click</button>

        <div>learning checkbox</div>
        <!-- checkbox two way data binding -->
        <div v-for="(item, index) in checkboxItems" :key="index">
            <input type="checkbox" v-model="item.checked" />
            <span>{{item.name}}</span>
        </div>

        <div>learning radio</div>
        <!-- this is the simplest way. follows this. keep "selectedRadio" key and use it -->
        <div v-for="(item, index) in radioData.radioItems" :key="index">
            <input type="radio" :value="item.name" v-model="radioData.selectedRadio"/>
            <span>{{item.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputValue: 'vishnu',
            checkboxItems: [{name: 'vishnu', checked: false}, {name: 'sneha', checked: true}],
            radioData : {
                radioItems: [{name: 'vishnu'}, {name: 'sneha'}],
                selectedRadio: -1
            }
        }
    },
    methods: {
        handleClick () {
            console.log(this.inputValue, this.checkboxItems, this.radioData.radioItems, this.radioData.selectedRadio);
        }
    }
}
</script>