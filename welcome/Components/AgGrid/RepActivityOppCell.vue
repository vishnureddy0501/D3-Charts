<template>
    <div class="rep-act-tab-opp-cell">
        <div v-if="params.type === 'opportunities'" class="type-opp">
            <div class="opp-cell-row total">
                <span class="value">{{ payload.total }}</span>
                <span class="label">Total</span>
            </div>
            <div class="opp-cell-row act-eng">
                <span class="value">{{ payload.actively_engaged }}</span>
                <span class="label">Actively Engaged</span>
            </div>
            <div class="opp-cell-row no-eng">
                <!-- <span class="value">{{ payload.no_engagement }}</span> -->
                <span :class="noEngagementClass">{{ payload.no_engagement }}</span>
                <span class="label">No Engagement</span>
                <i v-if="payload.no_engagement !== 0" class="fa-regular fa-circle-exclamation no-eng-icon" />
                <!-- <i class="fa-regular fa-circle-exclamation" /> -->
            </div>
        </div>
        <div v-if="params.type === 'email_activity'" class="type-email_activity">
            <div class="opp-cell-row sent">
                <i class="fa-regular fa-paper-plane" />
                <span class="value">{{ payload.sent }}</span>
                <span class="label">Sent</span>
            </div>
            <div class="opp-cell-row recieved">
                <i class="fa-regular fa-circle-arrow-down-left" />
                <span class="value">{{ payload.recieved }}</span>
                <span class="label">Received</span>
            </div>
            <div class="opp-cell-row exe-touch">
                <!-- <i class="fa-solid fa-user-tie" /> -->
                <i :class="getIconClass(payload.executive_touch)" class="fa-solid fa-user-tie" />
                <span class="value">{{ payload.executive_touch }}</span>
                <span class="label">Executive Touch Interactions</span>
            </div>
        </div>
        <rep-activity-meeting-cell v-if="params.type === 'meeting_activity'" class="type-meeting_activity" :payload="payload" />
        <div v-if="params.type === 'positive_moments'" class="type-positive_moments">
            <div class="opp-cell-row positive">
                <i class="fa-regular fa-face-smile" />
                <span class="value">{{ payload.positive }}</span>
                <span class="label">Positive</span>
            </div>
            <div class="opp-cell-row objection">
                <i class="fa-regular fa-face-frown-slight" />
                <span class="value">{{ payload.objection }}</span>
                <span class="label">Objection</span>
            </div>
        </div>
    </div>
</template>

<script>
    import RepActivityMeetingCell from './RepActivityMeetingCell.vue';

    export default {
        components: {
            'rep-activity-meeting-cell': RepActivityMeetingCell
        },
        data () {
            return {
                showPopup: false,
                popupPayload: {},
                popupPosition: {
                    top: '0px',
                    left: '0px'
                }
            };
        },
        computed: {
            noEngagementClass () {
                return this.payload.no_engagement === 0
                    ? 'no-engagement-zero'
                    : 'no-engagement-nonzero';
            },
            payload () {
                return this.params?.payload ?? {};
            }
        },
        methods: {
            getComputedVal (obj) {
                return obj ? Object.values(obj).reduce((a, c) => a + c, 0) : '';
            },
            getIconClass (value) {
                return value === 0 ? 'color-grey' : 'color-blue';
            },
            getMeetingIconClass (value) {
                const total = this.getComputedVal(value);
                // console.log('getMeetingIconClass value : ', value);
                return total === 0 ? 'color-grey' : 'color-green';
            },
            handleShowPopup (type, event) {
                this.popupPayload = this.payload[type];
                this.popupPosition.top = `${event.clientY}px`;
                this.popupPosition.left = `${event.clientX}px`;
                this.showPopup = true;
            },
            handleHidePopup () {
                // console.log('handleHidePopup called');
                this.showPopup = false;
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

</style>
