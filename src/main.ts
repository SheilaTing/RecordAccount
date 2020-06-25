import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker';
// 引入我們定義好的路由 ./router/index.js
import router from './router'
import store from './store'
// 入口文件，初始化組件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
