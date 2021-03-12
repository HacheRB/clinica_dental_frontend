import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import PatientProfile from '../views/PatientProfile'
import Patients from '../views/Patients'
import LandingPage from '../views/LandingPage'
import Appointments from '../views/Appointments'
import PatientMedicalHistory from '../views/PatientMedicalHistory.vue'
import Employees from '../views/Employees'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/patients/list',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/patients/:patientId/MedicalHistory',
    name: 'MedicalHistory',
    component: PatientMedicalHistory,
    props: true
  },
  {
    path: '/patients/:patientId',
    name: 'PatientProfile',
    component: PatientProfile
  },
  {
    path: '/appointments/list',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: '/employees/list',
    name: 'Employees',
    component: Employees
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
