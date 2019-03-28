import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Demo from '@/components/demo/Demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            // name: 'Main',
            component: r => require.ensure([], () => r(require('../components/main/Main.vue')), 'Main'),
            children: [
                {
                    path: '',
                    redirect: '/long'
                },
                {
                    path: '/long',
                    name: 'long',
                    component: r => require.ensure([], () => r(require('../module/home/Long.vue')), 'Long')
                },
                {
                    path: '/home',
                    name: 'Home',
                    component: r => require.ensure([], () => r(require('../module/home/Home.vue')), 'Home')
                }, {
                    path: '/props',
                    name: 'props',
                    component: r => require.ensure([], () => r(require('../module/props/Props.vue')), 'Props')
                }, {
                    // 图片放大
                    path: '/zoom',
                    name: 'ImgZoom',
                    component: r => require.ensure([], () => r(require('../module/other/Img-zoom.vue')), 'ImgZoom')
                }, {
                    // 动画效果
                    path: '/test',
                    name: 'test',
                    component: r => require.ensure([], () => r(require('../module/demo/Test.vue')), 'Test')
                }, {
                    path: '/fund',
                    name: 'fundIndex',
                    component: r => require.ensure([], () => r(require('../module/fund/index.vue')), 'FundIndex')
                }, {
                    path: '/fund/hold',
                    name: 'fundHolding',
                    component: r => require.ensure([], () => r(require('../module/fund/Fund-holding.vue')), 'Hold')
                }, {
                    path: '/fund/select',
                    name: 'selfSelect',
                    component: r => require.ensure([], () => r(require('../module/fund/Fund-select.vue')), 'Selectself')
                }, {
                    // iview多选表单、tabs render方法
                    path: '/ivu/select',
                    name: 'ivuselect',
                    component: r => require.ensure([], () => r(require('../module/other/Ivu-select.vue')), 'ivuselect')
                }, {
                    // vue父子组件传值
                    path: '/v2parent',
                    name: 'v2parent',
                    component: r => require.ensure([], () => r(require('../module/props/v2/parent.vue')), 'v2parent')
                }, {
                    // vue父子组件传值
                    path: '/hljs/class',
                    name: 'class',
                    component: r => require.ensure([], () => r(require('../module/hljs/class.vue')), 'class')
                }
            
            
            ]
        }]
})

