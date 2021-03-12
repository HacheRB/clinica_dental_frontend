<template>
  <v-container fluid class="patient-medical-history-container">
    <v-row class="d-flex flex-column justify-center ma-5">
      <v-col class="d-flex mx-10">
        <h2>
          {{ patient }}
        </h2>
      </v-col>
      <v-col class="d-flex mx-10">
        <h3>Historia Clínica</h3>
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
              <v-row
                class="d-flex flex-column"
                v-for="(appointment, idx) in treatment.appointments"
                :key="idx"
              >
                <v-col>
                  <v-card
                    color="#b2dfdb"
                    @click="showDetailedView(treatment, appointment)"
                    class="d-flex flex-column pb-5"
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
  </v-container>
</template>

<script>
import PatientService from '../services/patientService'
export default {
  name: 'PatientMedicalHistory',
  props: { patientId: String },
  data() {
    return {
      temp: 'hola',
      patient: '',
      medicalHistory: []
    }
  },
  async created() {
    let patient = await PatientService.getPatientTreatments(this.patientId)
    this.patient = `${patient.data.firstName} ${patient.data.lastName}`
    let treatments = patient.data.treatments
    this.medicalHistory = treatments.sort(function(a, b) {
      return (
        new Date(b.appointments[0].start) - new Date(a.appointments[0].start)
      )
    })
  },
  methods: {
    showDetailedView(treatment, appointment) {
      console.log(
        'Hay que darle funcionalidad al onclick de patientmedical history',
        treatment,
        appointment
      )
      appointment
    }
  }
}
</script>

<style lang="scss" scoped>
.history-row {
  background-color: #b2dfdb;
}
</style>
