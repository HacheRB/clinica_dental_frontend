import { api } from '../services/apiurl'

export default {
  async getAppointments() {
    return await api.get('/appointments')
  }
}
