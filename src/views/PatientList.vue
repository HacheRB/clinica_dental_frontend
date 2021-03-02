<template>
  <v-row>
    <v-col>
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
            @keyup.enter="doSearch"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="patients"
          :page="page"
          :items-per-page="itemsPerPage"
          :options.sync="options"
          :server-items-length="totalPatients"
          :search="search"
          @click:row="showPatient"
        ></v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PatientService from '../services/patientService'

export default {
  name: 'ShowPatientList',
  data: () => ({
    patients: [],
    search: '',
    totalPatients: 0,
    options: {},
    page: 1,
    itemsPerPage: 10,
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
  watch: {
    options: function() {
      const { page, itemsPerPage } = this.options
      this.page = page
      this.itemsPerPage = itemsPerPage
      this.doSearch()
    }
  },
  methods: {
    showPatient: function(item) {
      console.log(item)
      this.$router.push(`${item._id}`)
    },
    doSearch: function() {
      console.log(this.itemsPerPage, this.page)
      PatientService.getPatientsByQuery(
        this.itemsPerPage,
        this.page,
        this.search
      )
        .then(response => {
          this.patients = response.data.patients
          this.totalPatients = response.data.totalPatients
          console.log(response.data.patients)
          console.log(response.data.totalPatients)

          const { sortBy, sortDesc } = this.options
          if (sortBy.length === 1 && sortDesc.length === 1) {
            this.patients = this.patients.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped></style>
