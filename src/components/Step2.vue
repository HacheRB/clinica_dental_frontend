<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn
          @click=";(newTreatment = false), getTreatments"
          :color="!newTreatment ? 'teal lighten2 white--text' : 'white'"
          >Continue Treatment</v-btn
        >
      </v-col>
      <v-col class="d-flex justify-start">
        <v-btn
          @click="newTreatment = true"
          :color="newTreatment ? 'teal lighten2 white--text' : 'white'"
          >New Treatment</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-select
        :items="newTreatment ? allTreatments : activeTreatments"
      ></v-select>
    </v-row>
  </v-container>
</template>

<script>
import PatientService from '../services/patientService'

export default {
  name: 'name',
  props: ['patientId'],
  data: () => ({
    newTreatment: null,
    allTreatments: ['Ortodoncia', 'Empaste', 'Endodoncia'],
    activeTreatments: []
  }),
  methods: {
    getTreatments: function() {
      PatientService.getPatientTreatments()
        .then(treatments => {
          console.log(treatments)
          this.activeTreatments = treatments.data
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped></style>
