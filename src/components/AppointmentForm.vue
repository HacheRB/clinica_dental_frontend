<template>
  <v-stepper v-model="e1" color="teal lighten-4">
    <v-stepper-header>
      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 1"
        step="1"
        :rules="[() => checkPatient]"
      >
        Paciente
        <small v-if="!checkPatient">Seleccione Paciente</small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 2"
        step="2"
        :rules="[() => checkIntervention]"
      >
        Tratamiento
        <small v-if="!checkIntervention">Seleccione Tratamiento</small>
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        :complete="e1 > 3"
        step="3"
        :rules="[() => checkDoctor]"
      >
        Medico

        <small v-if="!checkDoctor">Seleccione Medico</small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="teal lighten-2"
        step="4"
        :rules="[() => checkDate]"
      >
        Cita
        <small v-if="!checkDate">Seleccione Cita</small>
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class=" mb-12" min-height="200px">
          <PatientSelector
            @getpatient="updatePatient"
            :patientNext="patientNext"
          />
        </v-card>
        <v-row>
          <v-col>
            <v-btn text color="teal darken-4">
              Atrás
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              color="teal lighten-2 white--text"
              @click="firstStepValidation()"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" min-height="200px">
          <Step2
            v-if="patient"
            :patientId="patient._id"
            @gettreatment="updateTreatment"
          />
        </v-card>
        <v-row>
          <v-col>
            <v-btn text color="teal darken-4" @click="e1 = 1">
              Atrás
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              color="teal lighten-2 white--text"
              @click="secondStepValidation()"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="mb-12" min-height="200px">
          <Step3
            v-if="intervention"
            :employees="employees"
            @getstep3="updateStep3"
          />
        </v-card>
        <v-row>
          <v-col>
            <v-btn text color="teal darken-4" @click="e1 = 2">
              Atrás
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              color="teal lighten-2 white--text"
              @click="thirdStepValidation()"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card class="mb-12">
          <Step4
            @sendhourstartappointmentstep="getHourStartAppointment"
            @sendhourendappointmentstep="getHourEndAppointment"
        /></v-card>
        <v-row>
          <v-col>
            <v-btn text color="teal darken-4" @click="e1 = 3">
              Atrás
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              color="teal lighten-2 white--text"
              @click="createAppointment()"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import TreatmentService from '@/services/treatmentService'
import AppointmentService from '@/services/appointmentService'
import PatientSelector from '@/components/PatientSelector'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import Step4 from '@/components/Step4'

export default {
  name: 'createPatient',
  components: {
    PatientSelector,
    Step2,
    Step3,
    Step4
  },
  data() {
    return {
      e1: 1,
      patient: null,
      checkPatient: true,
      checkIntervention: true,
      checkDoctor: true,
      checkDate: true,
      intervention: null,
      subIntervention: null,
      dateStart: null,
      dateEnd: null,
      details: {},
      newTreatment: false,
      assignedEmployeesId: []
    }
  },
  props: { employees: Array, patientNext: Object },
  methods: {
    updatePatient(patient) {
      this.patient = patient
    },
    getHourStartAppointment(dateStart) {
      this.dateStart = dateStart
    },
    getHourEndAppointment(dateEnd) {
      this.dateEnd = dateEnd
    },
    updateTreatment(intervention, subIntervention, newTreatment) {
      console.log('treatment', intervention)
      console.log('newTreatment', newTreatment)
      this.intervention = intervention
      this.subIntervention = subIntervention
      this.newTreatment = newTreatment
    },
    updateStep3(details) {
      this.assignedEmployeesId = details.selectedEmployees.map(
        employee => employee._id
      )
      this.details = details
    },
    firstStepValidation() {
      console.log('firstStepValidation', this.patient)
      if (this.patient === null || this.patient.length < 1) {
        this.checkPatient = false
      } else {
        this.checkPatient = true
        this.e1 = 2
      }
    },
    secondStepValidation() {
      if (this.intervention === null || this.intervention.length < 1) {
        this.checkIntervention = false
      } else {
        this.checkIntervention = true
        this.e1 = 3
      }
    },
    thirdStepValidation() {
      if (
        (this.employees === null || this.employees.length < 1) &&
        this.details !== null
      ) {
        this.checkDoctor = false
      } else {
        this.checkDoctor = true
        this.e1 = 4
      }
    },
    createAppointmentMethod(treatmentId, intervention) {
      AppointmentService.createAppointmentsDate({
        patient: this.patient._id,
        employees: this.assignedEmployeesId,
        start: this.dateStart,
        end: this.dateEnd,
        pieces: this.details.pieces,
        observations: this.details.observations,
        intervention: intervention,
        treatmentId: treatmentId
      })
        .then(appointment => {
          console.log(appointment)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createAppointment() {
      if (
        this.checkDoctor &&
        this.checkPatient &&
        this.checkIntervention &&
        this.dateStart !== null &&
        this.dateEnd !== null
      ) {
        if (this.newTreatment) {
          TreatmentService.createTreatment({
            patient: this.patient._id,
            intervention: this.intervention,
            interventionSubtype: this.subIntervention
          })
            .then(treatment => {
              console.log('********', treatment)
              this.createAppointmentMethod(
                treatment.data._id,
                this.intervention
              )
            })
            .catch(err => {
              console.log(err)
            })
          console.log('newTreatment')
        } else {
          this.createAppointmentMethod(
            this.intervention._id,
            this.intervention.intervention
          )
        }
      } else {
        this.checkDate = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
