import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
// 引入我們定義好的路由 ./router/index.js
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
// 入口文件，初始化組件
Vue.config.productionTip = false;
Vue.component("Nav",Nav);  // 将组件挂载到全局
Vue.component('Layout',Layout);


new Vue({
  router,
  store, // 传入 store后给vuex 绑定 $store;
  render: h => h(App)
}).$mount('#app')

// 获取客户端设备的宽度
if(document.documentElement.clientWidth >500){
  window.alert('请使用手机打开本页面!');
  const div = document.createElement('div');
  div.innerText = '请扫描二维码预览项目';
  const img = document.createElement('img');
  img.src="/img/qrcode.png";
  div.appendChild(img);
  document.body.appendChild(div);
  div.classList.add('qrcode');
  
}
