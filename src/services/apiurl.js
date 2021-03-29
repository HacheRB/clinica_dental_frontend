import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gestionclinicadental.herokuapp.com/api'
  //baseURL: 'http://localhost:3000/api'
})
