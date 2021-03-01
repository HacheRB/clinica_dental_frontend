<template>
  <v-col>
    <v-card color="#B2DFDB">
      <v-card-title class="headline">
        Citas
        <v-spacer></v-spacer>
        <v-btn color="teal lighten-2" grow
          ><v-icon>mdi-calendar-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <strong>{{ proxDate.title }}</strong>
          </v-col>
          <v-col cols="3">{{ proxDate.message }}</v-col>
          <v-col cols="6">{{ proxDate.time }}</v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="3">
            <strong>{{ lastDate.title }}</strong>
          </v-col>
          <v-col cols="3">{{ lastDate.message }}</v-col>
          <v-col cols="6">{{ lastDate.time }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'PatientDates',
  data() {
    return {
      proxDate: {
        title: 'Próxima Cita',
        message: 'Empaste',
        time: '18/01/2021 10:42am'
      },
      lastDate: {
        title: 'Última Cita',
        message: 'Empaste',
        time: '15/01/2021 10:42am'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
