import { api } from './apiurl'

export default {
  async askForInformation() {
    return await api.post('/contactform/')
  }
}
