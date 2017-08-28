import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Demo from '@/components/demo/Demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Demo',
            component: r => require.ensure([], () => r(require('../module/index/Index.vue')), 'Index')
        },
        {
            path: '/demo',
            name: 'Demo',
            component: r => require.ensure([], () => r(require('../module/demo/Demo.vue')), 'Demo')
        }
        // {
        //     path: '/demo',
        //     name: 'Demo',
        //     component: Demo
        // }
    ]
})
