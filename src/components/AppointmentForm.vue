<template>
  <v-stepper v-model="e1" color="teal lighten-4">
    <v-stepper-header>
      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 1"
        step="1"
        :rules="[() => checkPatient]"
        editable
      >
        Paciente
        <small v-if="!checkPatient">Seleccione Paciente</small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 2"
        step="2"
        :rules="[() => false]"
        editable
      >
        Tratamiento
        <small>Seleccione Tratamiento</small>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 3"
        step="3"
        :rules="[() => false]"
        editable
      >
        Medico

        <small>Seleccione Medico</small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        step="4"
        editable
        :rules="[() => false]"
      >
        Cita
        <small>Seleccione Cita</small>
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class=" mb-12" min-height="200px">
          <PatientSelector @getpatient="updatePatient" />
        </v-card>
        <v-btn
          color="teal lighten-2 white--text"
          @click="firstStepValidation()"
        >
          Continue
        </v-btn>
        <v-btn text color="teal darken-4">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" min-height="200px">
          <Step2
            v-if="patient"
            :patientId="patient._id"
            @gettreatment="updateTreatment"
          />
        </v-card>

        <v-btn color="teal lighten-2 white--text" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn text color="teal darken-4" @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="mb-12" min-height="200px">
          <Step3 v-if="e1 === 3" :employees="employees" />
        </v-card>

        <v-btn color="teal lighten-2 white--text" @click="e1 = 4">
          Continue
        </v-btn>

        <v-btn color="teal darken-4" text @click="e1 = 2">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card class="mb-12">
          <Step4
            @senddateappointmentstep="getDateAppointment"
            @sendhourstartappointmentstep="getHourStartAppointment"
            @sendhourendappointmentstep="getHourEndAppointment"
        /></v-card>

        <v-btn color="teal lighten-2 white--text">
          Create appointment
        </v-btn>

        <v-btn color="teal darken-4" text @click="e1 = 3">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import PatientSelector from '@/components/PatientSelector'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'
import Step4 from '../components/Step4'
import employeeService from '../services/employeeService'

export default {
  name: 'createPatient',
  components: {
    PatientSelector,
    Step2,
    Step3,
    Step4
  },
  data() {
    return {
      e1: 1,
      patient: null,
      checkPatient: true,
      treatment: null,
      employees: null
    }
  },
  methods: {
    updatePatient(patient) {
      this.patient = patient
      console.log(patient)
    },
    getDateAppointment(appointment) {
      console.log(appointment)
    },
    getHourStartAppointment(hour) {
      console.log(hour)
    },
    getHourEndAppointment(hour) {
      console.log(hour)
    },
    updateTreatment(treatment) {
      console.log('treatment appointmentform', treatment)
      this.treatment = treatment
    },
    firstStepValidation() {
      console.log(this.patient)
      if (this.patient === null || this.patient.length < 1) {
        this.checkPatient = false
      } else {
        this.checkPatient = true
        this.e1 = 2
      }
    }
  },
  watch: {
    treatment() {
      console.log('padre ', this.treatment)
    }
  },
  async created() {
    let response = await employeeService.getWorkers()
    this.employees = response.data.employees
  }
}
</script>

<style lang="scss" scoped></style>
