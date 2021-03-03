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
        <v-card class=" mb-12" color="teal lighten-5" height="200px">
          <PatientSelector @getpatientid="updatePatient" />
        </v-card>

        <v-btn color="teal lighten-2 white--text" @click="e1 = 2">
          Continue
        </v-btn>

        <v-btn text color="teal darken-4">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="teal lighten-2 white--text" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn text color="teal darken-4" @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

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
export default {
  name: 'createPatient',
  components: {
    PatientSelector
  },
  data() {
    return {
      e1: 1
    }
  },
  methods: {
    updatePatient(id) {
      this.patientId = id
    }
  }
}
</script>

<style lang="scss" scoped></style>
