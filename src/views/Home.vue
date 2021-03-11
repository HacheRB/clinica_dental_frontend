<template>
  <v-container fluid pa-5>
    <v-row>
      <v-col :cols="createAppointment ? 7 : 10">
        <v-row class="d-flex justify-center">
          <v-col>
            <v-checkbox
              color="teal lighten-2"
              label="Todos"
              v-model="all"
              @click=";(selectedEmployees = []), (cleaning = false)"
            >
            </v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              color="teal lighten-2"
              label="Limpiezas"
              v-model="cleaning"
              @click=";(selectedEmployees = []), (all = false)"
            ></v-checkbox>
          </v-col>
          <v-col v-for="(employee, idx) in employees" :key="idx">
            <v-checkbox
              color="teal lighten-2"
              :label="`${employee.firstName} ${employee.lastName}`"
              :value="employee._id"
              v-model="selectedEmployees"
              @change=";(all = false), (cleaning = false)"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-col>
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
      <Calendar
        :cols="calendarCols"
        :showThis="selectedEmployees"
        :all="all"
        :cleaning="cleaning"
      />
      <v-col fill-height v-if="this.$vuetify.breakpoint.lgAndUp">
        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutRight"
        >
          <AppointmentForm
            class="animate__animated animate__fadeInRight"
            v-if="createAppointment"
            :employees="employees"
            :patientNext="patient"
          />
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppointmentForm from '@/components/AppointmentForm'
import EmployeeService from '../services/employeeService'
import Calendar from '@/components/Calendar'

export default {
  name: 'Home',
  components: {
    AppointmentForm,
    Calendar
  },
  props: { patient: Object, toggleForm: Boolean },
  data() {
    return {
      calendarCols: 12,
      createAppointment: false,
      createAppointmentBtnText: 'Crear Cita',
      createAppointmentBtnColor: 'teal darken-2 white--text',
      employees: null,
      all: true,
      cleaning: false,
      selectedEmployees: []
    }
  },
  methods: {
    toggleAppointmentForm() {
      this.createAppointment = !this.createAppointment
      this.createAppointmentBtnText = this.createAppointment
        ? 'Cerrar formulario'
        : 'Crear Cita'
      this.calendarCols = this.createAppointment ? 7 : 12
      this.createAppointmentBtnColor = this.createAppointment
        ? 'red'
        : 'teal darken-2 white--text'
    }
  },
  created() {
    if (this.patient !== undefined || !this.toggleForm) {
      this.toggleAppointmentForm()
    }
    EmployeeService.getEmployees()
      .then(response => {
        this.employees = response.data.employees
      })
      .catch(err => console.log(err))
  }
}
</script>

<style lang="scss" scoped></style>
