import { api } from './apiurl'

export default {
  async login(email, password) {
    return await api.post('/auth/login', {
      email: email,
      password: password
    })
  }
}
