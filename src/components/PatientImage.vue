<template>
  <v-container>
    <v-row>
      {{ this.filesUrl }}
      <v-col
        v-for="(url, idx) in this.filesUrl"
        :key="idx"
        class="d-flex child-flex"
        cols="6"
        lg="3"
      >
        <v-img
          :src="url"
          :lazy-src="url"
          aspect-ratio="1"
          class="grey lighten-2"
          @click.prevent="onClick(url)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <Canvas></Canvas>
          <v-overlay :z-index="zIndex" :value="overlay">
            <v-img
              :lazy-src="currentImage"
              max-width="70vh"
              :src="currentImage"
            ></v-img>
          </v-overlay>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebaseService from '../services/firebaseService'
import Canvas from '@/components/Draw'
export default {
  name: 'PatientImage',
  props: ['files'],
  components: {
    Canvas
  },
  data() {
    return {
      image: { title: 'Radiografía', src: '' },
      lastFiles: [],
      filesUrl: [],
      currentImage: '',
      overlay: false,
      zIndex: 0,
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
  },
  async created() {
    try {
      const files = await firebaseService.getFileList(
        this.$route.params.patientId
      )
      this.filesUrl = await firebaseService.getFileUrls(files)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    onClick(url) {
      this.currentImage = url
      this.overlay = !this.overlay
    }
  }
}
</script>

<style lang="scss" scoped></style>
