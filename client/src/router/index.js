import Vue from 'vue'
import Router from 'vue-router'

import Customer from '../components/customer.vue'
import Product from '../components/product.vue'
import Purchase from '../components/purchaseDetails.vue'
import User from '../components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/product',
      name: 'Product',
      component: Product
    }, {
      path: '/customer',
      name: 'Customer',
      component: Customer
    }, {
      path: '/purchase',
      name: 'Purchase',
      component: Purchase
    }, {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
