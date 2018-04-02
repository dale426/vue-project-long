<template>
    <div class="long-wraper">
        <Breadcrumb>
            <BreadcrumbItem to="/"><Icon type="ios-home-outline"></Icon> 主页</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">投资产品</BreadcrumbItem>
            <BreadcrumbItem>我的持仓</BreadcrumbItem>
        </Breadcrumb>
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
        <div class="long-page-wraper">
            <Page 
                :total="total"
                :page-size="params.pageSize"
                :page-size-opts="DefaultPageSizeOpt"
                :current="params.pageNo"
                size="small"
                show-elevator 
                show-sizer
                show-total
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
            ></Page>
        </div>
    </div>
  
</template>
<script>
    import {
        tableHeaderRowHeight,
        tableRowHeight,
        DefaultPageSize,
        DefaultPageSizeOpt
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
            total: 40,
            DefaultPageSizeOpt,
            params: {
                pageNo: 1,
                pageSize: DefaultPageSize
            }
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
        // $http.get()
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
            number: 3,
            type: '黄金',
            name: '京东黄金',
            code: '0000',
            source: '京东app',
            price: '270.00',
            buyTime: '2018-04-01'
        },
        {
            number: 4,
            type: '基金',
            name: '兴全趋势混合',
            code: '107123',
            source: '支付宝财富',
            price: '0.9523',
            buyTime: '2018-04-01'
        }]
    },
    methods: {
        pageChange(page) {
            this.params.pageNo = page
            // query
        },
        pageSizeChange(size) {
            this.params.pageSize = size
            // query
        },
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
</style>
