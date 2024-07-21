<template>
    <div>
        <cell-row type="sent" icon-class="fa-regular fa-paper-plane" :payload="payload.sent" label="Sent" />
        <cell-row type="recieved" icon-class="fa-regular fa-circle-arrow-down-left" :payload="payload.recieved" label="Received" />
        <cell-row type="cancelled" :icon-class="getMeetingIconClass(payload.cancelled)" :payload="payload.cancelled" label="Cancelled" />
    </div>
</template>

<script>
    import RepActivityMeeingCellRow from './RepActivityMeeingCellRow.vue';

    export default {
        components: {
            'cell-row': RepActivityMeeingCellRow
        },
        props: {
            payload: {
                type: Object,
                required: true
            }
        },
        methods: {
            getComputedVal (obj) {
                return obj ? Object.values(obj).reduce((a, c) => a + c, 0) : '';
            },
            getMeetingIconClass (value) {
                const total = this.getComputedVal(value);
                if (total > 0) {
                    return 'fa-regular fa-circle-minus color-green'; // Assuming color-red is defined for cancelled with items
                }
                return 'fa-regular fa-circle-minus color-grey'; // Grey icon for zero items
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

    .opp-cell-row.total .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.act-eng .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .no-engagement-zero {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .no-engagement-nonzero {
        color: #f04e45;
        font-size: 12px;
        font-weight: 500;
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

    .opp-cell-row.exe-touch .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.cancelled .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.positive .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .opp-cell-row.objection .value {
        color: #404255;
        font-size: 12px;
        font-weight: 500;
    }

    .fa-face-smile {
        color: #22a16e;
    }

    .fa-face-frown-slight {
        color: #f04e45;
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

    .color-red {
        color: #f04e45; // Example color, change as needed
    }

</style>
