<template>
  <PatientSelector @getpatientid="updatePatient" />
</template>

<script>
import PatientSelector from '@/components/PatientSelector'
export default {
  name: 'createPatient',
  components: {
    PatientSelector
  },
  methods: {
    updatePatient(id) {
      this.patientId = id
    }
  }
}
</script>

<style lang="scss" scoped></style>
