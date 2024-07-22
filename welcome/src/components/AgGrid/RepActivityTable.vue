<template>
    <ag-grid
        class="ag-theme-alpine"
        :column-defs="getColumnDefs"
        :row-data="tableData"
        :header-height="50"
        :group-header-height="50"
        :default-col-def="defaultColDef"
        :get-row-height="getRowHeight"
        :get-row-style="getRowStyle"
        :framework-components="frameworkComponents"
        dom-layout="autoHeight"
        :modules="modules"
    />
</template>

<script>
    import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
    import { AgGridVue } from '@ag-grid-community/vue';

    import RepActivityOppCell from './RepActivityOppCell.vue';
    import RepActivityTableHeader from './RepActivityTableHeader.vue';
    import RepActivityTableNameCell from './RepActivityTableNameCell.vue';
    import { repActivityTableSchema } from './repActivityTableSchema';
    import RepActivityValueCell from './RepActivityValueCell.vue';

    export default {
        components: {
            'ag-grid': AgGridVue,
            // eslint-disable-next-line vue/no-unused-components
            agColumnHeader: RepActivityTableHeader,
            // eslint-disable-next-line vue/no-unused-components
            'name-cell': RepActivityTableNameCell,
            // eslint-disable-next-line vue/no-unused-components
            'opp-cell': RepActivityOppCell,
            // eslint-disable-next-line vue/no-unused-components
            'value-cell': RepActivityValueCell
        },
        data () {
            return {
                defaultColDef: {
                    sortable: false,
                    editable: false,
                    resizable: true,
                    pagination: false,
                    suppressMovableColumns: true,
                    headerComponentParams: {
                        template: RepActivityTableHeader
                    }
                },
                oppSelected: 'open',
                tableData: [
                    {
                        rep_name: 'Bessi Copper',
                        open_opportunities: {
                            opportunities: {
                                total: 12,
                                actively_engaged: 4,
                                no_engagement: 5
                            },
                            email_activity: {
                                sent: 6,
                                recieved: 4,
                                executive_touch: 14
                            },
                            meeting_activity: {
                                sent: {
                                    discovery_call: 1,
                                    champion_building: 4,
                                    demo: 2,
                                    uncategorized: 4
                                },
                                recieved: {
                                    discovery_call: 1
                                },
                                cancelled: {
                                    discovery_call: 1,
                                    champion_building: 4
                                }
                            },
                            positive_moments: {
                                positive: 10,
                                objection: 5
                            }
                        },
                        account_with_opportunities: 12,
                        account_without_opportunities: 0
                    },
                    {
                        rep_name: 'Jacob Jonesr',
                        open_opportunities: {
                            opportunities: {
                                total: 14,
                                actively_engaged: 10,
                                no_engagement: 2
                            },
                            email_activity: {
                                sent: 12,
                                recieved: 8,
                                executive_touch: 0
                            },
                            meeting_activity: {
                                sent: {
                                    discovery_call: 3,
                                    champion_building: 4,
                                    demo: 4,
                                    uncategorized: 4
                                },
                                recieved: {
                                    discovery_call: 1
                                },
                                cancelled: {
                                    discovery_call: 1,
                                    champion_building: 4
                                }
                            },
                            positive_moments: {
                                positive: 11,
                                objection: 3
                            }
                        },
                        account_with_opportunities: 11,
                        account_without_opportunities: 3
                    },
                    {
                        rep_name: 'Kathryn Murphy',
                        open_opportunities: {
                            opportunities: {
                                total: 14,
                                actively_engaged: 10,
                                no_engagement: 0
                            },
                            email_activity: {
                                sent: 12,
                                recieved: 8,
                                executive_touch: 2
                            },
                            meeting_activity: {
                                sent: {
                                    discovery_call: 3,
                                    champion_building: 4,
                                    demo: 4,
                                    uncategorized: 4
                                },
                                recieved: {
                                    discovery_call: 1
                                },
                                cancelled: {
                                    discovery_call: 0,
                                    champion_building: 0
                                }
                            },
                            positive_moments: {
                                positive: 11,
                                objection: 3
                            }
                        },
                        account_with_opportunities: 18,
                        account_without_opportunities: 2
                    },
                    {
                        rep_name: 'Cameron Willamson',
                        open_opportunities: {
                            opportunities: {
                                total: 14,
                                actively_engaged: 10,
                                no_engagement: 2
                            },
                            email_activity: {
                                sent: 12,
                                recieved: 8,
                                executive_touch: 2
                            },
                            meeting_activity: {
                                sent: {
                                    discovery_call: 3,
                                    champion_building: 4,
                                    demo: 4,
                                    uncategorized: 4
                                },
                                recieved: {
                                    discovery_call: 1
                                },
                                cancelled: {
                                    discovery_call: 1,
                                    champion_building: 4
                                }
                            },
                            positive_moments: {
                                positive: 11,
                                objection: 3
                            }
                        },
                        account_with_opportunities: 8,
                        account_without_opportunities: 2
                    },
                    {
                        rep_name: 'Dianne Russell',
                        open_opportunities: {
                            opportunities: {
                                total: 14,
                                actively_engaged: 10,
                                no_engagement: 2
                            },
                            email_activity: {
                                sent: 12,
                                recieved: 8,
                                executive_touch: 2
                            },
                            meeting_activity: {
                                sent: {
                                    discovery_call: 3,
                                    champion_building: 4,
                                    demo: 4,
                                    uncategorized: 4
                                },
                                recieved: {
                                    discovery_call: 1
                                },
                                cancelled: {
                                    discovery_call: 1,
                                    champion_building: 4
                                }
                            },
                            positive_moments: {
                                positive: 11,
                                objection: 3
                            }
                        },
                        account_with_opportunities: 19,
                        account_without_opportunities: 4
                    },
                    {
                        rep_name: 'Kristin Watson',
                        open_opportunities: {
                            opportunities: {
                                total: 14,
                                actively_engaged: 10,
                                no_engagement: 2
                            },
                            email_activity: {
                                sent: 12,
                                recieved: 8,
                                executive_touch: 2
                            },
                            meeting_activity: {
                                sent: {
                                    discovery_call: 3,
                                    champion_building: 4,
                                    demo: 4,
                                    uncategorized: 4
                                },
                                recieved: {
                                    discovery_call: 1
                                },
                                cancelled: {
                                    discovery_call: 1,
                                    champion_building: 4
                                }
                            },
                            positive_moments: {
                                positive: 11,
                                objection: 3
                            }
                        },
                        account_with_opportunities: 17,
                        account_without_opportunities: 5
                    }
                ],
                frameworkComponents: {},
                modules: [ClientSideRowModelModule],
                getRowHeight: null
            };
        },
        computed: {
            getColumnDefs () {
                return repActivityTableSchema(this.oppSelected);
            }
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                this.frameworkComponents = {
                    agColumnHeader: 'agColumnHeader',
                    RepActivityTableNameCell,
                    RepActivityOppCell,
                    RepActivityValueCell
                };
                this.getRowHeight = (_params) => {
                    return 90;
                };
            },
            getRowStyle (params) {
                if (params.node.rowIndex % 2 === 1) {
                    return { background: '#f0f2f7' }; // Apply background color to alternate rows
                }
                return null;
            }
        }
    };
</script>

<style lang="scss" scoped>

    ::v-deep {
        .ag-header-group-cell {
            display: flex;
            align-items: center;
            height: 100%;
            position: absolute;
            background: #151b42;
            color: white;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            border-right: 1px solid white;
            border-bottom: 1px solid white;
        }
    }

</style>
