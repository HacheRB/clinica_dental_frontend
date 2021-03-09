<template>
  <v-app class="app">
    <LandingHeader v-if="this.$route.path === '/'" />
    <v-main class="pt-8 pt-md-10">
      <SideBar v-if="!(this.$route.path === '/')" />
      <v-container fluid class=" app-container px-0">
        <router-view />
      </v-container>
      <BottomBar
        v-if="this.$vuetify.breakpoint.smAndDown && !(this.$route.path === '/')"
      />
    </v-main>
    <LandingFooter v-if="this.$route.path === '/'" />
  </v-app>
</template>

<script>
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'

import LandingHeader from './components/LandingHeader'
import LandingFooter from './components/LandingFooter'

export default {
  name: 'App',
  components: {
    SideBar,
    BottomBar,
    LandingHeader,
    LandingFooter
  },

  data: () => ({
    //
  })
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
