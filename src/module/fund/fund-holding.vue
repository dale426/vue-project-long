<template>
    <div class="long-wraper">
        <Breadcrumb>
            <BreadcrumbItem to="/"><Icon type="ios-home-outline"></Icon> 主页</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">投资产品</BreadcrumbItem>
            <BreadcrumbItem>我的持仓</BreadcrumbItem>
        </Breadcrumb>
        <div>
            <ul class="long-btn-group">
                <li class="btn-group-single" @click="addFund">
                    <i class="icon iconfont icon-addition"></i>
                    <div>新增</div>
                </li>
                <li class="btn-group-single">
                    <i class="icon iconfont icon-edit"></i>
                    <div>修改</div>
                </li>
                <li class="btn-group-single">
                    <i class="icon iconfont icon-delete"></i>
                    <div>删除</div>
                </li>
            </ul>
        </div>
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
                rowSelection='multiple'
                :suppressRowClickSelection="true"
                :rowSelected="onRowSelected"
                :selectionChanged="onSelectionChanged"
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
        <!-- 详情列表 -->
        <div class="long-ag">
            <ag-grid-vue
                style="width: 100%; height: 350px;" 
                class="ag-theme-balham long-table"
                :enableColResize="true"
                :rowHeight="tableRowHeight"
                :headerHeight="tableHeaderRowHeight"
                :gridOptions="gridOptions2"
                :columnDefs="columnDefs2"
                :rowData="rowData2"
                rowSelection='multiple'
                :suppressRowClickSelection="true"
            ></ag-grid-vue>
        </div>
        <!-- <Button type="primary" @click="queryFund">请求</Button> -->
        <!-- <Button type="primary" @click="queryFund">获取列表</Button> -->
        <Modal
            width="560"
            title="购买基金"
            :value="buyPop"
            :mask-closable="false"
            @on-cancel="closeAddPop"
            @on-ok="saveFund"
            :loading="saveLoading"
        > 
            <div class="long-form-wrap">
                <Form :model="formData" ref="formValidate" :rules="ruleValidate" :label-width="100" class="long-form-input">
                    <FormItem label="产品名称：" prop="name">
                        <Input v-model="formData.name"  placeholder="例如：兴全趋势" />
                    </FormItem>
                    <FormItem label="产品编号：" prop="code">
                        <Input v-model="formData.code"  placeholder="请输入" />
                    </FormItem>
                    <FormItem label="产品类型：" prop="type">
                        <Input v-model="formData.type"  placeholder="请输入" />
                    </FormItem>
                    <FormItem label="购买平台：" prop="buySource">
                        <Input v-model="formData.buySource"  placeholder="请输入" />
                    </FormItem>
                    <FormItem label="购买价格：" prop="buyPrice">
                        <Input v-model="formData.buyPrice"  placeholder="请输入" />
                    </FormItem>
                    <FormItem label="购买金额：" prop="buyMoney">
                        <Input v-model="formData.buyMoney"  placeholder="请输入" />
                    </FormItem>
                    <FormItem label="费率：" prop="rate">
                        <Input v-model="formData.rate"  placeholder="请输入" />
                        <span class="long-form-input-rate">%</span>
                    </FormItem>
                    <FormItem label="手续费：">
                        <span style="color:red"> {{ rateFee }}</span>
                    </FormItem>
                    <FormItem label="购买时间：">
                        <DatePicker v-model="formData.buyTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="备注：">
                        <Input v-model="formData.remark" type="textarea" placeholder="Enter something..." style="width: 200px" />
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {
        tableHeaderRowHeight,
        tableRowHeight,
        DefaultPageSize,
        DefaultPageSizeOpt
    } from '../../utils/const'
    import * as calc from '../../utils/calc'
    import { getDataFormat } from '../../utils/utils'
    function disColor({value = ''}) {
        let color = 'red'
        if (value.toString().includes('-')) {
            color = 'green'
        }
        return '<span style="color:' + color + '">' + value + '%</span>'
    }
    export default {
        name: 'fundHolding',
        data() {
            return {
                gridOptions: {},
                gridOptions2: {},
                columnDefs: null,
                columnDefs2: null,
                tableHeaderRowHeight,
                tableRowHeight,
                rowData: [],
                rowData2: [],
                total: 0,
                DefaultPageSizeOpt,
                params: {
                    pageNo: 1,
                    pageSize: DefaultPageSize
                },
                buyPop: false,
                saveLoading: true,
                formData: {
                    name: '',
                    code: '',
                    type: '基金',
                    buySource: '天天基金',
                    buyPrice: '',
                    buyMoney: '',
                    remark: '',
                    rate: 0,
                    buyTime: new Date()
                },
                ruleValidate: {
                    name: [{ required: true, message: '必输项，不能为空', trigger: 'blur' }],
                    code: [{ required: true, message: '必输项，不能为空', trigger: 'blur' }],
                    type: [{ required: true, message: '必输项，不能为空', trigger: 'blur' }],
                    buySource: [{ required: true, message: '必输项，不能为空', trigger: 'blur' }],
                    buyPrice: [
                        { required: true, message: '必输项，不能为空', trigger: 'blur' },
                        { type: 'number',
                            message: '输入有误，请检查',
                            trigger: 'blur',
                            transform(value) {
                                return Number(value)
                            }
                        }],
                    buyMoney: [
                        { required: true, message: '必输项，不能为空', trigger: 'blur' },
                        { type: 'number',
                            message: '输入有误，请检查',
                            trigger: 'blur',
                            transform(value) {
                                return Number(value)
                            }
                        }],
                    rate: [
                        { required: true, message: '必输项，不能为空', trigger: 'blur' },
                        { type: 'number',
                            message: '输入有误，请检查',
                            trigger: 'blur',
                            transform(value) {
                                return Number(value)
                            }
                        }]
                }
            }
        },
        beforeMount() {
            this.gridOptions = {}
            this.gridOptions2 = {}
            this.createColumnDefs()
            this.createColumnDefs2()
            this.gridOptions.onGridReady = () => {
                window.onresize = () => {
                    this.gridOptions.api.sizeColumnsToFit()
                    this.gridOptions2.api.sizeColumnsToFit()
                }
                this.gridOptions.api.sizeColumnsToFit()
                this.gridOptions2.api.sizeColumnsToFit()
            }
        },
        mounted() {
            this.queryFundList()
        },
        computed: {
            rateFee() {
                return this.formData.buyMoney * this.formData.rate / 100 || 0
            }
        },
        updated() {

            // this.gridOptions.api.refreshInMemoryRowModel('filter')
            // console.log(this.gridOptions)
        },
        methods: {
            onRowSelected(params) {
                if (params.node.isSelected()) {
                    let { code, name, floatRate } = params.node.data
                    this.queryTwentyFund(code, name, floatRate)
                } else {
                    let { code } = params.node.data
                    this.rowData2.forEach((item, i) => {
                        if (item.code === code) {
                            this.rowData2.splice(i, 1)
                        }
                    })
                }
            },
            onSelectionChanged(params) {
                // console.log("onSelectionChanged", params)
            },
            // 查询指定基金 近20个交易日的数据
            async queryTwentyFund(code = '', name = '', todayRate = '') {
                let url = '/FundMApi/FundNetDiagram.ashx'
                let data = await request.get(url, {FCODE: code})
                let rowObj = { code, name, todayRate }
                data.Datas.forEach((item, i) => {
                    rowObj['JZZZL-' + (21 - i)] = item.JZZZL
                })
                rowObj.datas = data.Datas // 备份原始数据
                this.rowData2.push(rowObj)
            },
            // 查询指定基金 当前价格
            async queryTodayFund(code) {
                let res = await request.jsonp(code + '.js', {}, 'jsonpgz')
                let data = JSON.parse(JSON.stringify(this.rowData)) || []
                data.forEach(item => {
                    if (item.code === code) {
                        item.curPrice = res.gsz
                        item.floatRate = res.gszzl
                    }
                })
                this.rowData = data
            },
            async resolveWithArg(code) {
                return await request.jsonp(code + '.js', {}, 'jsonpgz')
  /*               return new Promise(resolve => setTimeout(() => {
                    console.log('resolving with ' + arg)
                    resolve(arg)
                }, 1000)) */
            },
            async queryFundList() {
                let data = await request.get('/fund/holdfund/list', {})
                if (data.success === true) {
                    this.rowData = data.data || []
                    this.total = data.data.length || 0

                    this.rowData.reduce(async(lastPromise, arg) => {
                        await lastPromise
                        let result = await request.jsonp(arg.code + '.js', {}, 'jsonpgz')
                        let data = JSON.parse(JSON.stringify(this.rowData)) || []
                        data.forEach(item => {
                            if (item.code === arg.code) {
                                item.curPrice = result.gsz
                                item.floatRate = result.gszzl
                            }
                        })
                        this.rowData = data
                    }, Promise.resolve())
                } else {
                    this.$Message.error(data.msg)
                }
            },
            addFund() {
                this.buyPop = true
            },
            closeAddPop() {
                this.buyPop = false
                this.$refs.formValidate.resetFields()
            },
            saveFund() {
                this.$refs.formValidate.validate(async (valid) => {
                    if (valid) {
                        let params = {
                            ...this.formData,
                            rateFee: this.rateFee,
                            rate: this.formData.rate / 100
                        }
                        let data = await request.post('/fund/holdfund/insert', params)
                        if (data.success === true) {
                            this.$Message.success(data.msg)
                            this.buyPop = false
                        } else {
                            this.$Message.error(data.msg)
                        }
                    }
                    this.saveLoading = false
                    this.$nextTick(() => {
                        this.saveLoading = true
                    })
                })
            },
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
                    field: '',
                    headerName: '',
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    minWidth: 40,
                    maxWidth: 40
                }, {
                    headerName: "序号",
                    field: "number",
                    minWidth: 60,
                    // width: 60,
                    cellRenderer: function(params) {
                        return params.rowIndex + 1
                    }
                }, {
                    headerName: "类型",
                    field: "type",
                    minWidth: 80
                }, {
                    headerName: "购买平台",
                    field: "buySource",
                    minWidth: 80
                }, {
                    headerName: "名称",
                    field: "name",
                    minWidth: 160
                }, {
                    headerName: "编号",
                    field: "code",
                    minWidth: 80
                }, {
                    headerName: "买入单价",
                    field: "buyPrice",
                    minWidth: 80
                }, {
                    headerName: "手续费",
                    field: "rateFee",
                    minWidth: 80
                }, {
                    headerName: "买入金额",
                    field: "buyMoney",
                    minWidth: 80,
                    cellRenderer: function(params) {
                        return '<span style="color: ' + params.color + '">' + params.value + '</span>'
                    },
                    cellRendererParams: { // 给当前单元格添加参数
                        color: 'red'
                    }
                }, {
                    headerName: "买入时间",
                    field: "buyTime",
                    minWidth: 140,
                    cellRenderer: function(params) {
                        return getDataFormat(new Date(params.value), 'yyyy-MM-dd hh:mm:ss')
                    }
                }, {
                    headerName: "当前价格",
                    field: "curPrice",
                    minWidth: 80,
                    cellRenderer: params => {
                        // console.log(params)
                        return params.data.curPrice || 0
                    }
                }, {
                    headerName: "当前涨跌幅",
                    field: "floatRate",
                    minWidth: 80,
                    cellRenderer: disColor,
                    cellStyle: function(params) {
                        return {border: '1px solid lightpurple'}
                    }
                }, {
                    headerName: "当日盈亏",
                    field: "todayMoney",
                    minWidth: 80,
                    cellRenderer: function(params) {
                        let {buyMoney = 0, buyPrice = 0, rateFee = 0, floatRate = 0} = params.data
                        let realBuy = calc.sub(buyMoney, rateFee) // 实际购买金额
                        let buyNum = calc.div(realBuy, buyPrice) // 份额
                        return (calc.mul(buyNum, floatRate) / 100).toFixed(4) // 份额*今日涨跌幅
                    },
                    cellStyle: function(params) {
                        return {background: '#FFFFF0'}
                    }
                }, {
                    headerName: "持仓总盈亏",
                    field: "realTotalMoney",
                    minWidth: 80,
                    cellRenderer: params => {
                        let {buyMoney = 0, buyPrice = 0, rateFee = 0, curPrice = 0} = params.data
                        let realBuy = calc.sub(buyMoney, rateFee)
                        let buyNum = calc.div(realBuy, buyPrice)
                        let diff = calc.sub(calc.mul(buyNum, curPrice), buyMoney)
                        return diff.toFixed(4)
                    },
                    cellStyle: function(params) {
                        return {borderBottom: '1px solid #f1974e', background: '#F0FFF0', fontSize: "16px", fontWeight: '500'}
                    }
                }]
            },
            createColumnDefs2() {
                this.columnDefs2 = [{
                    headerName: "基金名称",
                    field: "name",
                    minWidth: 160
                }, {
                    headerName: "基金编码",
                    field: "code",
                    minWidth: 80
                }, {
                    headerName: "15天前",
                    field: "JZZZL-15",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "14天前",
                    field: "JZZZL-14",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "13天前",
                    field: "JZZZL-13",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "12天前",
                    field: "JZZZL-12",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "11天前",
                    field: "JZZZL-11",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "10天前",
                    field: "JZZZL-10",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "9天前",
                    field: "JZZZL-9",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "8天前",
                    field: "JZZZL-8",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "7天前",
                    field: "JZZZL-7",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "6天前",
                    field: "JZZZL-6",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "5天前",
                    field: "JZZZL-5",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "4天前",
                    field: "JZZZL-4",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "3天前",
                    field: "JZZZL-3",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "2天前",
                    field: "JZZZL-2",
                    minWidth: 80,
                    width: 80,
                    cellRenderer: disColor
                }, {
                    headerName: "昨天收益率",
                    field: "JZZZL-1",
                    minWidth: 100,
                    width: 100,
                    cellRenderer: disColor
                }, {
                    headerName: '今日涨跌幅',
                    field: 'todayRate',
                    minWidth: 100,
                    cellStyle: function(params) {
                        return {border: '1px solid lightblue'}
                    },
                    cellRenderer: disColor
                }, {
                    headerName: "近一周浮动",
                    field: "-1",
                    minWidth: 100,
                    cellRenderer: function(params) {
                        let res = 0
                        let data = params.data.datas
                        for (let i = data.length - 1; i > -1; i--) {
                            if (data.length - i < 6) {
                                res += Number(data[i].JZZZL)
                            }
                        }
                        return '<span>' + res.toFixed(2) + '</span>'
                    }
                }, {
                    headerName: "近2周浮动",
                    field: "-21",
                    minWidth: 100,
                    cellRenderer: function(params) {
                        let res = 0
                        let data = params.data.datas
                        for (let i = data.length - 1; i > -1; i--) {
                            if (data.length - i < 11) {
                                res += Number(data[i].JZZZL)
                            }
                        }
                        return '<span>' + res.toFixed(2) + '</span>'
                    }
                }, {
                    headerName: "近一月浮动",
                    field: "-3",
                    minWidth: 100,
                    cellRenderer: function(params) {
                        let res = 0
                        let data = params.data.datas
                        for (let i = 0; i < data.length; i++) {
                            res += Number(data[i].JZZZL)
                        }
                        return '<span>' + res.toFixed(2) + '</span>'
                    }
                }]
            }
        }
    }
</script>
<style lang="less">
.long-form-input-rate {
    position: absolute;
    display: inline-block;
    top: 2px;
    right: 7px;
    
}
</style>
