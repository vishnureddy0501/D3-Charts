<template lang="html">
    <div class="menu-list-wrapper" :class="{ 'menu-list-reposition': reposition }">
        <ul class="menu-list" @click.stop>
            <div class="menu-data">
                <div v-if="showSelectAll" class="select-all-count">
                    <div class="select-all-section">
                        <CheckboxComponent id="exampleCheckbox" :selected="selectallClicked" @opt-click="handleSelectAll" />
                        <div class="select-all">
                            Select All
                        </div>
                    </div>
                    <div class="users-count">
                        {{ defaultSelected.length }} Users Selected
                    </div>
                </div>
                <div class="filter-search">
                    <input v-model="search" type="text" class="filter-search-input" placeholder="Search Views">
                    <i class="far fa-search filter-search-icon" />
                </div>
            </div>
            <div v-if="options.length === 0 " class="no-users-found">
                No Users Found
            </div>
            <li
                v-for="(option, index) in options"
                :key="index"
                class="ellipse-style"
                @click.stop="handleCheckboxClick(option)"
                @mousedown.stop="() => { }"
            >
                <div class="menu-list-item">
                    <CheckboxComponent
                        id="index"
                        :selected="isOptionSelected(option)"
                        @opt-click="handleCheckboxClick(option)"
                    />
                    <div class="label-container">
                        <div class="item-label">
                            {{ option.label || option.name || option }}
                        </div>
                        <div class="contact-item">
                            {{ option.title }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import CheckboxComponent from '@src/components/app-comps/AppCheckBox.vue';

    export default {
        components: {
            CheckboxComponent
        },
        props: {
            options: {
                type: Array,
                default () {
                    return [];
                }
            },
            defaultSelected: {
                type: Array,
                default () {
                    return [];
                }
            },
            reposition: {
                type: Boolean,
                required: false,
                default: false
            },
            disableOption: {
                type: Boolean,
                default: false
            },
            selectallClicked: {
                type: Boolean,
                default: false
            },
            setSearchToDefault: {
                type: Boolean,
                default: false
            },
            showSelectAll: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                count: 0,
                search: ''
            };
        },
        computed: {
            isOptionSelected () {
                return option => this.defaultSelected.some(obj =>
                    obj.name === option.name && obj.id === option.id
                );
            }
        },
        watch: {
            search (val) {
                this.$emit('filter-by-search', val);
            },
            setSearchToDefault (val) {
                if (val === true) {
                    this.search = '';
                }
            }
        },
        methods: {
            handleCheckboxClick (option) {
                this.$emit('add-remove-option', option);
            },
            handleSelectAll () {
                this.$emit('select-all-options', !this.selectallClicked);
            }
        }
    };
</script>

<style lang="scss" scoped>

.disable {
    cursor: no-drop !important;
    color: #9a9a9a !important;
    font-weight: 600;
}

.menu-list-item {
    display: flex;
    gap: 0.5rem;
    align-items: inherit;

    .checkbox-item {
        cursor: pointer;
    }
}

::v-deep {
    .cb-wrapper {
        .label {
            .cb {
                color: #9FA6E5;
                margin-top: 0.125rem;
            }
        }
        .label:hover input~.cb {
            color: #9FA6E5;
        }
        .label input:checked~.cb {
            color: #f04e45;
        }
        .label:hover input:checked~.cb {
            color: #f04e45;
        }
    }
}
.select-all-section {
    display: flex;
    gap: 0.5rem;

    .select-all {
        font-size: 0.875rem;
        font-weight: normal;
        color: #6F7288;
    }
}

.users-count {
    font-size: 0.875rem;
    font-weight: normal;
    color: #6F7288;
}

.select-all-count {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    margin-right: 0.625rem;
    margin-left: 1.2rem;
}

.filter-search {
    position: relative;
    padding: 0.625rem 7.5px 0;
    margin-left: 0.625rem;

    &-input {
        font-size: 12px;
        font-weight: 400;
        padding: 0.375rem 2.063rem 0.313rem 1.875rem;
        border-radius: 4px;
        border: solid 0.0625rem #c7cbd6;
        background-color: white;
    }

    &-icon {
        position: absolute;
        left: 1rem;
        top: 1.17rem;
        color: #c7cbd6;
        font-size: 1rem;
    }
}

.no-users-found {
    padding: 1rem;
    font-size: 0.875rem;
    font-weight: normal;
    color: #151b42;
    text-align: center;
}

.label-container {
    display: flex;
    flex-direction: column;
}
.contact-item {
    font-size: 0.688rem;
    font-weight: normal;
    color: #404255;
}
</style>
