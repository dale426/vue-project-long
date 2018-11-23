// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import iView from 'iview'
import { AgGridVue } from 'ag-grid-vue'
import request from './utils/request'

// import 'iview/dist/styles/iview.css'   // 使用 CSS
import 'src/style/user.less'

import 'src/style/iview/index.less'  // 引入iview本地样式
import axios from 'axios'
// 引入ag-grid样式
import './style/ag-grid/ag-grid.css'
import './style/ag-grid/ag-theme-balham.css'
// import '../node_modules/ag-grid/dist/styles/theme-fresh.css'
// import '../node_modules/ag-grid/dist/styles/ag-theme-balham.css'
var _ = require('lodash')

import hljs from 'highlight.js';
// import hljs from 'highlight.js/lib/highlight';
// import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

Vue.directive('hljs', {
    inserted: function(el) {
        let blocks = el.querySelectorAll('pre code');
        console.log('blocks', blocks);
        
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
      }
}
)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.use(VueRouter);
Vue.use(iView)
Vue.component('AgGridVue', AgGridVue)

/* eslint-disable no-new */
window.vv = new Vue({
    el: '#app',
    router,
    template: '<App/>', // 声明组件
    components: {
        App
    }
})

