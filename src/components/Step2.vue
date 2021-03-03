<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click=";(newTreatment = false), getTreatments"
          >Continue Treatment</v-btn
        >
      </v-col>
      <v-col>
        <v-btn @click="newTreatment = true">New Treatment</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-select v-if="!newTreatment" :items="activeTreatments"></v-select>
      <v-select v-if="newTreatment" :items="allTreatments"></v-select>
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
