import Vue from 'vue'
import VueRouter from 'vue-router'
import PatientCreate from '../views/PatientCreate'
import PatientProfile from '../views/PatientProfile'
import PatientList from '../views/PatientList'
import LandingPage from '../views/LandingPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
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
    path: '/patients/:patientId',
    name: 'PatientProfile',
    component: PatientProfile,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
