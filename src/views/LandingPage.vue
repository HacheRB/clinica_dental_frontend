<template>
  <v-container class="landing-container" fluid>
    <LandingHeader />

    <LandingFooter />
  </v-container>
</template>

<script>
import LandingHeader from '../components/LandingHeader'
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
