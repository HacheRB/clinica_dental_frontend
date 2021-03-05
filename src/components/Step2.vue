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
        v-model="treatment"
        item-text="intervention"
        return-object
        color="teal lighten-2"
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
    activeTreatments: [],
    treatment: null
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
  },
  watch: {
    treatment(treatment) {
      this.$emit('gettreatment', treatment._id)
    }
  },
  async created() {
    let patient = await PatientService.getPatientTreatments(this.patientId)
    console.log('patient', patient)
    this.activeTreatments = patient.data.treatments
    console.log(this.activeTreatments)
  }
}
</script>

<style lang="scss" scoped></style>
