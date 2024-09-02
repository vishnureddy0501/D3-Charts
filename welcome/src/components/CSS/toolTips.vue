<template>
    <!-- Explore more on styling tooltips -->
    <div class="text">
        <!-- you can hover on tooltips. this is the best tooltip that i saw -->
        <div>On Hovering, We need Tooltip</div>
        <div class="tooltip">bottom tooltip</div>
        <div class="tooltip1">top tooltip</div>
        <div class="tooltip2">right tooltip</div>
        <div class="tooltip3">left tooltip</div>
    </div>
</template>

<script>

export default {
    data () {
        return {

        }
    }
}
</script>
<style scoped lang="scss">
.text {
    &:hover {
        .tooltip, .tooltip1, .tooltip2, .tooltip3 {
            visibility: visible;
        }
    }
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    width: fit-content;
    position: relative;
    .tooltip {
        background: #3d4689;
        padding: 0.5rem;
        color: white;
        position: absolute;
        top: 100%;
        visibility: hidden;
        &::after {
            content: "";
            position: absolute;
            top: 0%;
            left: 50%;
            margin-top: -16px; /*for positioning arrow */
            margin-left: -10px; /*for positioning arrow horizontally aligned */
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #3d4689 transparent;
        }
    }
    .tooltip1 {
        background: #3d4689;
        padding: 0.5rem;
        color: white;
        position: absolute;
        bottom: 100%;
        visibility: hidden;
        &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -10px; /*for positioning arrow horizontally aligned */
            border-width: 10px;
            border-style: solid;
            border-color: #3d4689 transparent transparent transparent;
        }
    }
    .tooltip2 {
        background: #3d4689;
        padding: 0.5rem;
        color: white;
        position: absolute;
        max-width: 10rem;
        left: 105%;
        top: -50%;
        visibility: hidden;
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0%;
            margin-left: -15px;
            margin-top: -10px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent #3d4689 transparent transparent;
        }
    }
    .tooltip3 {
        background: #3d4689;
        padding: 0.5rem;
        color: white;
        position: absolute;
        right: 105%;
        max-width: 10rem;
        top: -50%;
        visibility: hidden;
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            margin-left: 5px;
            margin-top: -10px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent transparent #3d4689;
        }
    }
}
</style>
