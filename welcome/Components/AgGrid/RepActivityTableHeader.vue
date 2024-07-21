<template>
    <div class="rep-act-tab-header">
        <div class="header-section">
            {{ params.headerName }}
        </div>
        <div v-if="params.subHeader" class="sub-header">
            ({{ params.subHeader }})
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
            // some data
        }
    };
</script>

<style lang="scss" scoped>
    @import './rep-activity-style.scss';

    ::v-deep {
        @include rep-activity-style;
    }

    .rep-act-tab-header {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 12px;
        color:#404255;
    }
    .ag-header-cell {
        background-color: red !important;
    }
    .ag-header-row {
        background-color: green($color: #0ed8a5) !important;
    }

    .ag-header-cell .ag-focus-managed {
        background-color: purple !important;
    }

    .header-section {
        font-family: Poppins;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: purple;
    }

    .sub-header {
        font-size: 12px;
        color: #b0b0b0;
        color: green;
    }

</style>
