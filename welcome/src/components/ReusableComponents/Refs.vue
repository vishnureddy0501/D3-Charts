<template>
    <!-- refs are instance specific. so ref in one instance won't affect other instance  -->
<div ref="name" @click="handleClick">
    <div v-for="(item, index) in items" :key="item.value" :ref="`item-${index}`">
        {{ item.value }}
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            items: [{value: "ongole"}, {value: "guntur"}]

        }
    },
    methods: {
        handleClick () {
            console.log(this.$refs.name);
            const name = this.$refs.name; // for accessing the hardcoded ref name. you can do this also this.$refs['name']
            // const name1 = this.$refs['item-0']; for accessing the dynamic ref name;
            name.style.marginLeft = '50px';
            console.log(name.getBoundingClientRect(),name.offsetHeight, name.offsetWidth);
            console.log(window);
            // window.innerHeight give height. window.innerWidth gives width
            // we have to use innerHeight and innerWidth (these excludes the browsers toolbars, bookmark bars etc)
            console.log(this.$refs);
        }
    }
}
</script>