import Vue from 'vue'
import axios from 'axios';

export default {
  namespaced: true,

  state: {
    calculate: [],
    product: [],
    newProd:[],
  },
  getters: {
    // product: state => state.product
  },
  actions: {
    updateStock({commit, state, dispatch, rootstate}, purchase) {
      console.log('iam entering update stock')
      console.log('entry in product stock', state.product)
      const stock = state.product.find(item => item.productId === purchase.productId)
      console.log('asked stock in product table', stock.stock)
      console.log('the purchase table quantity', purchase.quantity)
      let total1 = parseInt(stock.stock) - parseInt(purchase.quantity)
      console.log('the total stock now is calculated', total1)
       console.log('the product state is' , stock)
      const newProd = {
        productId: stock.productId,
        productName: stock.productName,
        productModel: stock.productModel,
        productOffer: stock.productOffer,
        cost: stock.cost,
        stock: total1,
        sold: stock.sold,
        balance: stock.balance
      }
      console.log('the new product after redusing stock',newProd)
      Vue.axios.put('/product/' + purchase.productId, newProd)
        .then((resp) => {
          console.log('The Upadating Record from axios Is:', resp)
          commit('updateProductInState', newProd)
          dispatch('getCustomer')
          console.log('iam entering store to make changes')
        })
    },
    saveProduct({commit, dispatch, state, rootState}, product) {
      // Add product to the database
      console.log('iam entering to check it exit or not')
      const stock = state.product.find(item => item.productId === product.productId)
      if (stock) {
        console.log('the  store stock  is:', stock.stock)
        console.log('the new stock entered is:', product.stock)
        const newStock = parseInt(stock.stock) + parseInt(product.stock)
        console.log('the new calculated stock is', newStock)
        let newProduct = {
          productId: product.productId,
          productName: product.productName,
          productModel: product.productModel,
          productOffer: product.productOffer,
          cost: product.cost,
          stock: newStock,
          sold: product.sold,
          balance: product.balance
        }
        console.log('the new product is', newProduct)
        console.log('Product Already Exists')
        Vue.axios.put('/product/' + product.productId, newProduct)
          .then((resp) => {
            console.log('The Upadating only stock Record from axios Is:', resp)
            commit('updateProductInState', newProduct)
            dispatch('getCustomer')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      } else {
        Vue.axios.post('/product', product)
          .then((resp) => {
            commit('addProductToState', product)
            dispatch('getCustomer')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error saving product')
            console.log(err)
          })
      }
    },
    updateProduct({commit, dispatch, state}, product) {
      // Update product in  the database
      const cartItem = state.product.find(item => item.productId === product.productId)
      console.log('the Update  product Axiox is', product)

      if (cartItem) {
        // product.productId = this.state.product.productId
        Vue.axios.put('/product/' + product.productId, product)
          .then((resp) => {
            console.log('The Upadating Record from axios Is:', resp)
            commit('updateProductInState', product)
            dispatch('getCustomer')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      }
    },
    deleteProduct({commit, dispatch, state}, product) {
      console.log('The Deleting Record Is axoix:', product.productId)

      // Update product in  the database
      // const cartItem = state.product.find(item => item.productId === product.productId)
      // if (cartItem) {
      // product.productId = this.state.product.productId
      Vue.axios.delete('/product/' + product.productId, product)
        .then((resp) => {
          console.log('The Deleting Record Is:', product.productId)
          commit('deleteProductInState', product)
          dispatch('getCustomer')
          console.log('iam entering store to make changes')
        })
        .catch((err) => {
          console.log('Error deleting product')
          console.log(err)
        })

    },

    getCustomer({commit, state, dispatch}) {
      Vue.axios.get('/product')
        .then((resp) => {
          let data = resp.data
          if (data && data.length > 0) {
            commit('displayProductToState', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting product: ' + err)
        })
    }
  },
  mutations: {
    displayProductToState(state, data) {
      // state.product = []
      if (data && data.length > 0) {
        state.product = data //.push(data)
      }
      console.log('Specific product  mutated: ', state.product)
    },
    deleteProductInState(state, product) {
      state.product.splice(state.product.indexOf(product.productId), 1)
    },
    addProductToState(state, product) {
      state.product.push(product)
      console.log('THE push record is', state.product)
    },
    updateProductInState(state, product) {
      state.product.splice(state.product.indexOf(product.productId), 1, product)
    }
  }

}
