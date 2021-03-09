<template>
  <v-col>
    <v-card color="#B2DFDB">
      <v-card-title class="headline teal--text">
        <strong>Citas</strong>
        <v-spacer></v-spacer>
        <v-btn color="teal lighten-2 white--text" grow @click="addAppointment()"
          >Crear Cita
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row
          class="mb-5"
          v-for="(appointment, idx) in appointments"
          :key="idx"
        >
          <v-col cols="4" class="d-flex justify-start font-weight-medium">
            {{ appointment.employees }}
          </v-col>
          <v-col cols="4" class="d-flex justify-center"
            ><strong>{{ appointment.intervention }}</strong></v-col
          >
          <v-col cols="3" class="d-flex justify-end">{{
            appointment.start
          }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import AppointmentService from '@/services/appointmentService'
export default {
  name: 'PatientDates',
  data() {
    return {
      appointments: []
    }
  },
  methods: {
    addAppointment: function() {
      this.$router.push({ path: '/home' })
    }
  },
  created() {
    AppointmentService.getAppointmentsByPatient(
      this.$route.params.patientId
    ).then(appointments => {
      appointments.data.forEach(appointment => {
        let employees = ''
        if (appointment.employees.length > 1) {
          appointment.employees.forEach(employee => {
            employees += `${employee.firstName} ${employee.lastName.slice(
              0,
              3
            )}. - `
          })
          employees = employees.slice(0, employees.length - 2)
        } else {
          employees = `${
            appointment.employees[0].firstName
          } ${appointment.employees[0].lastName.slice(0, 3)}.`
        }
        this.appointments.push({
          employees: employees,
          start: appointment.start,
          intervention: appointment.intervention
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
