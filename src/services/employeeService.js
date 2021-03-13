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
  },
  async updateEmployee(employeeId, employee) {
    return await api.put(`/employees/${employeeId}`, employee)
  },
  async getMe() {
    return await api.get(`/employees/me/${localStorage.employeeId}`, {
      headers: {
        token: localStorage.token
      }
    })
  }
}
