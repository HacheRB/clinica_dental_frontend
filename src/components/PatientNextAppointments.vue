<template>
  <v-card color="#B2DFDB" height="500px">
    <v-card-title class="headline teal--text">
      <strong>Citas</strong>
      <v-spacer></v-spacer>
      <v-btn
        color="teal darken-2 white--text"
        grow
        :to="{ name: 'Home', params: { patient } }"
        >Crear Cita
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="(appointment, idx) in appointments"
          :key="idx"
          small
          color="teal"
        >
          <div>
            <div>
              <strong>
                {{ appointment.intervention }}
              </strong>
            </div>
            <div>
              {{ appointment.start }}
            </div>
            <div>
              <strong>
                {{ appointment.employees }}
              </strong>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import AppointmentService from '@/services/appointmentService'

import PatientService from '../services/patientService'
export default {
  name: 'PatientDates',
  data() {
    return {
      appointments: [],
      patient: {}
    }
  },
  mounted() {
    AppointmentService.getAppointmentsByPatient(this.$route.params.patientId)
      .then(appointments => {
        this.sortByStart(appointments.data)

        for (let i = 0; i < 3; i++) {
          this.formatAppointments(appointments.data[i])
        }
      })
      .catch(err => console.log(err))

    PatientService.getPatientById(this.$route.params.patientId)
      .then(request => {
        this.patient = request.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    sortByStart(appointments) {
      appointments.sort(function(a, b) {
        return new Date(a.start) - new Date(b.start)
      })
    },
    formatAppointments(appointment) {
      let employees = appointment.employees
        .map(employee => {
          return `${employee.firstName} ${employee.lastName.slice(0, 3)}`
        })
        .join('. -')
      this.appointments.push({
        employees: employees,
        start: appointment.start,
        intervention: appointment.intervention,
        color: 'teal'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
