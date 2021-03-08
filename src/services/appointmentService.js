import { api } from '../services/apiurl'

export default {
  async getAppointmentsDate() {
    return await api.get('/appointments/date')
  },
  async getAppointments() {
    return await api.get('/appointments')
  },
  async getAppointmentsByQuery(limit, page, input) {
    return await api.get(
      `/appointments/search?input=${input}&limit=${limit}&page=${page}`
    )
  },
  async getAppointmentById(appointmentId) {
    return await api.get(`/appointments/${appointmentId}`)
  },
  async getAppointmentsByPatient(patientId) {
    return await api.get(`/appointments/patients/${patientId}`)
  }
}
