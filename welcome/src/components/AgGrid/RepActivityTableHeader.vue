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
