import { api } from '../services/apiurl'

export default {
  async getAppointments() {
    return await api.get('/appointments')
  },
  async getAppointmentById(appointmentId) {
    return await api.get(`/appointments/${appointmentId}`)
  }
}
