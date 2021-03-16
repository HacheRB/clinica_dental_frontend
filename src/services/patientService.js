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
  },
  async updatePatient(patient, patientId) {
    return await api.put(`/patients/${patientId}`, patient)
  },
  async getPatientsByQuery(limit, page, input) {
    return await api.get(
      `/patients/search?input=${input}&limit=${limit}&page=${page}`
    )
  },
  async addFiletoPatient(patientId, file) {
    return await api.post(`/patients/${patientId}/files`, file)
  }
  // async deleteFileFromPatient(patientId) {
  //   return await api.get(`/patients/${patientId}/files`)
  // }
}
