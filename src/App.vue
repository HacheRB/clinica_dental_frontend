<template>
  <v-app class="app">
    <!-- landing header tenia class="pb-8 pb-md-10" -->
    <LandingHeader v-if="this.$route.path === '/'" />
    <v-main class="pt-0">
      <SideBar v-if="!(this.$route.path === '/')" @sendme="sendMe" />
      <v-container fluid class="app-container px-0">
        <router-view />
      </v-container>
      <BottomBar
        v-if="this.$vuetify.breakpoint.smAndDown && !(this.$route.path === '/')"
      />
    </v-main>
    <LandingFooter v-if="this.$route.path === '/'" />
    <EmployeeProfile :employee="me" @closedialog="resetMe" />
  </v-app>
</template>

<script>
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'
import EmployeeProfile from './components/EmployeeProfile'

import LandingHeader from './components/LandingHeader'
import LandingFooter from './components/LandingFooter'

export default {
  name: 'App',
  components: {
    SideBar,
    BottomBar,
    EmployeeProfile,
    LandingHeader,
    LandingFooter
  },

  data: () => ({
    me: {}
  }),

  methods: {
    sendMe: function(me) {
      this.me = me
    },
    resetMe: function() {
      this.me = {}
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.buttons {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
