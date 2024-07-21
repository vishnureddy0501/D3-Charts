<template>
    <div class="rep-act-tab-opp-cell">
        {{ params.value }}
    </div>
</template>

<script>
    export default {
        mounted () {
            // console.log("RepActivityValueCell : " , this.params);
        }
    };
</script>

<style lang="scss" scoped>
    .rep-act-tab-opp-cell{
        color: #404255;
        font-family: Poppins;
        font-size: 14px;
        font-weight: 500;
    }
</style>
