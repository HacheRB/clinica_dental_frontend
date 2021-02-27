import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default {
  async createUser(patient) {
    console.log('entro en el service')
    return await api.post('/patients', patient)
  },
  async getPatients() {
    return await api.get('/patients')
  }
}
