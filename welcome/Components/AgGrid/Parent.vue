<template>
    <div>
        <repActivity />
    </div>
</template>

<script>
    import repActivity from './RepActivityTable.vue';

    export default {
        components: {
            repActivity
        },
        data () {
            return {
                
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import './rep-activity-style.scss';
    ::v-deep {
        @include rep-activity-style;
    }

    .rep-activity-wrapper {
        margin: 2rem;
        .rep-activity-header {
            display: flex;
            justify-content: space-between;
            .rep-activity-opp {
                ::v-deep {
                    .option {
                        label {
                            margin: 0;
                        }
                    }
                }
            }
        }
    }

    .rep-activity-table-calling {
        background-color: white;
        padding: 10px 5px;
        margin-top: 10px;
    }

    .meeting-wrapper{
        display: flex;
        align-items: center;
    }

    .multi-select-dropdown.meeting-type-dropdown {
        width: 320px;
        margin-left: 10px;
    }

    .meeting-wrapper {
        .meeting-text{
            font-family: Poppins;
            font-size: 12px;
            font-weight: 500;
        }
    }

</style>
