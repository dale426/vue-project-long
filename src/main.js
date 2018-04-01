// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import iView from 'iview'
import { AgGridVue } from 'ag-grid-vue'

// import 'iview/dist/styles/iview.css'   // 使用 CSS
import 'src/style/user.less'

import 'src/style/iview/index.less'  // 引入iview本地样式
import axios from 'axios'
// 引入ag-grid样式
import '../node_modules/ag-grid/dist/styles/ag-grid.css'
// import '../node_modules/ag-grid/dist/styles/theme-fresh.css'
import '../node_modules/ag-grid/dist/styles/ag-theme-balham.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.use(VueRouter);
Vue.use(iView)
Vue.component('AgGridVue', AgGridVue)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>', // 声明组件
    components: {
        App
    }
})

