// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import iView from 'iview'
// import 'iview/dist/styles/iview.css'   // 使用 CSS
import 'src/style/user.less'

import 'src/style/iview/index.less'  // 引入iview本地样式
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.use(VueRouter);
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>', // 声明组件
    components: {
        App
    }
})

