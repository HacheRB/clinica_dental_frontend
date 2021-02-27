<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" sm="12" md="12" lg="8" xl="6">
      <Login />
    </v-col>
  </v-row>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'createPatient',
  components: {
    Login
  }
}
</script>

<style lang="scss" scoped></style>
