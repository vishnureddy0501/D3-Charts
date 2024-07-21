<template>
    <div class="opp-cell-row" :class="type">
        <i :class="iconClass" @mouseenter="openToolTip" @mouseleave="closeToolTip" />
        <VDropdown
            v-if="tooltipActive"
            :shown="tooltipActive"
            :html="true"
            :auto-hide="false"
            :triggers="[]"
            :placement="'left'"
            :container="getContainer"
        >
            <template #popper>
                <div class="meeting-cell-popover popper-blue-tooltip">
                    <span class="meeting_type">Meeting {{ label }}</span>
                    <ul class="tooltip-list">
                        <!-- <li v-for="(value, key) in payload" :key="key" class="tooltip-item">
                            <span class="tooltip-icon">&#9679;</span>
                            <span class="tooltip-key">{{ formatKey(key) }}</span>
                            <strong class="tooltip-value">{{ value }}</strong>
                        </li> -->
                        <li v-for="(value, key) in payload" :key="key"
                            :class="{'tooltip-item': true, 'uncategorized-style': key === 'uncategorized'}">
                            <span class="tooltip-icon">&#9679;</span>
                            <span class="tooltip-key">{{ formatKey(key) }}</span>
                            <strong class="tooltip-value">{{ value }}</strong>
                        </li>
                    </ul>
                </div>
            </template>
        </VDropdown>
        <span class="value">{{ getComputedVal(payload) }}</span>
        <span class="label"> {{ label }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true
            },
            iconClass: {
                type: String,
                required: true
            },
            payload: {
                type: Object,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                tooltipActive: false
            };
        },
        computed: {
            getContainer () {
                return document.querySelector('.app-content') || 'body';
            }
        },
        methods: {
            getComputedVal (obj) {
                return obj ? Object.values(obj).reduce((a, c) => a + c, 0) : '';
            },
            openToolTip () {
                this.tooltipActive = true;
            },
            closeToolTip () {
                this.tooltipActive = false;
            },
            formatKey (key) {
                return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            }
        }
    };
</script>

<style lang="scss" scoped>
    .rep-act-tab-opp-cell {
        &>div {
            .opp-cell-row:nth-child(2) {
                margin: 6px 0;
            }
        }
    }

    .meeting-cell-popover {
        padding : 15px;
    }

    .opp-cell-row.no-eng .value {
        color: #f04e45;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.sent .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.recieved .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.cancelled .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .type-meeting_activity .fa-paper-plane {
        color: #22a16e;
    }

    .type-meeting_activity .fa-circle-arrow-down-left {
        color: #22a16e;
    }

    .type-email_activity .fa-circle-arrow-down-left {
        color: #0471a7;
    }

    .type-email_activity .fa-paper-plane {
        color: #0471a7;
    }

    .color-grey {
        color: #8c91a1;
    }

    .color-blue {
        color: #0471a7;
    }

    .color-green {
        color: #22a16e;
    }

    .opp-cell-row.no-eng .fa-circle-exclamation {
        color: #f04e45;
    }


    .tooltip-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .tooltip-item {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Ensures items are aligned to start and end of the container */
        width: 100%; /* Ensures the tooltip item takes full width of its container */
        padding: 4px 0;
    }

    .tooltip-icon {
        color: #9fa6e5; /* Adjust the color as needed */
        margin-right: 8px;
    }

    .tooltip-key {
        flex: 1; /* Allows the key to take up as much space as needed */
        margin-right: 4px;
        font-family: Poppins;
        font-size: 14px;
        color: #dde0eb;
        white-space: nowrap; /* Prevents the text from wrapping */
    }

    .tooltip-divider {
        border: none;
        height: 1px;
        background-color: #ccc;
        margin-top: 4px;
        width: 100%;
    }

    .meeting_type {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 600;
        color : #f7f9fc;
    }

   .tooltip-value {
        min-width: 20px; /* Ensures a minimum width for alignment */
        text-align: right; /* Aligns the number to the right */
        font-family: Poppins;
        font-size: 14px;
        color: #f7f9ff;
    }

    .uncategorized-style .tooltip-icon,
    .uncategorized-style .tooltip-key,
    .uncategorized-style .tooltip-value {
        color: #f04e45; // Sets the specific color for all three elements when the key is 'uncategorized'
    }

</style>
