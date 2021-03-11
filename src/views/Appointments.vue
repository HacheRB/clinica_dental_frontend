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
            @click:row="displayAppointment"
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
    <v-navigation-drawer
      right
      v-model="drawer"
      app
      v-if="selectedAppointment"
      width="500px"
      color="teal darken-2"
    >
      <v-card color="teal darken-2" dark outlined>
        <v-card-title>
          <v-col>
            {{ selectedAppointment.patient.firstName }}
            {{ selectedAppointment.patient.lastName }}
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn @click="drawer = false" color="white" outlined
              ><v-icon> mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-sheet light height="100%" rounded class="pa-3">
            <v-container>
              <v-row>
                <v-col class="teal--text d-flex align-center justify-start">
                  {{ selectedAppointment.start }} |
                  {{ selectedAppointment.end.slice(-5) }}
                </v-col>
                <v-col>
                  <v-row class="d-flex justify-end">
                    <v-btn
                      dark
                      :color="
                        !this.selectedAppointment.treatment.finished
                          ? 'red'
                          : 'teal'
                      "
                      x-small
                      @click="finishTreatment"
                      :key="finishTreatmentBtnKey"
                      >{{
                        !this.selectedAppointment.treatment.finished
                          ? 'Finalizar Tratamiento'
                          : 'Reanudar Tratamiento'
                      }}</v-btn
                    >
                  </v-row>
                  <v-row class="d-flex justify-end">
                    <v-btn
                      class="mt-3"
                      dark
                      :color="
                        !this.selectedAppointment.finished ? 'red' : 'teal'
                      "
                      x-small
                      @click="finishAppointment"
                      :key="finishAppointmentBtnKey"
                      >{{
                        !this.selectedAppointment.finished
                          ? 'Finalizar Cita'
                          : 'Reanudar Cita'
                      }}</v-btn
                    >
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-list>
                    <v-list-item
                      v-for="(employee, idx) in selectedAppointment.employees"
                      :key="idx"
                    >
                      <v-btn
                        :color="employee.color"
                        x-small
                        class="mr-3"
                      ></v-btn>
                      {{ employee.firstName }}
                      {{ employee.lastName }}
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="changedAppointment.observations"
                    outlined
                    label="Motivos y Observaciones"
                    @change="changeAppointment"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="changedAppointment.intervention"
                        outlined
                        label="Tipo de intervención"
                        @change="changeAppointment"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="
                          changedAppointment.treatment.interventionSubType
                        "
                        outlined
                        label="Subtipo de intervención"
                        @change="changeAppointment"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="changedAppointment.medicines"
                    label="Medicinas"
                    outlined
                    @change="changeAppointment"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row v-if="showUpdateButton">
                <v-col class="d-flex justify-center">
                  <v-btn small dark color="teal" @click="updateAppointment"
                    >Guardar cambios</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import AppointmentService from '../services/appointmentService'
import TreatmentService from '../services/treatmentService'

export default {
  name: 'Appointments',
  data: () => ({
    appointments: [],
    selectedAppointment: null,
    changedAppointment: {},
    drawer: false,
    showUpdateButton: false,
    finishTreatmentBtnText: '',
    finishTreatmentBtnKey: true,
    finishAppointmentBtnKey: true,
    updateDataTable: true,
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
      { text: 'Date', value: 'start', class: 'teal darken-2 white--text' },
      {
        text: 'Actions',
        value: 'action',
        sortable: false,
        class: 'teal darken-2 white--text'
      }
    ]
  }),
  created() {
    AppointmentService.getAppointments()
      .then(response => {
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
    displayAppointment: function(appointment) {
      AppointmentService.getAppointmentById(appointment._id)
        .then(appointment => {
          this.selectedAppointment = appointment.data
          this.drawer = true
          Object.assign(this.changedAppointment, this.selectedAppointment)
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
    },
    updateAppointment: function() {
      console.log(this.changedAppointment)
      AppointmentService.updateAppointment(this.changedAppointment)
        .then(appointment => {
          console.log(appointment)
          this.selectedAppointment = appointment.data
          this.showUpdateButton = false
          this.finishAppointmentBtnKey = !this.finishAppointmentBtnKey
        })
        .catch(err => console.log(err))
    },
    finishTreatment: function() {
      this.selectedAppointment.treatment.finished = !this.selectedAppointment
        .treatment.finished
      TreatmentService.updateTreatment(this.selectedAppointment.treatment)
        .then(treatment => {
          this.selectedAppointment.treatment = treatment.data
          this.finishTreatmentBtnKey = !this.finishTreatmentBtnKey
        })
        .catch(err => console.log(err))
    },
    finishAppointment: function() {
      this.changedAppointment.finished = !this.changedAppointment.finished
      this.updateAppointment()
    },
    changeAppointment: function() {
      if (
        this.selectedAppointment.observations !==
          this.changedAppointment.observations ||
        this.selectedAppointment.intervention !==
          this.changedAppointment.intervention ||
        this.selectedAppointment.treatment.interventionSubType !==
          this.changedAppointment.treatment.interventionSubType ||
        this.selectedAppointment.medicines !==
          this.changedAppointment.medicines ||
        this.selectedAppointment.finished !== this.changedAppointment.finished
      ) {
        this.showUpdateButton = true
      } else {
        this.showUpdateButton = false
      }
    },
    deleteAppointment: function(appointment) {
      console.log(appointment)
      AppointmentService.deleteAppointment(appointment)
        .then(response => {
          console.log(response.data)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped></style>
