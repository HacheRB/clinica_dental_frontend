import { api } from '../services/apiurl'

export default {
  async getPatientTreatments(patientId) {
    return await api.get(`/treatments/patients/${patientId}`)
  },
  async getPatientTreatmentsByQuery(patientId, query) {
    return await api.get(
      `/treatments/patients/${patientId}/search?input=${query}`
    )
  },
  async getFinishedTreatmentByPatient(patientId) {
    return await api.get(`/treatments/patients/${patientId}/finished`)
  },
  async createTreatment(treatment) {
    return await api.post('/treatments', treatment)
  },
  async updateTreatment(treatment) {
    return await api.put(`/treatments/${treatment._id}`, treatment)
  }
}
