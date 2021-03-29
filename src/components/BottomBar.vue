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
      {
        title: 'Inicio',
        icon: 'mdi-home-city',
        path: '/home'
      },
      {
        title: 'Pacientes',
        icon: 'mdi-account-search',
        path: '/patients/list'
      },
      { title: 'Citas', icon: 'mdi-calendar', path: '/appointments/list' },
      { title: 'Empleados', icon: 'mdi-account-group', path: '/employees/list' }
    ],
    value: 1
  })
}
</script>

<style lang="scss" scoped></style>
