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
          <PatientSelector @getpatient="updatePatient" />
        </v-card>
        <v-btn
          color="teal lighten-2 white--text"
          @click="firstStepValidation()"
        >
          Continue
        </v-btn>
        <v-btn text color="teal darken-4">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" min-height="200px">
          <Step2
            v-if="patient"
            :patientId="patient._id"
            @gettreatment="updateTreatment"
          />
        </v-card>

        <v-btn
          color="teal lighten-2 white--text"
          @click="secondStepValidation()"
        >
          Continue
        </v-btn>

        <v-btn text color="teal darken-4" @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="mb-12" min-height="200px">
          <Step3
            v-if="e1 === 3"
            :employees="employees"
            @getstep3="updateStep3"
          />
        </v-card>

        <v-btn
          color="teal lighten-2 white--text"
          @click="thirdStepValidation()"
        >
          Continue
        </v-btn>

        <v-btn color="teal darken-4" text @click="e1 = 2">
          Cancel
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card class="mb-12">
          <Step4
            @sendhourstartappointmentstep="getHourStartAppointment"
            @sendhourendappointmentstep="getHourEndAppointment"
        /></v-card>

        <v-btn color="teal lighten-2 white--text" @click="createAppointment()">
          Create appointment
        </v-btn>

        <v-btn color="teal darken-4" text @click="e1 = 3">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
//import AppointmentService from '@/services/appointmentService'
import PatientSelector from '@/components/PatientSelector'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import Step4 from '@/components/Step4'
import employeeService from '@/services/employeeService'

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
      employees: null,
      dateStart: null,
      dateEnd: null,
      details: {},
      assignedEmployeesId: []
    }
  },
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
    updateTreatment(treatment) {
      this.intervention = treatment
    },
    updateStep3(details) {
      this.assignedEmployeesId = details.selectedEmployees.map(
        employee => employee._id
      )
      this.details = details
    },
    firstStepValidation() {
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
    createAppointment() {
      if (
        this.checkDoctor &&
        this.checkPatient &&
        this.checkIntervention &&
        this.dateStart !== null &&
        this.dateEnd !== null
      ) {
        // AppointmentService.createAppointmentsDate({
        //   patient: this.patient,
        //   employees: this.assignedEmployeesId,
        //   start: this.dateStart,
        //   end: this.dateEnd,
        //   piece: this.details.pieces,
        //   observations: this.details.observations,
        //   intervention: this.intervention
        // })
      } else {
        this.checkDate = false
      }
    }
  },
  async created() {
    let response = await employeeService.getWorkers()
    this.employees = response.data.employees
  }
}
</script>

<style lang="scss" scoped></style>
