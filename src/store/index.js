import { createStore } from 'vuex'
import { fetchAllRecords } from '@/services/airtable'
import CONSTANTS from '@/constants'

const store = createStore({
  state: {
    appointments: [],
    count: 0
  },
  mutations: {
    setAppointments(state, appointments) {
      state.appointments = appointments
    },
    increment(state) {
      state.count++
    }
  },
  actions: {
    async fetchAppointments({ commit }) {
      try {
        const records = await fetchAllRecords(CONSTANTS.AT_TN_APPOINTMENTS)
        commit('setAppointments', records)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    },
    increment({ commit }) {
      commit('increment')
    }
  },
  getters: {
    appointments: state => state.appointments,
    count: state => state.count
  }
})

export default store
