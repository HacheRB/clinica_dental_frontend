<template>
  <div>
    <PatientSelector @getpatient="updatePatient" />
    <Step2 :patientId="patient._id" />
  </div>
</template>

<script>
import PatientSelector from '@/components/PatientSelector'
import Step2 from '../components/Step2'

export default {
  name: 'createPatient',
  components: {
    PatientSelector,
    Step2
  },
  data: () => ({
    patient: null
  }),
  methods: {
    updatePatient(patient) {
      this.patient = patient
    }
  }
}
</script>

<style lang="scss" scoped></style>
