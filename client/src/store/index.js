import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import customer from './modules/customer'
import purchase from './modules/purchase'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    product,
    purchase,
    customer,
    user
  }

})
