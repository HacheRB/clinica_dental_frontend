<template>
  <v-container fluid class="patient-medical-history-container">
    <v-row class="d-flex justify-center">
      <v-col cols="5" class="d-flex align-center mt-5 pl-0">
        <v-breadcrumbs large divider="/" :items="items" class="pl-0" />
      </v-col>
      <v-col cols="5" class="d-flex align-center mt-5 pr-0">
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
                  Fecha de la última cita: {{ treatment.appointments[0].start }}
                </v-col>
                <v-col cols="6" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open"> {{ treatment.intervention }}</span>

                    <v-row v-else no-gutters style="width: 100%">
                      <v-col cols="6" md="4">
                        {{ treatment.intervention }}
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
                  :lg="selectedAppointment ? 6 : 4"
                >
                  <AppointmentCard
                    :treatment="treatment"
                    :appointment="appointment"
                    @selectedAppointment="selectedAppointment = appointment"
                  />
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
import AppointmentCard from '../components/AppointmentCard'

export default {
  name: 'PatientMedicalHistory',

  props: { patientId: String },
  components: {
    AppointmentInfo,
    AppointmentCard
  },
  data() {
    return {
      temp: 'hola',
      patient: {},
      medicalHistory: [],
      search: '',
      selectedAppointment: null,
      items: null
    }
  },
  async created() {
    if (!localStorage.token) {
      this.$router.push('/')
    }

    await this.getPatient()
    await this.getPatientTreatments()
  },
  computed: {
    name() {
      console.log('patient', this.patient)
      return `${this.patient.firstName} ${this.patient.lastName}`
    }
  },
  methods: {
    getPatient() {
      PatientService.getPatientById(this.patientId)
        .then(patient => {
          console.log(patient.data)
          this.patient = patient.data
          this.items = [
            { text: 'Pacientes', disabled: false, href: '/patients/list' },
            {
              text: this.name,
              disabled: false,
              href: `/patients/${this.patientId}`
            },
            { text: 'Hitoria Clínica', disabled: true, href: '' }
          ]
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
