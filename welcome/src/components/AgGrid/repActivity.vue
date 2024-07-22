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
    :deep(.ag-header-group-cell) {
        display: flex;
        align-items: center;
        position: absolute;
        background: #151b42;
        color: white;
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
    }

    :deep(.ag-header-cell) {
        background: #f0f2f7;
        color: #404255;
        font-size: 10px;
        font-weight: 600;
        border-right: 1px solid #dde0eb;
        border-bottom: 1px solid #dde0eb;
    }

    :deep(.ag-cell) {
        border-right: 1px solid #dde0eb;
        border-left: 1px solid #dde0eb;
        padding: 12px;
    }

    :deep(.ag-header-group-cell-label) {
        justify-content: center;
    }

    :deep(.header-section) {
        padding: 10px;
    }

    :deep(.ag-header-group-text) {
        padding: 10px;
    }

    .rep-activity-wrapper {
        margin: 2rem;
        .rep-activity-header {
            display: flex;
            justify-content: space-between;
            .rep-activity-opp {
                :deep(.option) {
                    label {
                        margin: 0;
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
