<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row class="buttons">
          <Login />
          <v-col md="12" lg="6" xl="6">
            <v-btn to="/patients/create"> Create Patients</v-btn>
          </v-col>
          <v-col md="12" lg="6" xl="6">
            <v-btn to="/patients/list"> See Patients</v-btn>
          </v-col>
          <v-col md="12" lg="6" xl="6">
            <v-btn to="/patients/:idPatient"> See Patients Profile</v-btn>
          </v-col>
        </v-row>
        <router-view />
      </v-container> </v-main
  ></v-app>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'App',

  components: { Login },

  data: () => ({
    //
  })
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
