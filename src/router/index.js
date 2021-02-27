import Vue from 'vue'
import VueRouter from 'vue-router'
import PatientCreate from '../views/PatientCreate'
import PatientProfile from '../views/PatientProfile'
import PatientList from '../views/PatientList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/patients/create',
    name: 'PatientCreate',
    component: PatientCreate
  },
  {
    path: '/patients/list',
    name: 'PatientList',
    component: PatientList
  },
  {
    path: '/patients/:idPatient',
    name: 'PatientProfile',
    component: PatientProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
