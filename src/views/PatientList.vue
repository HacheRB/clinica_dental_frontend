<template>
  <v-card>
    <v-card-title>
      Patients
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="patients"
      :search="search"
      @click:row="showPatient"
    ></v-data-table>
  </v-card>
</template>

<script>
import PatientService from '../services/patientService'

export default {
  name: 'ShowPatientList',
  data: () => ({
    patients: [],
    search: '',
    headers: [
      {
        text: 'Apellidos',
        align: 'start',
        sortable: true,
        value: 'lastName'
      },
      { text: 'Nombre', value: 'firstName' },
      { text: 'DNI', value: 'dni' },
      { text: 'Telefono', value: 'contact.mobilephone' }
    ]
  }),
  created() {
    PatientService.getPatients()
      .then(patients => {
        console.log(patients)
        this.patients = patients.data
      })
      .catch(err => console.log(err))
  },
  methods: {
    showPatient: function(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped></style>
