<template>
  <v-row dense>
    <v-col
      v-for="card in cards"
      :key="card.title"
      :cols="isXsBreakpoint ? 12 : 6"
    >
      <v-card color="#B2DFDB">
        <Canvas :image="card.src"></Canvas>
        <v-img
          :src="card.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title v-text="card.title"></v-card-title>
        </v-img>
      </v-card>
    </v-col>
    <v-col class="d-flex align-end flex-row justify-start">
      <v-btn text color="teal accent-4">
        Ver mas
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Canvas from '@/components/Draw'
export default {
  name: 'PatientImage',
  components: {
    Canvas
  },
  data() {
    return {
      cards: [
        {
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12
        },
        {
          title: 'Favorite road trips',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          flex: 6
        },
        {
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          flex: 6
        }
      ]
    }
  },
  computed: {
    isXsBreakpoint: function() {
      return this.$vuetify.breakpoint.name === 'xs'
    }
  }
}
</script>

<style lang="scss" scoped></style>
