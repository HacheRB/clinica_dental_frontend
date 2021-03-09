<template>
  <v-container fluid pa-5>
    <v-row>
      <v-col cols="6" class="d-flex justify-start align-center">
        <v-text-field
          color="teal lighten-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          @keyup="doSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="d-flex justify-end align-center">
        <v-btn to="/home" color="teal darken-2 white--text mb-2"
          >Crear Cita</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="teal--text">
            <strong> Citas </strong>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="appointments"
            :page="page"
            :items-per-page="itemsPerPage"
            :options.sync="options"
            :server-items-length="totalAppointments"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppointmentService from '../services/appointmentService'

export default {
  name: 'Appointments',
  data: () => ({
    appointments: [],
    search: '',
    totalAppointments: 0,
    options: {},
    page: 1,
    itemsPerPage: 10,
    headers: [
      {
        text: 'Paciente',
        align: 'start',
        sortable: true,
        value: 'patient.firstName',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Employee',
        value: 'employees[0].firstName',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Intervention',
        value: 'intervention',
        class: 'teal darken-2 white--text'
      },
      { text: 'Date', value: 'start', class: 'teal darken-2 white--text' }
    ]
  }),
  created() {
    AppointmentService.getAppointments()
      .then(response => {
        console.log(response.data.appointments)
        this.appointments = response.data.appointments
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
    // showPatient: function(item) {
    //   console.log(item)
    //   this.$router.push(`${item._id}`)
    // },
    doSearch: function() {
      console.log(
        'doSeasrch',
        'itemsperpage',
        this.itemsPerPage,
        'page',
        this.page
      )
      AppointmentService.getAppointmentsByQuery(
        this.itemsPerPage,
        this.page,
        this.search
      )
        .then(response => {
          console.log(response)
          this.appointments = response.data.appointments
          this.totalAppointments = response.data.totalAppointments
          console.log(response.data.appointments)
          console.log(response.data.totalAppointments)

          const { sortBy, sortDesc } = this.options
          if (sortBy.length === 1 && sortDesc.length === 1) {
            this.appointments = this.appointments.sort((a, b) => {
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
