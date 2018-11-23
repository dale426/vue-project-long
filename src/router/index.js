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
                    path: '/zoom',
                    name: 'ImgZoom',
                    component: r => require.ensure([], () => r(require('../module/other/Img-zoom.vue')), 'ImgZoom')
                }, {
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
                    path: '/ivu/select',
                    name: 'ivuselect',
                    component: r => require.ensure([], () => r(require('../module/other/Ivu-select.vue')), 'ivuselect')
                }, {
                    path: '/hljs/class',
                    name: 'Class',
                    component: r => require.ensure([], () => r(require('../module/hljs/class.vue')), 'Class')
                }]
        }]
})

