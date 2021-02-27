<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" sm="12" md="12" lg="8" xl="6">
      <PatientForm></PatientForm>
    </v-col>
  </v-row>
</template>

<script>
import PatientForm from '@/components/PatientForm'
export default {
  name: 'createPatient',
  components: {
    PatientForm
  }
}
</script>

<style lang="scss" scoped></style>
