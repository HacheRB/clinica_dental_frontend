<template>
  <!-- Header del componente -->
  <v-card color="#B2DFDB">
    <v-card-title class="headline teal--text">
      <strong>Historial</strong>
      <Upload
        :patientId="this.$route.params.patientId"
        @forcererender="forceRerender"
      >
      </Upload>
    </v-card-title>
    <v-card-text>
      <!--  Componente grid -->
      <v-row :key="componentKey">
        <v-col
          v-for="(file, idx) in this.filesUrl"
          :key="idx"
          class="d-flex child-flex image-grid justify-center"
          cols="6"
          sm="4"
          lg="4"
          xl="4"
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
            <v-btn
              color=" white"
              text
              icon
              class="btn-grid d-flex"
              @click.stop="deleteImage(file.url)"
              ><v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-img>
        </v-col>
      </v-row>
      <!-- ^ img v-row ^ -->
      <v-row>
        <v-spacer></v-spacer>
      </v-row>

      <v-overlay :z-index="zIndex" :value="overlay">
        <v-btn
          color=" white"
          text
          icon
          dark
          class="btn-grid d-flex justify-self-end"
          @click="closeOverlay"
          ><v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <Draw :image="currentImage"></Draw>
        <!-- <v-img
            class="d-flex justify-center image-overlay"
            :lazy-src="currentImage"
            max-width="70vh"
            :src="currentImage"
          >
          </v-img> -->
      </v-overlay>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end" cols="12">
        <v-btn plain>
          ver más
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebaseService from '../services/firebaseService'
import Upload from '@/components/Upload.vue'
import Draw from '@/components/Draw'
export default {
  name: 'PatientImage',
  props: ['files', 'totalFilesShown'],
  components: {
    Upload,
    Draw
  },
  data() {
    return {
      componentKey: 0,
      lastFiles: [],
      filesUrl: [],
      currentImage: '',
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
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
      console.log(this.filesUrl)
    } catch (error) {
      console.error(error)
    }
  },
  // mounted() {
  //   this.inicialize()
  //   console.log('this.$refs 2', this.$refs)
  // },
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
    closeOverlay() {
      this.overlay = false
    }
    // inicialize() {
    //   let cvn = this.$refs.canvas
    //   let ctx = cvn.getContext('2d')
    //   this.canvas = ctx
    //   let bg = new Image()
    //   console.log('this.currentImage', this.currentImage)
    //   bg.src = this.currentImage
    //   bg.id = 'imageClass'
    //   bg.onload = function() {
    //     ctx.drawImage(bg, 0, 0)
    //   }
    // },
    // drawLine(x1, y1, x2, y2) {
    //   let ctx = this.canvas
    //   ctx.beginPath()
    //   ctx.strokeStyle = 'teal'
    //   ctx.lineWidth = 2
    //   ctx.moveTo(x1, y1)
    //   ctx.lineTo(x2, y2)
    //   ctx.stroke()
    //   ctx.closePath()
    // },
    // beginDrawing(e) {
    //   this.x = e.offsetX
    //   this.y = e.offsetY
    //   this.isDrawing = true
    // },
    // keepDrawing(e) {
    //   if (this.isDrawing === true) {
    //     this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
    //     this.x = e.offsetX
    //     this.y = e.offsetY
    //   }
    // },
    // stopDrawing(e) {
    //   if (this.isDrawing === true) {
    //     this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
    //     this.x = 0
    //     this.y = 0
    //     this.isDrawing = false
    //   }
    // }
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
  right: 10px;
  top: 10px;
}
</style>
