import Vue from 'vue'
import VueRouter from 'vue-router'
import PatientProfile from '../views/PatientProfile'
import PatientList from '../views/PatientList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/patients/:patientId',
    name: 'PatientProfile',
    component: PatientProfile,
    props: true
  },
  {
    path: '/patientsList',
    name: 'PatientList',
    component: PatientList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
