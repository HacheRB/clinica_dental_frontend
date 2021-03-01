import { api } from './apiurl'

export default {
  async createUser(patient) {
    console.log('entro en el service')
    return await api.post('/patients', patient)
  },
  async getPatients() {
    return await api.get('/patients')
  },
  async getPatientById(id) {
    return await api.get(`/patients/${id}`)
  }
}
