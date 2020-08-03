import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Money from '@/views/Money.vue';
import Label from '@/views/Label.vue';
import Statistics from '@/views/Statistics.vue';
import Notfund from '@/views/Notfund.vue';
import EditLabel from '@/views/EditLabel.vue';
// 配置路由

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'  // 注意此處是路徑
  },
  {
    path: '/money',
    name: '记账',
    component: Money
  },
  {
    path: '/label',
    name: '标签',
    component: Label
  },
  {
    path: '/statistics',
    name: '统计',
    component: Statistics
  },
  {
    path:'/labels/edit/:id', //获得点击的地址栏中 edit/后的内容 ：id 用来占位
    component:EditLabel,
  },
  {
    path: '*',
    component: Notfund
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
