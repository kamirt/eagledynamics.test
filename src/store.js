import Vue from 'vue'
import Vuex from 'vuex'
import vehicles from './store/vehicles'
import user from './store/user'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    vehicles
  }
})
