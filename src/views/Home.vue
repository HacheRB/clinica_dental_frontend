<template>
  <v-container fluid pa-5>
    <v-row>
      <v-col class="d-flex align-center">
        <ChooseDoctor
          @getemployees="getSelectedEmployees"
          :employees="employees"
        ></ChooseDoctor>
      </v-col>
      <v-col>
        <v-checkbox
          color="teal lighten-2"
          label="Limpiezas"
          v-model="cleaning"
        ></v-checkbox>
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
        :cleaning="cleaning"
      />
      <v-col fill-height v-if="this.$vuetify.breakpoint.lgAndUp">
        <AppointmentForm
          v-show="createAppointment"
          :employees="employees"
          :patientNext="patient"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChooseDoctor from '../components/ChooseDoctor'
import AppointmentForm from '@/components/AppointmentForm'
import EmployeeService from '../services/employeeService'
import Calendar from '@/components/Calendar'

export default {
  name: 'Home',
  components: {
    AppointmentForm,
    Calendar,
    ChooseDoctor
  },
  props: { patient: Object, toggleForm: Boolean },
  data() {
    return {
      calendarCols: 12,
      createAppointment: false,
      createAppointmentBtnText: 'Crear Cita',
      createAppointmentBtnColor: 'teal darken-2 white--text',
      employees: [],
      cleaning: false,
      isUpdating: false,
      autoUpdate: true,
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
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    getSelectedEmployees(selectedEmployees) {
      this.selectedEmployees = selectedEmployees.map(employee => employee._id)
      console.log('selectedEmployees', this.selectedEmployees)
    }
  },
  created() {
    if (!localStorage.token) {
      this.$router.push('/')
    }

    if (this.patient || this.toggleForm) {
      this.toggleAppointmentForm()
    }
    EmployeeService.getEmployees()
      .then(response => {
        console.log('employees', response.data.employees)
        this.employees = response.data.employees
      })
      .catch(err => console.log('error', err))
  }
}
</script>

<style lang="scss" scoped></style>
