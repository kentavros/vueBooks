import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Registration from '@/components/Registration'
import Cart from '@/components/Cart'
import Admin from '@/components/Admin'
import AdminRegist from '@/components/AdminRegist'
import NewBook from '@/components/NewBook'
import AdminOrders from '@/components/AdminOrders'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
      
    },
    {
      path: '/registration',
      name: 'RegistrForm',
      component: Registration
    },
    {
      path: '/cart',
      name: 'cartForm',
      component: Cart
    },
    {
      path: '/admin',
      name: 'adminForm',
      component: Admin,
      children: [
        {
          path: 'regist',
          component: AdminRegist
        },
        {
          path: 'newbook',
          component: NewBook
        },
        {
          path: 'orders',
          component: AdminOrders
        }
      ]
    }
  ]
})
