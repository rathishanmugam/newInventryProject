import Vue from 'vue'

export default {
  namespaced: true,
  state: {

    purchase: null
  },
  getters: {
    customer: state => state.purchase
  },
  actions: {
    savePurchase({commit, dispatch, state, rootState}, purchase) {
      // Add purchase to the database
      console.log('the saving purchase record is:', purchase)
      const oldpurchase = state.purchase.find(item => item.purchaseNo === purchase.purchaseNo)
      if (!oldpurchase) {
        Vue.axios.post('/purchase', purchase)
          .then((resp) => {
            commit('addPurchaseToState', purchase)
            // commit('product/decreaseStock', purchase, {root: true})
            dispatch('product/updateStock', purchase, {root: true})
            dispatch('getPurchase')
            console.log('iam entering purchase store to make changes')
          })
          .catch((err) => {
            console.log('Error saving product')
            console.log(err)
          })
      } else {
        console.log('purchase Already Exists')
        alert('This purchase already exist \n' + purchase.purchaseNo)
      }
    },
    deletePurchase({commit, dispatch, state}, purchase) {
      // delete purchase in  the database
      const cartItem = state.purchase.find(item => item.purchaseNo === purchase.purchaseNo)
      if (cartItem) {
        Vue.axios.delete('/purchase/' + cartItem.purchaseNo, purchase)
          .then((resp) => {
            console.log('The Deleting Record Is:', purchase.purchaseNo)
            commit('deletePurchaseInState', purchase)
            dispatch('getPurchase')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating purchase')
            console.log(err)
          })
      }
    },

    updatePurchase({commit, dispatch, state}, purchase) {
      // Update purchase in  the database
      const cartItem = state.purchase.find(item => item.purchaseNo === purchase.purchaseNo)
      if (cartItem) {
        Vue.axios.put('/purchase/' + purchase.purchaseNo, purchase)
          .then((resp) => {
            console.log('The Upadating Record Is:', resp)
            commit('updatePurchaseInState', purchase)
            dispatch('getPurchase')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      }
    },

    getPurchase({commit, state, dispatch}) {
      Vue.axios.get('/purchase')
        .then((resp) => {
          let data = resp.data
          console.log('response data:', data)
          if (data && data.length > 0) {
            commit('displayPurchaseToState', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting purchase from table: ' + err)
        })
    }
  },
  mutations: {
    displayPurchaseToState(state, data) {
      // Start by clearing the purchase state...
      state.purchase = []
      if (data && data.length > 0) {
        state.purchase = data    //.push(data)
        console.log('Specific purchase  mutated: ', state.purchase)
      }

    },
    deletePurchaseInState(state, purchase) {
      state.purchase.splice(state.purchase.indexOf(purchase.purchaseNo), 1)
    },
    addPurchaseToState(state, purchase) {
      state.purchase.push(purchase)
    },
    updatePurchaseInState(state, purchase) {
      state.purchase.splice(state.purchase.indexOf(purchase.purchaseNo), 1, purchase)
    }
  }

}
