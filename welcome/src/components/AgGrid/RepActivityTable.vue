<template>
      <ag-grid-vue
        style="width: 100%; height: 100%;"
        :column-defs="columnDefs"
        :row-data="tableData2"
        :header-height="50"
        :default-col-def="defaultColDef"
        :get-row-height="getRowHeight"
        dom-layout="autoHeight"
      />
  </template>
  
  <script>
  import { AgGridVue } from '@ag-grid-community/vue3';
  import "@ag-grid-community/styles/ag-grid.css";
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import { ModuleRegistry } from '@ag-grid-community/core';
  
  import RepActivityOppCell from './RepActivityOppCell.vue';
  import RepActivityTableHeader from './RepActivityTableHeader.vue';
  import RepActivityTableNameCell from './RepActivityTableNameCell.vue';
  import RepActivityValueCell from './RepActivityValueCell.vue';

  ModuleRegistry.registerModules([ClientSideRowModelModule]);
  
  export default {
    components: {
      AgGridVue,
      RepActivityOppCell,
      agColumnHeader: RepActivityTableHeader,
      RepActivityTableNameCell,
      RepActivityValueCell
    },
    data() {
      return {
        defaultColDef: {
          sortable: false,
          editable: false,
          resizable: true
        },
        tableData2: [
          { company1: "company1", company2: "company2" },
          { company1: "company1", company2: "company2" }
        ],
        columnDefs:  [
          {
            headerName: "Logo1",
            field: "company1",
            cellRenderer: "RepActivityValueCell",
            cellClass: "ag-grid-value-cell",
            width: 100,
            headerComponentParams: {
                    headerName: 'Vishnu'
                },
          },
          {
            headerName: "Logo2",
            field: "company2",
            headerComponentParams: {
                    headerName: 'vardhan'
            },
            cellRenderer: "RepActivityValueCell",
            cellClass: "ag-grid-value-cell",
            width: 100
          }
        ],
        getRowHeight: 100
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .grid-container {
    height: 50vh;
    width: 90vw;
  }
  </style>
  