<template>
  <div class="long-ag">
      <ag-grid-vue
        style="width: 100%; height: 350px;" 
        class="ag-theme-balham long-table"
        :enableColResize="true"
        :rowHeight="tableRowHeight"
        :headerHeight="tableHeaderRowHeight"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
      ></ag-grid-vue>
  </div>
</template>
<script>
    import {
        tableHeaderRowHeight,
        tableRowHeight,
    } from '../../utils/const'
export default {
    name: 'fundHolding',
    data() {
        return {
            gridOptions: {},
            columnDefs: null,
            tableHeaderRowHeight,
            tableRowHeight,
            rowData: [],
        }
    },
    beforeMount() {
        this.gridOptions = {}
        this.createColumnDefs()
        this.gridOptions.onGridReady = () => {

            window.onresize = () => {
                this.gridOptions.api.sizeColumnsToFit()
            }
            this.gridOptions.api.sizeColumnsToFit()
        }
    },
    mounted() {
        this.rowData =[{
            number: 1,
            type: '黄金',
            name: '京东黄金',
            code: '0000',
            source: '京东app',
            price: '270.00',
            buyTime: '2018-04-01'
        },
        {
            number: 2,
            type: '基金',
            name: '兴全趋势混合',
            code: '107123',
            source: '支付宝财富',
            price: '0.9523',
            buyTime: '2018-04-01'
        },
        {
            number: 1,
            type: '黄金',
            name: '京东黄金',
            code: '0000',
            source: '京东app',
            price: '270.00',
            buyTime: '2018-04-01'
        },
        {
            number: 2,
            type: '基金',
            name: '兴全趋势混合',
            code: '107123',
            source: '支付宝财富',
            price: '0.9523',
            buyTime: '2018-04-01'
        }]
    },
    methods: {
        createColumnDefs() {
            this.columnDefs = [{
                headerName: "序号",
                field: "number",
                minWidth: 120,
                width: 120
            }, {
                headerName: "类型",
                field: "type",
                minWidth: 120,
            }, {
                headerName: "购买平台",
                field: "source",
                minWidth: 120,
            }, {
                headerName: "名称",
                field: "name",
                minWidth: 120,
            }, {
                headerName: "编号",
                field: "code",
                minWidth: 120,
            }, {
                headerName: "买入单价",
                field: "price",
                minWidth: 120,
            }, {
                headerName: "买入金额",
                field: "price",
                minWidth: 120,
            },{
                headerName: "买入时间",
                field: "buyTime",
                minWidth: 120,
            }]
        }
    }
}
</script>
<style lang="less">
    .long-ag{
        margin-top: 20px;
        padding: 20px;
    }
</style>
