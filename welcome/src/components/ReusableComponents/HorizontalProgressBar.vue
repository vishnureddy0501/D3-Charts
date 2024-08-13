<template>
    <div class="bar">
        <div class="bar-value">
            {{ v }}%
        </div>
        <div class="bar-display">
            <div class="bar-display-first" :style="{width: v + '%', height: '8px', backgroundColor: '#F04E45'}" :class="{ 'display-first': v === 100 }" />
            <div class="bar-display-second" :style="{width: secondValue + '%', height: '8px', backgroundColor: '#C7CBD6'}" :class="{ 'display-second': secondValue === 100 }" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            v: {
                type: Number,
                default: 0
            }
        },
        computed: {
            secondValue () {
                return 100 - this.v;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@styles/stylesheets/scss/utils/colors.scss';
    @import '@styles/stylesheets/scss/utils/font-settings.scss';
    @import '@styles/stylesheets/scss/utils/helpers.scss';

    .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-value {
            color: #151b42;
            font-size: 0.875rem;
            font-weight: normal;
            width: 4rem;
        }
        &-display {
            display: flex;
            width: 100%;
            &-first {
                border-top-left-radius: 0.326rem;
                border-bottom-left-radius: 0.326rem;
            }
            &-second {
                border-top-right-radius: 0.326rem;
                border-bottom-right-radius: 0.326rem;
            }
        }
        .display-second {
            border-top-left-radius: 0.326rem;
            border-bottom-left-radius: 0.326rem;
        }
        .display-first {
            border-top-right-radius: 0.326rem;
            border-bottom-right-radius: 0.326rem;
        }
    }
</style>
