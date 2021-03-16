<template>
  <v-container>
    <v-row>
      <v-spacer> </v-spacer>
      <v-col class="d-flex justify-end">
        <v-btn
          dark
          @click="toggleFileUpload = !toggleFileUpload"
          :color="toggleFileUpload ? 'teal darken-2' : 'secondary'"
        >
          {{ addFileBtn }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- PRUEBAS VUETIFY -->
    <v-row class="d-flex flex-column" v-if="!toggleFileUpload">
      <v-col>
        <!-- FILE SELECT VUETIFY  -->
        <v-file-input
          show-size
          counter
          label="File input"
          :accept="acceptedFiles"
          v-model="file"
        ></v-file-input>
        <!-- LOAD BAR VUETIFY -->

        <v-progress-linear
          v-if="!this.fileSelected"
          color="teal darken-2"
          rounded
          :value="progress"
        ></v-progress-linear>
      </v-col>
      <v-col>
        <!-- no se está usando ahora mismo -->
        <v-alert
          v-model="alert"
          v-if="alert"
          type="error"
          dense
          outlined
          dismissible
          close-text="Close Alert"
        >
          No se adjuntó ningún archivo
        </v-alert>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn
          dark
          color="teal darken-2"
          v-if="this.file !== null"
          @click="onUpload"
        >
          Upload
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
// import firebaseService from '../services/firebaseService'

export default {
  name: 'Upload',
  props: ['patientId'],

  data() {
    return {
      alert: false,
      acceptedFiles: 'image/png, image/jpeg, image/bmp',
      fileSelected: true,
      toggleFileUpload: true,
      fileName: 'Prueba',
      progress: 0,
      uploadURL: null,
      file: null,
      currentFile: new File(['foo'], 'foo.txt', {
        type: 'text/plain'
      })
    }
  },
  computed: {
    addFileBtn: function() {
      return this.toggleFileUpload ? 'Add File' : 'Close'
    }
  },
  methods: {
    onUpload() {
      if (this.file !== null) {
        this.fileSelected = false
        this.alert = false

        //Check File extension(basic validations)
        let type = 'pdf'
        if (this.file.name.slice(-3) === 'pdf') {
          type = 'document'
        } else {
          type = 'image'
        }
        var metadata = {
          name: 'File'
        }
        var storage = firebase.storage()
        var storageRef = storage
          .ref(`clinica/pacientes/${this.patientId}/${type}s/${this.file.name}`)
          .put(this.file, metadata)

        storageRef.on(
          `state_changed`,
          snapshot => {
            this.progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused')
                break
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running')
                break
            }
          },
          // Handle unsuccessful uploads
          error => {
            switch (error.code) {
              case 'storage/unauthorized':
                console.log('Unauthorized')
                break
              case 'storage/canceled':
                console.log('Canceled upload')
                break
              case 'storage/unknown':
                console.log('Unknown error')
                break
            }
          },
          //Handle succesfull Uploads
          () => {
            this.progress = 100
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              this.uploadURL = url
              this.fileSelected = true
              this.progress = 0
              this.file = null
              this.$emit('forcererender')
            })
          }
        )
      } else {
        this.fileSelected = true
        this.alert = true
        console.log('no file selected')
        //Falta añadir un dialog que confirme que se subió el archivo
      }
    }
  }
}
</script>

<style scoped="">
img.preview {
  width: 200px;
}
</style>
