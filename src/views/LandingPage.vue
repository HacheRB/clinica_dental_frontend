<template>
  <v-container class="landing-container px-0 pt-9" fluid>
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
.landing-container {
  margin: 0;
  padding: 0;
}
</style>
