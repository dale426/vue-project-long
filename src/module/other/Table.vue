<template>
  <Row class="wrap" style="width:600px;">
    <EasyScrollbar>
      <div style="width:1200px;">
        <Table border :height="200" :columns="tableColumns" :data="tableData"></Table>
      </div>
    </EasyScrollbar>
    <p>------------------</p>
    <div>
        <LongScroll>
            <Table border :height="200" :columns="tableColumns" :data="tableData"></Table>
        </LongScroll>
    </div>
  </Row>
</template>
<script>
import LongScroll from './LongScroll.vue'
export default {
  data() {
    return {
      mulLabel: [],
      tableColumns: this.tableColumnsFun(),
      tableData: [{
        id: '第一条数据',
        companyName: '菜鸟',
        contractName: '李玉',
        contractPhone: '17756234589',
        productType: 1
      },
      {
        id: '第222数据',
        companyName: '京东',
        contractName: '啦啦',
        contractPhone: '17756234589',
        productType: 2
      }]

    }
  },
  components: {
    LongScroll
  },
  mounted() {
    window.onresize = () => {

    }
  },
  methods: {
    tableColumnsFun() {
      return [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
            let state = params.row.customState
            let currDropList = [{ keyname: '编辑' }, { keyname: '分配' }]
            return h(
              'Dropdown',
              {
                props: {
                  trigger: 'hover',
                  placement: 'bottom-start'
                },
                on: {
                  'on-click': value => {
                    this.tableClickEvent(value, params.row)
                  }
                }
              },
              [
                h(
                  'Button',
                  {
                    style: {
                      color: '#118CEE',
                      borderColor: '#118CEE',
                      width: '60px',
                      height: '24px',
                      padding: 0,
                      paddingLeft: '5px'
                    }
                  },
                  [
                    h('span', '操作'),
                    h('Icon', {
                      props: {
                        type: 'ios-arrow-down'
                      }
                    })
                  ]
                ),
                h(
                  'DropdownMenu',
                  {
                    slot: 'list',
                    style: {
                      width: '60px'
                    }
                  },
                  currDropList.map(item => {
                    return h(
                      'DropdownItem',
                      {
                        props: {
                          name: item.keyname
                        }
                      },
                      item.keyname
                    )
                  })
                )
              ]
            )
          }
        },
        {
          title: '公司名称',
          key: 'companyName',
          minWidth: 120,
          render: (h, params) => {
            return h('a', {
              domProps: {
                href: 'javascript:void(0);',
              },
              on: {
                'click': value => {
                  this.$Message.warning(params.row.id)
                }
              }
            }, params.row.companyName)
          }
        },
        {
          title: '联系人',
          key: 'contractName',
          minWidth: 120
        },
        {
          title: '测试组',
          key: 'contractPhone',
          minWidth: 120,
          render: (h, params) => {
            return h('p',
              {
                props: {
                  // 组件peops
                },
                style: {
                  // style样式属性
                  height: '60px',
                  border: "1px solid lightblue"
                },
                domProps: {
                  // dom原生属性
                  href: 'javascript:void(0);',
                },
                on: {
                  // 绑定 vue事件
                },
                nativeOn: {
                  // 绑定原生事件
                  click: value => {
                    this.$Message.success('点击事件成功啦')
                  },
                  keydown: event => {
                    console.log('event.target.value', event.target.value);
                  }
                }
              },
              [h('span', {
                style: {
                  background: 'lightgreen'
                }
              }, 55),
              [h('a', {
                style: {
                  border: '1px solid red'
                }
              }, '我是a标签')
              ]
              ], )
          }
        },
        {
          title: '联系电话',
          key: 'contractPhone',
          minWidth: 120
        },
        {
          title: '产品类型',
          key: 'productType',
          minWidth: 120,
          render: (h, params) => {
            return h('span', params.row.productType == 1 ? '电子产品' : '吃货必备')
          }
        },
      ]
    }
  }
}
</script>
<style lang="less">
.wrap {
  // width: 600px;
  padding: 30px;
}
</style>
