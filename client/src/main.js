// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuetify from 'vuetify'
import {currency} from "@/currency";


Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('currency', currency)


// Setup axios to be available globally through Vue
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8081/api'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


