import { api } from '../services/apiurl'

export default {
  async getWorkers() {
    return await api.get('/employees')
  }
}
