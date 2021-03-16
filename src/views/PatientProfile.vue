<template>
  <v-form ref="form" lazy-validation>
    <v-container fluid>
      <v-row>
        <!-- Columna de la derecha con los formularios -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                color="teal lighten-1"
                v-model="firstName"
                label="Nombre"
                required
                @change="change"
                :rules="firstNameRules"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                color="teal lighten-1"
                v-model="lastName"
                label="Apellidos"
                required
                @change="change"
                :rules="lastNameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                color="teal lighten-1"
                v-model="dni"
                label="Dni"
                required
                @change="change"
                :rules="dniRules"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>

            <v-col cols="12" md="4">
              <v-text-field
                color="teal lighten-1"
                v-model="email"
                label="Email"
                required
                @change="change"
                :rules="emailRules"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                color="teal lighten-1"
                v-model="mobilephone"
                label="Móvil"
                required
                @change="change"
                :rules="mobilephoneRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                color="teal lighten-1"
                v-model="telephone"
                label="Teléfono"
                @change="change"
                :rules="telephoneRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                color="teal lighten-1"
                v-model="bloodType"
                :items="bloodTypes"
                label="Grupo sanguíneo"
                item-color="teal lighten-1"
                required
                @change="change"
                :rules="bloodTypeRules"
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                color="teal lighten-1"
                name="Observaciones"
                label="Observaciones"
                outlined
                filled
                auto-grow
                :value="observations"
                @change="change"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row v-if="somethingChanged" class="d-flex justify-center">
            <v-btn color="teal lighten-2 white--text" @click="updatePatient"
              >Actualizar</v-btn
            >
          </v-row>
        </v-col>
        <!-- Columna de la izquierda con las cards de citas, historial y pruebas -->
        <v-col cols="12" md="6">
          <v-row class="mb-16">
            <PatientNextAppointments></PatientNextAppointments>
          </v-row>
          <v-row class="mb-16">
            <PatientHistorical></PatientHistorical>
          </v-row>
          <v-row>
            <v-col class="mb-16 rounded teal lighten-3">
              <h1>{{ this.$route.params.patientId }}</h1>
              <Upload
                @getfileurl="addFileToPatient"
                :patientId="this.$route.params.patientId"
              >
              </Upload>
              <PatientImage :files="this.files"></PatientImage>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mb-16 rounded teal lighten-3"> </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import PatientService from '../services/patientService'
import PatientHistorical from '@/components/PatientHistorical'
import PatientImage from '@/components/PatientImage'
import PatientNextAppointments from '@/components/PatientNextAppointments'
import patientService from '../services/patientService'
import Upload from '@/components/Upload.vue'

export default {
  name: 'PatientProfile',
  components: {
    PatientHistorical,
    PatientImage,
    Upload,
    PatientNextAppointments
  },
  data: () => ({
    dialog: false,
    patient: {},
    firstName: '',
    lastName: '',
    dni: '',
    mobilephone: '',
    telephone: '',
    bloodType: '',
    bloodTypes: ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    observations: '',
    email: '',
    files: [],
    somethingChanged: false,
    firstNameRules: [
      v => !!v || 'First name is required',
      v => v.length <= 30 || 'First name must be less than 30 characters'
    ],
    lastNameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 50 || 'Name must be less than 50 characters'
    ],
    dniRules: [
      v => !!v || 'DNI is required',
      v => /^[0-9]{8}[a-zA-Z]$/i.test(v) || 'DNI must be valid'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
          v
        ) || 'E-mail must be valid'
    ],
    mobilephoneRules: [
      v => !!v || 'Mobilephone is required',
      v => /^[67][0-9]{8}$/.test(v) || 'Mobilephone must be valid'
    ],
    telephoneRules: [
      v => !v || /^[9][0-9]{8}$/.test(v) || 'Telephone must be valid'
    ],
    bloodTypeRules: [v => !!v || 'Select a blood type']
  }),
  async created() {
    if (!localStorage.token) {
      this.$router.push('/')
    }
    let patient = await PatientService.getPatientById(
      this.$route.params.patientId
    )

    this.firstName = patient.data.firstName
    this.lastName = patient.data.lastName
    this.dni = patient.data.dni
    this.email = patient.data.contact.email
    this.mobilephone = patient.data.contact.mobilephone
    this.telephone = patient.data.contact.telephone
    this.bloodType = patient.data.bloodType
    this.observations = patient.data.observations
    this.patient = patient.data
    this.files = patient.data.files
  },
  methods: {
    change() {
      this.somethingChanged = true
    },
    addFileToPatient(file) {
      console.log('entra en addfiletoPatient')
      console.log(file)
      patientService
        .addFiletoPatient(this.$route.params.patientId, file)
        .then(response => {
          console.log('response de addFileToPatient', response)
        })
        .catch(err => console.log(err))
    },
    updatePatient() {
      patientService
        .updatePatient(
          {
            firstName: this.firstName,
            lastName: this.lastName,
            dni: this.dni,
            'contact.email': this.email,
            'contact.mobilephone': this.mobilephone,
            'contact.telephone': this.telephone,
            firstname: this.firstName,
            bloodType: this.bloodType,
            observations: this.observations
          },
          this.$route.params.patientId
        )
        .then(response => {
          console.log(response)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped></style>
