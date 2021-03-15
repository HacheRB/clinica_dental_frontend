<template>
  <v-container fluid class="patient-medical-history-container">
    <v-row class="d-flex justify-center">
      <v-col cols="5" class="d-flex align-center mt-5">
        <h2>
          Historia Clínica de
          {{ patient.firstName }}
          {{ patient.lastName }}
        </h2>
      </v-col>
      <v-col cols="5" class="d-flex align-center mt-5">
        <v-text-field
          append-icon="mdi-magnify"
          label="Busca un tratamiento"
          v-model="search"
          @keyup="getPatientTreatmentsByQuery"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col class="history-row rounded" cols="10" md="10">
        <v-expansion-panels>
          <v-expansion-panel
            class="ma-5"
            v-for="(treatment, idx) in medicalHistory"
            :key="idx"
          >
            <v-expansion-panel-header
              class="expansion-panel-header"
              v-slot="{ open }"
            >
              <v-row no-gutters>
                <v-col cols="6" md="4">
                  {{ treatment.appointments[0].start }}
                </v-col>
                <v-col cols="6" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open"> {{ treatment.intervention }}</span>

                    <v-row v-else no-gutters style="width: 100%">
                      <v-col cols="6" md="4">
                        {{ treatment.appointments[0].intervention }}
                      </v-col>
                      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6" md="4">
                        {{
                          treatment.appointments[0].employees[0].firstName +
                            ' ' +
                            treatment.appointments[0].employees[0].lastName
                        }}
                      </v-col>
                    </v-row>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="expansion-panel-content">
              <v-row>
                <v-col
                  v-for="(appointment, idx) in treatment.appointments"
                  :key="idx"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card
                    color="teal darken-2"
                    @click="selectedAppointment = appointment"
                    class="d-flex flex-column pb-5 white--text"
                  >
                    <v-row class="d-flex  align-baseline px-5 mt-2">
                      <v-col cols="12" sm="6">
                        <p class="title align-end">
                          {{ treatment.interventionSubtype }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6" class="d-flex justify-end">
                        <p class="title">
                          {{
                            appointment.start + '-' + appointment.end.slice(-5)
                          }}
                        </p>
                      </v-col>
                    </v-row>
                    <v-row class=" d-flex flex-column justify-center px-5 mt-5">
                      <v-col>
                        <span class="subtitle-1">
                          Pieces :
                        </span>
                        <span
                          class="subtitle-1"
                          v-for="(piece, idx) in appointment.pieces"
                          :key="idx"
                        >
                          {{ piece }}
                        </span>
                      </v-col>
                      <v-col>
                        <span class="font-weight-medium pa-0">
                          Empleados:
                        </span>
                        <span
                          class="body-1 pa-0"
                          v-for="(employee, idx) in appointment.employees"
                          :key="idx"
                        >
                          {{
                            idx !== appointment.employees.length - 1
                              ? employee.firstName +
                                ' ' +
                                employee.lastName +
                                ', '
                              : employee.firstName + ' ' + employee.lastName
                          }}</span
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <AppointmentInfo
      :appointment="selectedAppointment"
      @resetSelectedAppointment="selectedAppointment = null"
    />
  </v-container>
</template>

<script>
import PatientService from '../services/patientService'
import TreatmentService from '../services/treatmentService'
import AppointmentInfo from '../components/AppointmentInfo'

export default {
  name: 'PatientMedicalHistory',
  props: { patientId: String },
  components: {
    AppointmentInfo
  },
  data() {
    return {
      temp: 'hola',
      patient: {},
      medicalHistory: [],
      search: '',
      selectedAppointment: null
    }
  },
  async created() {
    if (!localStorage.token) {
      this.$router.push('/')
    }

    this.getPatient()
    this.getPatientTreatments()
  },
  methods: {
    getPatient() {
      PatientService.getPatientById(this.patientId)
        .then(patient => {
          console.log(patient.data)
          this.patient = patient.data
        })
        .catch(err => console.log(err))
    },
    getPatientTreatments() {
      TreatmentService.getPatientTreatments(this.patientId)
        .then(treatments => {
          this.sortByDate(treatments.data)
        })
        .catch(err => console.log(err))
    },
    getPatientTreatmentsByQuery() {
      TreatmentService.getPatientTreatmentsByQuery(this.patientId, this.search)
        .then(treatments => {
          this.sortByDate(treatments.data)
        })
        .catch(err => console.log(err))
    },
    sortByDate(treatments) {
      this.medicalHistory = treatments.sort(function(a, b) {
        return (
          new Date(a.appointments[0].start) - new Date(b.appointments[0].start)
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.history-row {
  background-color: #00796b;
}
// #b2dfdb
</style>
