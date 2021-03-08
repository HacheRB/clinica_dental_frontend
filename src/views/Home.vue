<template>
  <v-container>
    <v-row>
      <v-col cols="7"> </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          @click="toggleAppointmentForm"
          :color="createAppointmentBtnColor"
          dark
          >{{ createAppointmentBtnText }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="d-flex flex-col fill-height">
      <Calendar :cols="calendarCols" />
      <v-col v-if="this.$vuetify.breakpoint.lgAndUp">
        <AppointmentForm v-if="createAppointment" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppointmentForm from '@/components/AppointmentForm'
import Calendar from '@/components/Calendar'

export default {
  name: 'Home',
  components: {
    AppointmentForm,
    Calendar
  },
  data() {
    return {
      patientId: '',
      calendarCols: 12,
      createAppointment: false,
      createAppointmentBtnText: 'Crear Cita',
      createAppointmentBtnColor: 'teal'
    }
  },
  methods: {
    toggleAppointmentForm() {
      this.createAppointment = !this.createAppointment
      this.createAppointmentBtnText = this.createAppointment
        ? 'Cerrar formulario'
        : 'Crear Cita'
      this.calendarCols = this.createAppointment ? 7 : 12
      this.createAppointmentBtnColor = this.createAppointment ? 'red' : 'teal'
    }
  }
}
</script>

<style lang="scss" scoped></style>
