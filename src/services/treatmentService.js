import { api } from '../services/apiurl'

export default {
  async getFinishedTreatmentByPatient(patientId) {
    return await api.get(`/treatments/patients/${patientId}`)
  }
}
