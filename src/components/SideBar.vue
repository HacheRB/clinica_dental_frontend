<template>
  <v-card>
    <v-navigation-drawer
      :mini-variant.sync="mini"
      fixed
      app
      :permanent="!isSm"
      class="teal darken-2 white--text rounded-0"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="white--text">John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon class="white--text">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'SideBard',
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
      { title: 'Empleados', icon: 'mdi-account-group' }
    ],
    mini: true
  }),
  computed: {
    isSm() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style lang="scss" scoped></style>
