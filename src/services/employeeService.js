import { api } from '../services/apiurl'

export default {
  async getEmployees() {
    return await api.get('/employees')
  }
}
