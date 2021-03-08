<template>
  <v-container fill-height>
    <v-app-bar color="teal" dark app>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Clínica Marrero</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn plain class="d-none d-md-flex">
        Equipo
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn plain class="d-none d-md-flex">
        Servicios
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn plain class="d-none d-md-flex">
        Solicitar Cita
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn plain class="d-flex">
        928615054
      </v-btn>

      <Login class="d-none d-sm-flex" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="teal" dark absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="white--text teal">
          <v-list-item>
            <v-list-item-title>Equipo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Servicios</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Solicitar Cita</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Telefono</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import Login from '../components/Login'
export default {
  name: 'LandingHeader',
  components: { Login },
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
