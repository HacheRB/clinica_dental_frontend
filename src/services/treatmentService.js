import { api } from './apiurl'

export default {
  async createTreatment(treatment) {
    return await api.post('/treatments', treatment)
  }
}
