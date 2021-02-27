<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <SideBar />
        <BottomBar v-if="this.$vuetify.breakpoint.smAndDown" />
        <router-view />
      </v-container> </v-main
  ></v-app>
</template>

<script>
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'

export default {
  name: 'App',

  components: {
    SideBar,
    BottomBar
  },

  data: () => ({
    //
  })
}
</script>
