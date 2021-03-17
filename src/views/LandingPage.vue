<template>
  <!-- el container tenía pt-9 -->
  <v-container
    :class="$vuetify.breakpoint.smAndDown ? 'phone' : 'desktop'"
    fluid
  >
    <LandingHero />
    <LandingTeam />
    <LandingServices />
    <LandingContact />
  </v-container>
</template>

<script>
import LandingContact from '../components/LandingContact'
import LandingHero from '../components/LandingHero'
import LandingServices from '../components/LandingServices'
import LandingTeam from '../components/LandingTeam'
export default {
  name: 'LandingPage',
  components: { LandingContact, LandingHero, LandingServices, LandingTeam }
}
</script>

<style lang="scss" scoped>
.phone {
  margin: 0;
  padding: 0;
  padding-top: 56px;
}
.desktop {
  margin: 0;
  padding: 0;
  padding-top: 64px;
}
</style>
