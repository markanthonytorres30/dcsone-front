import { defineStore } from 'pinia'

export const useEnrollmentStore = defineStore('enrollment', {
  state: () => {
    return { enrollmentData: null, paymentData: null }
  },
  getters: {
    getData: (state) => {
      return state.enrollmentData
    },
    getPayment: (state) => {
      return state.paymentData
    }
  },
  actions: {
    save(data) {
      this.enrollmentData = data
    },

    savePayment(data) {
      this.paymentData = data
      console.log(data)
    },

    clearPayment() {
      this.paymentData = null
    },

    clearAll() {
      this.enrollmentData = data
      this.paymentData = null
    }
  }
})
