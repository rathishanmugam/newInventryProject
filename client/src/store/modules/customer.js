import Vue from 'vue'
import axios from 'axios';

export default {
  namespaced: true,
  state: {

    customer: []
  },
  getters: {
    // customer: state => state.customer
  },
  actions: {
    saveCustomer({commit, dispatch, state, rootState}, customer) {
      // Add customer to the database
      console.log('the saving old state customer record is:', state.customer)

      const oldCustomer = state.customer.find(item => item.customerId === customer.customerId)
      console.log('the saving old customer record is:', oldCustomer)

      if (!oldCustomer) {
        Vue.axios.post('/customer', customer)
          .then((resp) => {
            commit('addCustomerToState', customer)
            dispatch('getCustomer')
console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error saving customer')
            console.log(err)
          })

      } else {
        console.log('Customer Already Exists')
        alert('This customer already exist \n' + customer.customerId)
      }
    },
    updateCustomer({commit, dispatch, state}, customer) {
      // Update customer in  the database
      const cartItem = state.customer.find(item => item.customerId === customer.customerId)
      if (cartItem) {
        // customer.customerId = this.state.customer.customerId
        Vue.axios.put('/customer/' + customer.customerId, customer)
          .then((resp) => {
            console.log('The Upadating Record Is:', resp)
            commit('updateCustomerInState', customer)
            dispatch('getCustomer')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating customer')
            console.log(err)
          })
      }
    },
    deleteCustomer({commit, dispatch, state}, customer) {
      // Update customer in  the database
      const cartItem = state.customer.find(item => item.customerId === customer.customerId)
      if (cartItem) {
        // customer.customerId = this.state.customer.customerId
        Vue.axios.delete('/customer/' + cartItem.customerId, customer)
          .then((resp) => {
            console.log('The Deleting Record Is:', customer.customerId)
            commit('deleteCustomerInState', customer)
            dispatch('getCustomer')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating customer')
            console.log(err)
          })
      }
    },
    getCustomer({commit, state, dispatch}) {
      Vue.axios.get('/customer')
        .then((resp) => {
          let data = resp.data
          if (data && data.length > 0) {
            commit('displayCustomerToState', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting customer: ' + err)
        })
    }
  },
  mutations: {
    displayCustomerToState(state, data) {
      state.customer = []
      if (data && data.length > 0) {
        state.customer=data //.push(data)
      }
      console.log('Specific customer  mutated: ', state.customer)
    },
    deleteCustomerInState(state, customer) {
      state.customer.splice(state.customer.indexOf(customer.customerId), 1)
    },
    addCustomerToState(state, customer) {
      state.customer.push(customer)
    },
    updateCustomerInState(state, customer) {
      state.customer.splice(state.customer.indexOf(customer.customerId), 1, customer)
    }
  }

}

