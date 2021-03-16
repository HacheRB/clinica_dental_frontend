<template>
  <v-card>
    <v-navigation-drawer
      :mini-variant.sync="mini"
      fixed
      app
      prominent
      :permanent="!isSm"
      class="teal darken-2 white--text rounded-0"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar color="white">
          <v-icon color="teal">mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-title class="white--text" @click="sendMe"
          >{{ me.firstName }} {{ me.lastName }}</v-list-item-title
        >

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
      <template v-slot:append>
        <div class="pa-2 pl-0">
          <v-btn plain class="white--text" @click="menuActionClick">
            <v-icon class="ml-0 pr-2 mr-2">mdi-logout</v-icon
            ><span v-if="!mini">Cerrar sesión</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import EmployeeService from '../services/employeeService'

export default {
  name: 'SideBar',
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
      {
        title: 'Empleados',
        icon: 'mdi-account-group',
        path: '/employees/list'
      }
    ],
    mini: true,
    me: {}
  }),
  computed: {
    isSm() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  created() {
    EmployeeService.getMe()
      .then(me => {
        this.me = me.data
      })
      .catch(err => console.log(err))
  },
  methods: {
    sendMe: function() {
      this.$emit('sendme', this.me)
    },
    menuActionClick() {
      localStorage.clear()
      this.$router.push({ name: 'LandingPage' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
