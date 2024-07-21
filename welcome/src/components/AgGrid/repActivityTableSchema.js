export const repActivityTableSchema = (opp) => {
    return [{
        field: 'rep_name',
        headerName: 'Rep name',
        headerGroupComponentParams: {
            headerName: 'Name',
            field: 'rep_name'
        },
        children: [
            {
                field: 'rep_name',
                width: 280,
                headerComponentParams: {
                    headerName: ''
                },
                cellClass: ['ag-grid-name-cell'],
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'name-cell',
                        params: {
                            label: params.data.rep_name
                        }
                    };
                }
            }
        ]
    }, {
        headerName: `${opp} opportunities`,
        field: 'opportunities',
        headerGroupComponentParams: {
            headerName: `${opp} opportunities`
        },
        children: [
            {
                headerName: 'Opportunities',
                field: 'opportunities',
                headerComponentParams: {
                    headerName: 'Opportunities'
                },
                width: 230,
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'opp-cell',
                        params: {
                            payload: params.data[`${opp}_opportunities`].opportunities,
                            type: 'opportunities'
                        }
                    };
                }
            },
            {
                headerName: 'Email Activity',
                field: 'email_activity',
                headerComponentParams: {
                    headerName: 'Email Activity'
                },
                width: 255,
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'opp-cell',
                        params: {
                            payload: params.data[`${opp}_opportunities`].email_activity,
                            type: 'email_activity'
                        }
                    };
                }
            },
            {
                headerName: 'Meeting Activity',
                field: 'meeting_activity',
                headerComponentParams: {
                    headerName: 'Meeting Activity'
                },
                width: 250,
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'opp-cell',
                        params: {
                            payload: params.data[`${opp}_opportunities`].meeting_activity,
                            type: 'meeting_activity'
                        }
                    };
                }
            },
            {
                headerName: 'POSITIVE MOMENTS AND OBJECTIONS',
                field: 'positive_moments',
                headerComponentParams: {
                    headerName: 'POSITIVE MOMENTS AND OBJECTIONS'
                },
                width: 250,
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'opp-cell',
                        params: {
                            payload: params.data[`${opp}_opportunities`].positive_moments,
                            type: 'positive_moments'
                        }
                    };
                }
            }
        ]
    }, {
        headerName: 'account With opportunities',
        field: 'account_with_opportunities',
        headerComponentParams: {
            headerName: 'account With opportunities',
            field: 'account_with_opportunities'
        },
        children: [
            {
                field: 'account_with_opportunities',
                width: 220,
                headerComponentParams: {
                    headerName: ''
                },
                cellClass: ['ag-grid-value-cell'],
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'value-cell',
                        params: {
                            value: params.data.account_with_opportunities
                        }
                    };
                }
            }
        ]
    }, {
        headerName: 'account without opportunities',
        field: 'account_without_opportunities',
        headerComponentParams: {
            headerName: 'account without opportunities',
            field: 'account_without_opportunities'
        },
        children: [
            {
                field: 'account_without_opportunities',
                width: 240,
                headerComponentParams: {
                    headerName: ''
                },
                cellClass: ['ag-grid-value-cell'],
                cellRendererSelector: (params) => {
                    return {
                        frameworkComponent: 'value-cell',
                        params: {
                            value: params.data.account_without_opportunities
                        }
                    };
                }
            }
        ]
    }];
};
