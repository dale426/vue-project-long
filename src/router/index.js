import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Demo from '@/components/demo/Demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: r => require.ensure([], () => r(require('../module/index/Index.vue')), 'Index')
        },
        {
            path: '/home',
            name: 'home',
            component: r => require.ensure([], () => r(require('../module/index/Home.vue')), 'Home')
        },
        {
            path: '/demo',
            name: 'demo',
            component: r => require.ensure([], () => r(require('../components/header/contenerWrap.vue')), 'Home')
        }
    ]
})
