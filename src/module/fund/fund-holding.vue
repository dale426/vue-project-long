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
        <!-- <Button type="primary" @click="queryFund">请求</Button> -->
        <Button type="primary" @click="queryFund">获取列表</Button>
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
    import { getDataFormat } from '../../utils/utils'
    export default {
        name: 'fundHolding',
        data() {
            return {
                gridOptions: {},
                columnDefs: null,
                tableHeaderRowHeight,
                tableRowHeight,
                rowData: [],
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
            this.createColumnDefs()
            this.gridOptions.onGridReady = () => {
                window.onresize = () => {
                    this.gridOptions.api.sizeColumnsToFit()
                }
                this.gridOptions.api.sizeColumnsToFit()
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
        methods: {
            // 查询指定基金 近20个交易日的数据
            async queryFund(code) {
                let url = '/FundMApi/FundNetDiagram.ashx'
                let data = await request.get(url, {FCODE: code})
                this.rowData.filter(element => {
                    if (element.code === code) {
                        element.twentyData = data.Datas
                    }
                })
                console.log(this.rowData)
                this.queryTodayFund()
            },
            // 查询指定基金 当前价格
            async queryTodayFund(code) {
                let data = await request.jsonp(code + '.js', {}, 'jsonpgz')
                console.log(data)
            },
            async queryFundList() {
                let data = await request.get('/fund/holdfund/list', {})
                if (data.success === true) {
                    this.rowData = data.data || []
                    this.total = data.data.length || 0
                    this.rowData.forEach(element => {
                        if (element.code) {
                            this.queryFund(element.code)
                            this.queryTodayFund(element.code)
                        }
                    })
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
                    headerName: "序号",
                    field: "number",
                    minWidth: 60,
                    width: 60,
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
                    headerName: "买入金额",
                    field: "buyMoney",
                    minWidth: 80
                }, {
                    headerName: "手续费",
                    field: "rateFee",
                    minWidth: 80
                }, {
                    headerName: "买入时间",
                    field: "buyTime",
                    minWidth: 140,
                    cellRenderer: function(params) {
                        return getDataFormat(new Date(params.value), 'yyyy-MM-dd hh:mm:ss')
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
