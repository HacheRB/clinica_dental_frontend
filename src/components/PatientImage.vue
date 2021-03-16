<template>
  <v-container class="container rounded">
    <!-- Header del componente -->
    <v-row>
      <v-col class="rounded">
        <span>Images</span>
        <v-spacer></v-spacer>
        <Upload
          :patientId="this.$route.params.patientId"
          @forcererender="forceRerender"
        >
        </Upload>
      </v-col>
    </v-row>

    <!--  Componente grid -->
    <v-row :key="componentKey">
      <v-col
        v-for="(file, idx) in this.filesUrl"
        :key="idx"
        class="d-flex child-flex image-grid"
        cols="6"
        lg="3"
      >
        <v-img
          :src="file.download"
          :lazy-src="file.download"
          aspect-ratio="1"
          max-width="203px"
          max-height="203px"
          class="grey lighten-2 justify-center"
          @click="expandImage(file.download, idx)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-btn
          color=" white"
          text
          icon
          class="btn-grid d-flex justify-self-end"
          @click="deleteImage(file.url)"
          ><v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end" cols="12">
        <v-btn @click.prevent="hola" plain>
          ver más
        </v-btn>
      </v-col>
    </v-row>
    <!-- ^ img v-row ^ -->
    <v-row>
      <v-spacer></v-spacer>
    </v-row>
    <v-overlay :z-index="zIndex" :value="overlay">
      <v-img
        class="d-flex justify-center image-overlay"
        :lazy-src="currentImage"
        max-width="70vh"
        :src="currentImage"
      >
        <v-btn> hola</v-btn></v-img
      >
    </v-overlay>
  </v-container>
</template>

<script>
import firebaseService from '../services/firebaseService'
import Upload from '@/components/Upload.vue'
export default {
  name: 'PatientImage',
  props: ['files', 'totalFilesShown'],
  components: {
    Upload
  },
  data() {
    return {
      componentKey: 0,
      lastFiles: [],
      filesUrl: [],
      currentImage: '',
      overlay: false,
      zIndex: 1000,
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
      this.filesUrl = this.filesUrl.slice(0, this.totalFilesShown)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async deleteImage(url) {
      try {
        const deleted = await firebaseService.deleteFile(url)
        console.log(deleted)
        this.forceRerender()
      } catch (error) {
        console.error(error)
      }
    },
    expandImage(downloadURL) {
      this.currentImage = downloadURL
      this.overlay = !this.overlay
    },
    forceRerender() {
      this.$emit('forcererender')
    },
    hola() {
      console.log('hola')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #b2dfdb;
}
.image-grid {
  position: relative;
}
.btn-grid {
  z-index: 500;
  position: absolute;
  right: 0px;
}
</style>
