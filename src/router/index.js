import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import PatientCreate from '../views/PatientCreate'
import PatientProfile from '../views/PatientProfile'
import PatientList from '../views/PatientList'
import LandingPage from '../views/LandingPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
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
    component: PatientProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
