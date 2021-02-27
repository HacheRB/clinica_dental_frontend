<template>
  <Profile :patient="patient"></Profile>
</template>

<script>
import Profile from '@/components/PatientProfileComp'
import PatientService from '../services/patientService'

export default {
  name: 'PatientProfile',
  data() {
    return { patient: {} }
  },
  components: {
    Profile
  },
  props: ['patientId'],
  created() {
    PatientService.getPatientById(this.patientId).then(request => {
      this.patient = request.data
    })
  }
}
</script>

<style lang="scss" scoped></style>
