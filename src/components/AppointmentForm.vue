<template>
  <v-stepper v-model="e1" color="teal lighten-4">
    <v-stepper-header>
      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 1"
        step="1"
        editable
      >
        Seleccione paciente
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 2"
        step="2"
        editable
      >
        Seleccione tratamiento
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step color="teal lighten-2" step="3" editable>
        Seleccione cita
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class=" mb-12" min-height="200px">
          <PatientSelector @getpatient="updatePatient" />
        </v-card>

        <v-btn color="teal lighten-2 white--text" @click="e1 = 2">
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

        <v-btn color="teal lighten-2 white--text">
          Continue
        </v-btn>

        <v-btn color="teal darken-4" text @click="e1 = 2">
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
import employeeService from '../services/employeeService'

export default {
  name: 'createPatient',
  components: {
    PatientSelector,
    Step2,
    Step3
  },
  data() {
    return {
      e1: 1,
      patient: null,
      treatment: null,
      employees: null
    }
  },
  methods: {
    updatePatient(patient) {
      this.patient = patient
    },
    updateTreatment(treatment) {
      this.treatment = treatment
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
