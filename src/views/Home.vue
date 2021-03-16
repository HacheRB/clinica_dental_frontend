<template>
  <v-container fluid pa-5>
    <v-row
      class="ma-xs-0 ma-md-5"
      :class="{ 'justify-end': $vuetify.breakpoint.smAndDown }"
    >
      <v-col
        class="d-flex align-center order-last order-sm-first"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <ChooseDoctor
          @getemployees="getSelectedEmployees"
          :employees="employees"
        ></ChooseDoctor>
      </v-col>
      <v-col cols="4" v-if="$vuetify.breakpoint.mdAndUp">
        <v-checkbox
          color="teal lighten-2"
          label="Limpiezas"
          v-model="cleaning"
        ></v-checkbox>
      </v-col>

      <v-col class="d-flex justify-end align-center" cols="8" sm="4">
        <v-btn
          @click="toggleAppointmentForm"
          color="teal darken-2"
          dark
          v-if="!createAppointment"
          >Crear Cita</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="d-flex flex-col fill-height ma-xs-0 ma-md-5">
      <v-col v-if="$vuetify.breakpoint.smAndDown" class="order-1" cols="8">
        <ChooseDoctor
          @getemployees="getSelectedEmployees"
          :employees="employees"
        ></ChooseDoctor>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.smAndDown"
        class="d-flex justify-end order-2"
        cols="4"
      >
        <v-checkbox
          color="teal lighten-2"
          label="Limpiezas"
          v-model="cleaning"
        ></v-checkbox>
      </v-col>
      <Calendar
        :cols="calendarCols"
        :showThis="selectedEmployees"
        :cleaning="cleaning"
        @getappointment="getSelectedAppointment"
      />
      <v-col
        fill-height
        class="order-0 order-md-1"
        v-if="createAppointment"
        cols="12"
        md="5"
      >
        <v-row class="d-flex flex-column">
          <v-col class="pb-0 pt-5">
            <v-card color="teal" dark>
              <v-row class="d-flex justify-space-between align-center px-5">
                <v-col>
                  <h1 class="nuevaCita">
                    Nueva Cita
                  </h1>
                </v-col>
                <v-btn icon @click="toggleAppointmentForm">
                  <v-icon>mdi-close</v-icon></v-btn
                >
              </v-row>
            </v-card>
          </v-col>
          <v-col class="pt-2">
            <AppointmentForm :employees="employees" :patientNext="patient" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <AppointmentInfo
      :appointment="selectedAppointment"
      @resetSelectedAppointment="selectedAppointment = null"
    />
  </v-container>
</template>

<script>
import EmployeeService from '../services/employeeService'
import AppointmentForm from '@/components/AppointmentForm'
import ChooseDoctor from '../components/ChooseDoctor'
import Calendar from '@/components/Calendar'
import AppointmentInfo from '../components/AppointmentInfo'

export default {
  name: 'Home',
  components: {
    AppointmentForm,
    ChooseDoctor,
    Calendar,
    AppointmentInfo
  },
  props: { patient: Object, toggleForm: Boolean },
  data() {
    return {
      calendarCols: 12,
      createAppointment: false,
      employees: [],
      cleaning: false,
      isUpdating: false,
      autoUpdate: true,
      selectedEmployees: [],
      selectedAppointment: null
    }
  },
  methods: {
    toggleAppointmentForm() {
      this.createAppointment = !this.createAppointment
      this.calendarCols = this.createAppointment
        ? this.$vuetify.breakpoint.smAndDown
          ? 12
          : 7
        : 12
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    getSelectedEmployees(selectedEmployees) {
      this.selectedEmployees = selectedEmployees.map(employee => employee._id)
      console.log('selectedEmployees', this.selectedEmployees)
    },
    getSelectedAppointment(appointment) {
      console.log('home appointmentID', appointment)
      this.selectedAppointment = appointment
      console.log('home selectedappointment', this.selectedAppointment)
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

<style lang="scss" scoped>
.nuevaCita {
  color: white;
}
</style>
