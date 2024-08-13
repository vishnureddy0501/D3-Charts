<template>
        <div class="container">
            <div v-for="(filter, filterIndex) in filters" :key="filter.label" class="item-list">
                <div v-if="filter.show" class="item" :class="{'item-border': filterIndex !== getLastIndexToShow}">
                    <div class="no-expand" @click="toogleExpand(filterIndex)">
                        <div class="label">
                            {{ filter.label }}
                        </div>
                        <div v-if="filter.expand">
                            <i class="fa-solid fa-chevron-up icon" />
                        </div>
                        <div v-else>
                            <i class="fa-solid fa-chevron-down icon" />
                        </div>
                    </div>
                    <div v-if="filter.expand">
                        <MultiSelectDropdown
                            v-if="filter.type === 'dropdown'"
                            :id="filterIndex"
                            :initial-selected="filter.selectedOptions"
                            default-label="Select"
                            :options="filter.options"
                            :show-select-all="false"
                            @remove-option="handleRemoveOption"
                            @add-remove-option="handleAddRemoveOption"
                            @filter-by-search="handleFilterBySearch"
                        />
                        <dropdown
                            v-if="filter.type === 'single-select-dropdown'"
                            :id="filterIndex"
                            :initial-selected="filter.selectedOptions.length ? filter.selectedOptions[0].name : 'Select'"
                            :options="filter.options"
                            @option-label-selected="handleSelectedOption"
                        />
                        <rangeSlider v-if="filter.type == 'score'" :schema="filter" :value="filter.limit" :show-header="false" @change="handleRangeSlider(filterIndex, $event)" />
                        <div v-if="filter.type == 'radio'" class="radio-items">
                            <div v-for="(value, radioIndex) in filter.options" :key="value.id">
                                <radio-component
                                    :id="value.id"
                                    :disabled="false"
                                    :selected="checkForActiveRadio(filterIndex) === radioIndex"
                                    :show-radio="true"
                                    class="rd-custom"
                                    @opt-click="handleOptClick(filterIndex,value.id, value.name)"
                                >
                                    <template #label>
                                        <span class="option-label">{{ value.name }}</span>
                                    </template>
                                </radio-component>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import dropdown from '@components/reusable/dropdownVuexNew.vue';
    import { fetchProspectsData, setVirtualSDRFormStepData, setProspectFiltersData } from '@modules/sales_engagement/actions.salesEngagement';
    import { getVirtualSDRFormStepsData, getProspectsFiltersSchema } from '@modules/sales_engagement/getters.salesEngagement';
    import MultiSelectDropdown from '@src/components/app-comps/AppMultiSelectDropdown.vue';
    import appRadio from '@src/components/app-comps/AppRadio.vue';
    import rangeSlider from '@src/components/reusable/form/v2/RangeSliderV2.vue';

    export default {
        components: {
            MultiSelectDropdown,
            rangeSlider,
            'radio-component': appRadio,
            dropdown
        },
        props: {
            filtersData: {
                type: Array,
                default () {
                    return [];
                }
            },
            from: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                filters: [],
                searchFilter: ''
            };
        },
        computed: {
            getLastIndexToShow () {
                let value = 0;
                this.filters.forEach((item, index) => {
                    if (item.show) {
                        value = index;
                    }
                });
                return value;
            }
        },
        watch: {
            searchFilter (val) {
                this.filters = this.filters.map((item) => {
                    if (item.label.toLowerCase().includes(val.toLowerCase())) {
                        item.show = true;
                    } else {
                        item.show = false;
                    }
                    return item;
                });
            },
            filtersData (val) {
                this.filters = structuredClone(val);
                this.filters = this.filters.map((item) => {
                    item.expand = false;
                    item.show = true;
                    return item;
                });
                this.applyFilters();
            }
        },
        vuex: {
            actions: {
                fetchProspectsData,
                setVirtualSDRFormStepData,
                setProspectFiltersData
            },
            getters: {
                getVirtualSDRFormStepsData,
                getProspectsFiltersSchema
            }
        },
        mounted () {
            this.filters = structuredClone(this.filtersData);
            this.filters = this.filters.map((item) => {
                item.expand = false;
                item.show = true;
                return item;
            });
            this.applyFilters();
        },
        methods: {
            handleOptClick (filterIndex, id, name) {
                this.filters[filterIndex].selectedOptions = [{ id, name }];
            },
            handleSelectedOption (_index, option, id) {
                this.filters[id].selectedOptions = [{ ...option }];
            },
            checkForActiveRadio (filterIndex) {
                if (this.filters[filterIndex].selectedOptions.length === 0) {
                    return -1;
                }
                return this.filters[filterIndex].options.findIndex((item) => item.id === this.filters[filterIndex].selectedOptions[0].id);
            },
            handleRangeSlider (index, event) {
                this.filters[index].limit = [...event];
            },
            toogleExpand (index) {
                const filters = [...this.filters];
                filters.forEach((value, ind) => {
                    if (ind !== index) {
                        value.expand = false;
                    }
                });
                filters[index].expand = !filters[index].expand;
                this.filters = [...filters];
            },
            handleRemoveOption (index, filterIndex) {
                this.filters[filterIndex].selectedOptions.splice(index, 1);
            },
            handleAddRemoveOption (option, filterIndex) {
                const optionIndex = this.filters[filterIndex].selectedOptions.findIndex((item) => item.id === option.id);
                if (optionIndex !== -1) {
                    this.filters[filterIndex].selectedOptions.splice(optionIndex, 1);
                } else {
                    this.filters[filterIndex].selectedOptions.push(option);
                }
            },
            handleFilterBySearch (search, filterIndex) {
                const newFilters = structuredClone(this.filters);
                const getFilters = structuredClone(this.getProspectsFiltersSchema);
                newFilters[filterIndex].options = getFilters[filterIndex].options.filter(option => {
                    return option.name.toLowerCase().includes(search.toLowerCase());
                });
                this.filters = [...newFilters];
            },
            applyFilters () {
                const filters = this.filters.map((item) => {
                    const obj = { key: item.key };
                    if (item.selectedOptions !== undefined) {
                        obj.selectedOptions = item.selectedOptions.map(option => option.id) || [];
                    }
                    if (item.limit !== undefined) {
                        obj.limit = item.limit;
                    }
                    return obj;
                });
                this.setProspectFiltersData([...filters]);
                if (this.from === 'virtualSDR') {
                    const formData = structuredClone(this.getVirtualSDRFormStepsData);
                    formData.step2.filters = filters;
                    this.setVirtualSDRFormStepData(formData);
                }
                this.fetchProspectsData({ filters });
            },
            cancelFilters () {
                this.filters = structuredClone(this.filtersData);
                this.filters = this.filters.map((item) => {
                    item.expand = false;
                    item.show = true;
                    return item;
                });
                this.applyFilters();
            }
        }
    };
</script>

<style lang="scss" scoped>
@import '@styles/stylesheets/scss/utils/helpers.scss';
@import '@styles/stylesheets/scss/utils/colors.scss';
@import '@styles/stylesheets/scss/utils/font-settings.scss';

.radio-items {
    display: flex;
    flex-direction: column;
    .option-label {
        color: #151b42;
        font-size: 0.75rem;
        font-weight: normal;
        margin-left: 8px;
    }
}

::v-deep {
    .rb-wrapper
    {
        .label .rb {
            color: #9fa6e5;
        }
        .label input:checked ~ .rb {
            color: #f04e45;
        }
        .label:hover input ~ .rb {
            color: #9fa6e5;
        }
        .label:hover input:checked ~ .rb {
            color: #f04e45;
        }

    }
}

.filter-search {
        position: relative;
        padding: 1rem;
        &-input {
            font-size: $font-size-small;
            font-weight: $font-weight-normal;
            padding-left: 2.25rem;
            padding-right: 0.75rem;
            height: 2.125rem;
            border-radius: 0.25rem;
            border: solid 0.0625rem $color-midnight-grey-20;
            background-color: $color-white;
        }
        &-icon {
            position: absolute;
            left: 1.7rem;
            top: 1.6rem;
            color: $color-midnight-grey-20;
            font-size: 1rem;
        }
    }

.filter-content {
    display: flex;
    flex-direction: column;
}
.footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0 1rem 1rem;
    .button {
        height: 1.875rem;
        padding: 0.313rem 0.625rem;
        font-weight: 500;
        font-size: 0.75rem;
    }
    .secondary {
        height: 1.875rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: #3d4689;
        padding: 0.313rem 0.625rem;
        border-radius: 0.25rem;
        border: solid 0.0625rem #c7cbd6;
        background-color: white;
        cursor: pointer;
    }
}

.container {
    display: flex;
    flex-direction: column;
    max-height: 64vh;
    overflow-y: auto;
    .item-list {
        .item-border {
            border-bottom: solid 0.031rem #dde0eb;
        }
        .item {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0.75rem 1rem;
            background-color: white;
            cursor: pointer;
            ::v-deep {
                .component {
                    padding: 0
                }
                .range-slider {
                    width: 16vw;
                    margin-top: 1.2rem;
                }

                .menu-list {
                    width: 17vw;
                    .dropdown-item {
                        .option-label {
                            width: 14vw;
                        }
                    }
                }

                .dropdown-selection {
                    display: unset;
                    color: $color-midnight-grey-80;
                    font-size: 0.75rem;
                    font-weight: 600;
                    .selected {
                        border: 0.0625rem solid $color-midnight-grey-20;
                        border-radius: 0.25rem;
                        padding: 0.375rem 0 0.375rem 0.375rem;
                        width: 17vw;

                        .label {
                            padding: 0;
                            color: $color-midnight-grey-80;
                            margin-left: 0.625rem;
                        }
                    }
                }
            }
            .no-expand {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
            }

            .label {
                color: #404255;
                font-weight: 600;
                font-size: 0.75rem;
            }

            .icon {
                color: #6f7288;
                font-size: 0.875rem;
                opacity: 0.5;
            }
        }

    }
}
</style>
