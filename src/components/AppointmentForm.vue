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
        <v-card class="mb-12" height="200px">
          <PatientSelector @getpatient="updatePatient" />
        </v-card>
        <v-btn color="teal lighten-2 white--text" @click="NextStep">
          Continue
        </v-btn>
        <v-btn text color="teal darken-4">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" height="200px">
          <!-- <Step2 v-if="e1 === 2" :patientId="patient._id" /> -->
        </v-card>

        <v-btn color="teal lighten-2 white--text" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn text color="teal darken-4" @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="mb-12"> </v-card>

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
//import Step2 from '../components/Step2'
import Step4 from '../components/Step4'

export default {
  name: 'createPatient',
  components: {
    PatientSelector,
    // Step2,
    Step4
  },
  data() {
    return {
      e1: 1,
      checkPatient: true,
      patient: null
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
