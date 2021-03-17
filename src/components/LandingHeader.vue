<template>
  <v-container id="header-container" fluid>
    <v-app-bar color="teal darken-2" app dark fixed>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <a id="title-anchor" href="#header-container"
        ><v-toolbar-title class="title">Clínica Dental</v-toolbar-title></a
      >

      <v-spacer></v-spacer>
      <a href="#team">
        <v-btn
          text
          class="d-none d-md-flex text--white"
          @click="$vuetify.goTo('#team')"
        >
          Equipo
        </v-btn></a
      >
      <v-spacer></v-spacer>

      <v-btn text class="d-none d-md-flex" @click="$vuetify.goTo('#services')">
        Servicios
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn text class="d-none d-md-flex" @click="$vuetify.goTo('#contact')">
        Solicitar Información
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text class="d-flex">
        928111111
      </v-btn>

      <Login class="d-none d-sm-flex" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="teal darken-2"
      app
      dark
      fixed
      temporary
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="white--text teal">
          <a href="#team">
            <v-list-item>
              <v-list-item-title>Equipo</v-list-item-title>
            </v-list-item>
          </a>

          <a href="#services">
            <v-list-item>
              <v-list-item-title>Servicios</v-list-item-title>
            </v-list-item>
          </a>

          <a href="#contact">
            <v-list-item>
              <v-list-item-title>Solicitar Cita</v-list-item-title>
            </v-list-item>
          </a>
        </v-list-item-group>
      </v-list>
      <Login class="d-flex d-sm-none px-0" />
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

<style lang="scss" scoped>
#title-anchor {
  color: white;
  text-decoration: none;
}
.header-container {
  height: 64px;
}
.title {
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
