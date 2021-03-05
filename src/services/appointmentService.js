import { api } from './apiurl'

export default {
  async getAppointmentsDate() {
    return await api.get('/appointments')
  },
  async createAppointmentsDate(appointment) {
    return await api.post('/appointments', appointment)
  }
}
