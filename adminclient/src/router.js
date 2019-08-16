/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 20:57:41
 * @LastEditTime: 2019-08-10 10:39:39
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

import NotFound from './views/404.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      component: () => import('./views/index.vue'),
      children: [
        { path: '', component: () => import('./views/home.vue') },
        { path: '/home', name: 'home', component: () => import('./views/home.vue') },
        { path: '/infoshow', name: 'infoshow', component: () => import('./views/InfoShow.vue') },
        { path: '/fundlist', name: 'fundlist', component: () => import('./views/fundList.vue') }
      ]
    },
    {
      path: '/registered',
      name: 'registered',
      component: () => import('./views/registered.vue')
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.eleToken /* 在login.vue中存储了 */
  if (to.path === '/login' || to.path === '/registered') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
