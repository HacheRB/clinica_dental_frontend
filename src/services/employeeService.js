import { api } from '../services/apiurl'

export default {
  async getEmployees() {
    return await api.get('/employees')
  },
  async getEmployeesByQuery(limit, page, input) {
    return await api.get(
      `/employees/search?input=${input}&limit=${limit}&page=${page}`
    )
  },
  async createEmployee(employee) {
    return await api.post(`/employees`, employee)
  }
}
