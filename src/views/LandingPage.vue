<template>
  <v-container class="landing-container" fluid>
    <LandingHero />
  </v-container>
</template>

<script>
import LandingHero from '../components/LandingHero'
export default {
  name: 'LandingPage',
  components: { LandingHero }
}
</script>

<style lang="scss" scoped>
.landing-container {
  margin: 0;
  padding: 0;
}
</style>
