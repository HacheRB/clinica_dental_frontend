<template>
  <v-container fluid pa-5>
    <v-row class="ma-xs-0 ma-sm-0 ma-md-5">
      <v-col cols="12" sm="6" lg="3" class="d-flex justify-start align-center">
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
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        sm="6"
        lg="3"
        class="d-flex order-first order-sm-0 justify-end align-center"
      >
        <v-btn
          :to="{ name: 'Home', params: { toggleForm } }"
          color="teal darken-2 white--text mb-2"
          >Crear Cita</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="ma-xs-0 ma-sm-0 ma-md-5">
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
            @click:row="sendAppointment"
          >
            <template v-slot:item.action="{ item }">
              <v-btn @click.stop="deleteAppointment(item)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <AppointmentInfo
      :appointment="selectedAppointment"
      @resetSelectedAppointment="selectedAppointment = null"
    />
  </v-container>
</template>

<script>
import AppointmentService from '../services/appointmentService'
import AppointmentInfo from '../components/AppointmentInfo'

export default {
  name: 'Appointments',
  components: {
    AppointmentInfo
  },
  data: () => ({
    appointments: [],
    selectedAppointment: null,
    changedAppointment: {},
    search: '',
    totalAppointments: 0,
    options: {},
    page: 1,
    itemsPerPage: 10,
    toggleForm: true,
    headers: [
      {
        text: 'Paciente',
        align: 'start',
        sortable: true,
        value: 'patient.firstName',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Empleado',
        value: 'employees[0].firstName',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Tratamiento',
        value: 'intervention',
        class: 'teal darken-2 white--text'
      },
      { text: 'Fecha', value: 'start', class: 'teal darken-2 white--text' },
      {
        text: 'Acciones',
        value: 'action',
        sortable: false,
        class: 'teal darken-2 white--text'
      }
    ]
  }),
  created() {
    if (!localStorage.token) {
      this.$router.push('/')
    }

    this.getAppointments()
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
    getAppointments: function() {
      AppointmentService.getAppointments()
        .then(response => {
          this.appointments = response.data.appointments
        })
        .catch(err => console.log(err))
    },
    sendAppointment: function(appointment) {
      this.selectedAppointment = appointment
      console.log(this.selectedAppointment)
    },
    deleteAppointment: function(appointment) {
      console.log(appointment)
      AppointmentService.deleteAppointment(appointment)
        .then(response => {
          console.log(response.data)
          this.getAppointments()
        })
        .catch(err => console.log(err))
    },
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
          this.appointments = response.data.appointments
          this.totalAppointments = response.data.totalAppointments

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
