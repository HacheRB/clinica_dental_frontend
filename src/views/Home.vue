<template>
  <v-row class="d-flex flex-col fill-height">
    <Calendar />
    <v-col v-if="this.$vuetify.breakpoint.lgAndUp">
      <AppointmentForm />
    </v-col>
  </v-row>
  <!-- <AppointmentForm /> -->
</template>

<script>
import AppointmentForm from '@/components/AppointmentForm'
import Calendar from '@/components/Calendar'

export default {
  name: 'Home',
  components: {
    AppointmentForm,
    Calendar
  }
}
</script>

<style lang="scss" scoped></style>
