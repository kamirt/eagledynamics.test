import api from './api'

export default {
  state: {
    user: {
      username: '',
      avatar: '',
      rank: '',
      score: 0
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    fetchUser ({ commit }) {
      api.getUser().then((data) => {
        commit('setUser', data)
      })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
