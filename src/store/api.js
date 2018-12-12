'user strict'
import user from './mock/user.json'
import vehicles from './mock/vehicles.json'

export default {
  getUser () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(user)
      }, 300)
    })
  },
  getVehicles () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(vehicles)
      }, 300)
    })
  }
}
