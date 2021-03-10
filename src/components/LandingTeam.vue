<template>
  <v-container id="team" fluid class="text-center team px-0 ">
    <div class="mt-3 py-15 team"></div>

    <h2 class="display-2 text-uppercase font-weight-bold mb-2">Equipo</h2>

    <v-responsive class="mx-auto mb-8" width="150">
      <v-divider class="mb-1"></v-divider>
    </v-responsive>
    <v-row class="d-flex flex-col pt-5">
      <!-- Empleado -->
      <v-col
        v-for="(employee, idx) in employees"
        :key="idx"
        class="d-flex flex-col justify-center pa-5"
        cols="12"
        sm="6"
        md="6"
        lg="3"
        min-height="100vh"
      >
        <v-card
          outlined
          color="transparent"
          class="d-flex flex-column justify-center align-center"
        >
          <v-img
            class="rounded-circle"
            height="200px"
            width="200px"
            hover
            :src="employee.img"
          ></v-img>
          <v-card-title class="mt-5">{{ employee.name }}</v-card-title>
          <v-card-subtitle>{{ employee.title }}</v-card-subtitle>
          <v-card-text>
            <p class="no-overflow">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="py-15 team"></div>
  </v-container>
</template>

<script>
export default {
  name: 'LandingTeam',
  data() {
    return {
      employeeDescription:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
      employees: [
        {
          name: 'Pepita Grillo',
          title: 'Dentista',
          img:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80'
        },
        {
          name: 'Pepito Grillo',
          title: 'Dentista',
          img:
            'https://images.unsplash.com/photo-1567568443997-19f025355d52?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        },
        {
          name: 'Pepito Grillo',
          title: 'Auxiliar',
          img:
            'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
        },
        {
          name: 'Pepita Grilla',
          title: 'Auxiliar',
          img:
            'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1935&q=80'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.team {
  background-color: #e0f2f1;
}
</style>
