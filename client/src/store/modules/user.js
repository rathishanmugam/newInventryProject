import Vue from 'vue'
import axios from 'axios';

export default {
  namespaced: true,
  state: {

    user: []
  },
  getters: {
    // user: state => state.user
  },
  actions: {
    saveUser({commit, dispatch, state, rootState}, user) {
      // Add user to the database
      console.log('the saving old state user record is:', state.user)
        Vue.axios.post('/user', user)
          .then((resp) => {
            commit('addUserToState', user)
            dispatch('getUser')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error saving user')
            console.log(err)
          })
    },
    updateUser({commit, dispatch, state}, user) {
      // Update user in  the database
      const cartItem = state.user.find(item => item._id === user._id)
      if (cartItem) {
        // user._id = this.state.user._id
        Vue.axios.put('/user/' + user._id, user)
          .then((resp) => {
            console.log('The Upadating Record Is:', resp)
            commit('updateUserInState', user)
            dispatch('getUser')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error Updating user')
            console.log(err)
          })
      }
    },
    deleteUser({commit, dispatch, state}, user) {
      // Update user in  the database
      const cartItem = state.user.find(item => item._id === user._id)
      console.log('The deleting Record Is:', cartItem)

      if (cartItem) {
        // user._id = this.state.user._id
        Vue.axios.delete('/user/' + cartItem._id, user)
          .then((resp) => {
            console.log('The Deleting Record Is:', user._id)
            commit('deleteUserInState', user)
            dispatch('getUser')
            console.log('iam entering store to make changes')
          })
          .catch((err) => {
            console.log('Error delete user')
            console.log(err)
          })
      }
    },
    getUser({commit, state, dispatch}) {
      console.log('iam entered')
      Vue.axios.get('/user')
        .then((resp) => {
          let data = resp.data
          if (data && data.length > 0) {
            commit('displayUserToState', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting user: ' + err)
        })
    }
  },
  mutations: {
    displayUserToState(state, data) {
      state.user = []
      if (data && data.length > 0) {
        state.user = data //.push(data)
      }
      console.log('Specific user  mutated: ', state.user)
    },
    deleteUserInState(state, user) {
      state.user.splice(state.user.indexOf(user._id), 1)
    },
    addUserToState(state, user) {
      state.user.push(user)
    },
    updateUserInState(state, user) {
      state.user.splice(state.user.indexOf(user._id), 1, user)
    }
  }

}

