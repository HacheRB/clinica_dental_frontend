<template>
  <v-container class="landing-container" fluid>
    <LandingHeader />
    <!-- <LandingHero /> -->

    <LandingFooter />
  </v-container>
</template>

<script>
import LandingHeader from '../components/LandingHeader'
// import LandingHero from '../components/LandingHero'
import LandingFooter from '../components/LandingFooter'
export default {
  name: 'LandingPage',
  components: { LandingHeader, LandingFooter }
}
</script>

<style lang="scss" scoped>
.landing-container {
  margin: 0;
  padding: 0;
}
</style>
