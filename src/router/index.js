import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Registration from '@/components/Registration'
import Cart from '@/components/Cart'
// import UserOrders from '@/components/UserOrders'

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
    }
  ]
})
