<template lang="html">
    <div v-on-clickaway="away" class="dropdown-selection" @click="toggleMenu">
        <div class="selected">
            <div v-if="prefixIcon" class="prefix-icon fa " :class="prefixIcon" />
            <div class="label ellipse-style">
                <div class="display-options">
                    <div v-if="initialSelected.length > 0" ref="optionsContainer" class="selected-options">
                        <div v-for="(option, index) in displayedOptions" :key="index" class="selected-option">
                            <div class="label-text">
                                {{ option.label || option.name || option }}
                            </div>
                            <div class="cancel" @click.stop="removeOption(index)">
                                <i class="fa-solid fa-xmark" />
                            </div>
                        </div>
                        <div v-if="hiddenOptionsCount > 0" class="hidden-options-count">
                            +{{ hiddenOptionsCount }} more
                        </div>
                    </div>
                    <div v-else ref="selectUsers" class="selected-options">
                       {{ defaultLabel }}
                    </div>
                </div>
            </div>
            <i class="fa" :class="{ 'fa-caret-down': !showMenu, 'fa-caret-up': showMenu, 'arrow': true }" aria-hidden="true" />
        </div>
        <menu-list
            v-show="showMenu"
            :options="options"
            :show-select-all="showSelectAll"
            :default-selected="initialSelected"
            :selectall-clicked="selectallClicked"
            :set-search-to-default="setSearchToDefault"
            @option-selected="optionSelected"
            @add-remove-option="handleAddRemoveOption"
            @filter-by-search="handleFilterBySearch"
            @select-all-options="handleSelectAllOptions"
        />
    </div>
</template>

<script>
    import MultiSelectMenuList from '@src/components/app-comps/AppMultiSelectMenuList.vue';
    import { mixin as clickaway } from 'vue-clickaway2';

    export default {

        components: {
            'menu-list': MultiSelectMenuList
        },
        mixins: [clickaway],
        props: {
            options: {
                type: Array,
                required: true
            },
            initialSelected: {
                type: Array,
                default () {
                    return [];
                }
            },
            prefixIcon: {
                type: String,
                default: ''
            },
            selectallClicked: {
                type: Boolean,
                default: false
            },
            showSelectAll: {
                type: Boolean,
                default: true
            },
            id: {
                type: Number,
                default: 0
            },
            defaultLabel: {
                type: String,
                default: 'Select Users'
            }
        },
        data () {
            return {
                showMenu: false,
                displayedOptions: [],
                hiddenOptionsCount: 0,
                setSearchToDefault: false
            };
        },
        watch: {
            initialSelected () {
                this.updateDisplayedOptions();
            }
        },
        mounted () {
            this.updateDisplayedOptions();
        },
        methods: {
            updateDisplayedOptions () {
                let containerWidth;
                const container = this.$refs.optionsContainer;
                if (container) {
                    containerWidth = container.getBoundingClientRect().width;
                } else {
                    containerWidth = this.$refs.selectUsers.getBoundingClientRect().width;
                }
                let width = 100;
                let hiddenCount = 0;
                this.displayedOptions = this.initialSelected.filter(option => {
                    const labelWidth = (option.name.length * 5) + 40;
                    if (width + labelWidth <= containerWidth) {
                        width += labelWidth;
                        return true;
                    }
                    hiddenCount++;
                    return false;
                });
                this.hiddenOptionsCount = hiddenCount;
            },
            away () {
                this.setSearchToDefault = true;
                this.showMenu = false;
            },
            toggleMenu () {
                if (this.showMenu === true) {
                    this.setSearchToDefault = true;
                } else {
                    this.setSearchToDefault = false;
                }
                this.showMenu = !this.showMenu;
            },
            optionSelected (index) {
                this.$emit('option-selected', index);
            },
            removeOption (index) {
                this.$emit('remove-option', index, this.id);
            },
            handleAddRemoveOption (option) {
                this.$emit('add-remove-option', option, this.id);
            },
            handleFilterBySearch (search) {
                this.$emit('filter-by-search', search, this.id);
            },
            handleSelectAllOptions (value) {
                this.$emit('select-all-options', value);
            }
        }
    };
</script>

<style scoped lang="scss">
.selected-option {
    height: 1.438rem;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.75rem;
    padding: 0.25rem 0.375rem;
    border-radius: 4px;
    background-color: #eceefd;

    .label-text {
        height: 0.938rem;
        flex-grow: 0;
        font-family: $font-family-primary;
        font-size: 0.625rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #404255;
    }
    .cancel {
        color: #404255;
    }
}

.dropdown-selection .selected-options {
    gap: 0.5rem;
    overflow: scroll;
    width: 20rem;
}
.dropdown-selection .selected-options::-webkit-scrollbar {
    display: none;
}
</style>
