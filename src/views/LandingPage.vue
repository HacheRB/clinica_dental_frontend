<template>
  <v-container class="landing-container px-0 pt-9" fluid>
    <LandingHero />
    <LandingTeam />
  </v-container>
</template>

<script>
import LandingHero from '../components/LandingHero'
import LandingTeam from '../components/LandingTeam'
export default {
  name: 'LandingPage',
  components: { LandingHero, LandingTeam }
}
</script>

<style lang="scss" scoped>
.landing-container {
  margin: 0;
  padding: 0;
}
</style>
