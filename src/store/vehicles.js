import api from './api'

export default {
  state: {
    vehicles: []
  },
  mutations: {
    setVehicles (state, data) {
      state.vehicles = data
    }
  },
  actions: {
    fetchVehicles ({ commit }) {
      api.getVehicles().then((data) => {
        commit('setVehicles', data)
      })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
