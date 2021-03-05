import { api } from './apiurl'

export default {
  async getAppointmentsDate() {
    return await api.get('/appointments')
  }
}
