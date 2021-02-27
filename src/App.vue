<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col md="12" lg="6" xl="6">
            <v-btn to="/"> Landing</v-btn>
          </v-col>
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
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
}
</script>
