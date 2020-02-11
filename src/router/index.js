import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login.vue'

import indexList from './indexList'
import systemList from './systemList'
import userList from './userList'
import goods from './goods'/* 商品 */
import promotion from './promotion'/* 促销 */
import order from './order'/* 订单 */
import user from './user'/* 用户 */
import operate from './operate'/* 运营 */
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: Index,
  meta: { title: '首页' },
  children: [
    indexList,
    systemList,
    userList,
    goods,
    promotion,
    order,
    user,
    operate,
    {
      path: 'article',
      name: 'article',
      redirect: '/article/index',
      meta: { title: '文章管理' },
      component: () => import( /* webpackChunkName: "article" */ '../views/shop/comIndex.vue'),
      children: [{
        path: 'index',
        name: 'article_Idx',
        meta: { title: '文章管理' },
        component: () => import( /* webpackChunkName: "articleIdx" */ '../views/shop/articel_idx.vue')
      }, {
        path: 'add',
        name: 'article_add',
        meta: { title: '添加文章' },
        component: () => import( /* webpackChunkName: "addArticle" */ '../views/shop/articel_add&alter.vue')
      }, {
        path: 'alter',
        name: 'article_alter',
        meta: { title: '文章修改' },
        component: () => import( /* webpackChunkName: "alterArticle" */ '../views/shop/articel_add&alter.vue')
      }]
    },
    {
      path: 'supplier',
      name: 'supplier',
      redirect: '/supplier/index',
      meta: { title: '店铺管理' },
      component: () => import( /* webpackChunkName: "index" */ '../views/shop/comIndex.vue'),
      children: [{
        path: 'index',
        name: 'supplier_Idx',
        meta: { title: '店铺列表' },
        component: () => import( /* webpackChunkName: "supplierIdx" */ '../views/shop/supplier_idx.vue')
      }, {
        path: 'add',
        name: 'supplier_add',
        meta: { title: '添加店铺' },
        component: () => import( /* webpackChunkName: "addIndex" */ '../views/shop/supplier_add&alter.vue')
      }, {
        path: 'alter',
        name: 'supplier_alter',
        meta: { title: '修改店铺' },
        component: () => import( /* webpackChunkName: "alterIndex" */ '../views/shop/supplier_add&alter.vue')
      }]
    },
  ]
},

{
  path: '/login',
  name: 'login',
  component: Login
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router