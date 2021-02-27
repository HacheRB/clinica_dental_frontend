<template>
  <v-bottom-navigation :value="value" color="teal" grow app>
    <v-btn v-for="(item, idx) in items" :key="idx" link :to="item.path">
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomBar',
  data: () => ({
    items: [
      { title: 'Inicio', icon: 'mdi-home-city' },
      {
        title: 'Crear Pacientes',
        icon: 'mdi-account-plus',
        path: '/patientsForm'
      },
      {
        title: 'Buscar Pacientes',
        icon: 'mdi-account-search',
        path: '/patientsList'
      },
      { title: 'Añadir Citas', icon: 'mdi-calendar-plus' },
      { title: 'Empleados', icon: 'mdi-account-group' }
    ],
    value: 1
  })
}
</script>

<style lang="scss" scoped></style>
