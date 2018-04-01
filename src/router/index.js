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
                },
                {
                    path: '/props',
                    name: 'props',
                    component: r => require.ensure([], () => r(require('../module/props/Props.vue')), 'Props')
                },
                {
                    path: '/test',
                    name: 'test',
                    component: r => require.ensure([], () => r(require('../module/demo/Test.vue')), 'Test')
                },
                {
                    path: '/fundhold',
                    name: 'fundHolding',
                    component: r => require.ensure([], () => r(require('../module/fund/Fund-holding.vue')), 'Test')
                }
            ]
        }

       /*
        {
            path: '/home',
            name: 'home',
            component: r => require.ensure([], () => r(require('../module/index/Home.vue')), 'Home')
        },
        {
            path: '/test',
            name: 'test',
            component: r => require.ensure([], () => r(require('../module/demo/Test.vue')), 'Test')
        },
         */
    ]
})
