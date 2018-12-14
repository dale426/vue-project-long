<template>
  <Row class="wrap">
    <div style="min-height: 120px;">
      <Col span="4" style="padding-right:10px">
        <Select
          v-model="model13"
          filterable
          remote
          :remote-method="remoteMethod1"
          :loading="loading1"
        >
          <Option
            v-for="(option, index) in options1"
            :value="option.value"
            :key="index"
          >{{option.label}}</Option>
        </Select>
      </Col>
      <Col span="5">
        <Select
          v-model="model14"
          multiple
          filterable
          remote
          :label="mulLabel"
          :remote-method="remoteMethod2"
          :loading="loading2"
        >
          <Option
            v-for="(option, index) in options2"
            :value="option.value"
            :key="index"
          >{{option.label}}</Option>
        </Select>
      </Col>
      <Col span="5">
        <div style="border: 1px solid red;">
          <div v-if="index === 0" v-for="(item, index) in doubleList" :key="index">{{item.name}}</div>
        </div>

        <ul style="border: 1px solid blue">
          <li v-if="index > 0" v-for="(item, index) in doubleList" :key="index">{{item.name}}</li>
        </ul>
        <Button type="primary" @click="clickIT">chang data</Button>
      </Col>
    </div>
    <div>
      <Table border :height="400" :columns="tableColumns" :data="tableData"></Table>
    </div>
  </Row>
</template>
<script>
export default {
  data() {
    return {
      model13: 'hkfdhsk',
      loading1: false,
      options1: [],

      model14: [],
      mulLabel: [],
      loading2: false,
      options2: [],
      list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
      list2: [{
        label: 123,
        value: 'lala'
      },
      {
        label: 456,
        value: 'bobo'
      }],
      doubleList: [{
        name: 123,
        value: 'nana'
      },
      {
        name: 123456,
        value: 'kakak'
      }],
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
  mounted() {
    this.queryName();
    // this.query();
  },
  methods: {
    clickIT() {
      this.doubleList = [{
        name: 123,
        value: 'nana'
      },
      {
        name: 123456,
        value: 'kakak'
      }, {
        name: 123,
        value: 'nana'
      },
      {
        name: 123456,
        value: 'kakak'
      }]
    },
    queryName() {
      setTimeout(() => {
        this.model14 = ['Alabama', 'Arkansas', 'Connecticut'];
        this.mulLabel = ['Alabama', 'Arkansas', 'Connecticut'];
      }, 1000);
    },
    remoteMethod1(query) {
      if (query !== '') {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          this.options1 = this.list2
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }, 200);
      } else {
        this.options2 = [];
      }
    },
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
