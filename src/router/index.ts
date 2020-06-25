import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Money from '@/views/Money.vue';
import Label from '@/views/Label.vue';
import Statistics from '@/views/Statistics.vue';
import Notfund from '@/views/Notfund.vue';
// 配置路由

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'  // 注意此處是路徑
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/label',
    name: 'label',
    component: Label
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path:'*',
    component:Notfund
  }
]
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  routes
})

export default router
