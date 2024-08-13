<template>
    <div class="cb-wrapper" :class="{'disabled': disabled}">
        <label class="label">
            <input type="checkbox" :checked="selected" @change="handleChange">
            <i
                class="cb"
                :class="selected ? 'fa-solid fa-square-check' : 'fa-light fa-square'"
            />
            <slot name="label" />
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: `${new Date().getTime()}`
            },
            disabled: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleChange (e) {
                this.$emit('opt-click', e.target.checked, this.id);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@styles/stylesheets/scss/utils/helpers.scss';
    @import '@styles/stylesheets/scss/utils/colors.scss';
    @import '@styles/stylesheets/scss/utils/font-settings.scss';
    .cb-wrapper {
        .label {
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }
            .cb {
                font-size: 1rem;
                background-color: $color-white;
                color: $color-tropical-sky-20;
                display: block;
            }
        }
        .label:hover input ~ .cb {
            color: $color-tropical-sky-40;
        }
        .label input:checked ~ .cb {
            color: $color-tropical-sky-40;
        }
        .label:hover input:checked ~ .cb {
            color: $color-v2-cerulean-pale;
        }
        &.disabled {
            .label .cb {
                border-color: $color-gray-16;
                &:after {
                    border-color: $color-gray-16;
                }
            }
            input:checked ~ .cb {
                background-color: transparent;
            }
        }
    }
</style>
