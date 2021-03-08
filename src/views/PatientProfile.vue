<template>
  <v-form ref="form" lazy-validation>
    <v-container fluid>
      <v-row>
        <!-- Columna de la derecha con los formularios -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstName"
                label="First name"
                required
                @change="change"
                :rules="firstNameRules"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastName"
                label="Last name"
                required
                @change="change"
                :rules="lastNameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
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
                v-model="email"
                label="E-mail"
                required
                @change="change"
                :rules="emailRules"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="mobilephone"
                label="Mobile Phone"
                required
                @change="change"
                :rules="mobilephoneRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="telephone"
                label="Telephone"
                @change="change"
                :rules="telephoneRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="bloodType"
                :items="bloodTypes"
                label="Blood Types"
                required
                @change="change"
                :rules="bloodTypeRules"
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                filled
                label="Observations"
                auto-grow
                :value="observations"
                @change="change"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row v-if="somethingChanged" class="d-flex justify-center">
            <v-btn @click="updatePatient">Submit Changes</v-btn>
          </v-row>
        </v-col>
        <!-- Columna de la izquierda con las cards de citas, historial y pruebas -->
        <v-col cols="12" md="6">
          <v-row class="mb-16">
            <Dates></Dates>
          </v-row>
          <v-row class="mb-16">
            <Historical></Historical>
          </v-row>
          <Images></Images>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import PatientService from '../services/patientService'
import Historical from '@/components/PatientHistorical'
import Images from '@/components/PatientImage'
import Dates from '@/components/PatientNextAppointments'
import patientService from '../services/patientService'
export default {
  name: 'PatientProfile',
  components: {
    Historical,
    Images,
    Dates
  },
  data: () => ({
    dialog: false,
    firstName: '',
    lastName: '',
    dni: '',
    mobilephone: '',
    telephone: '',
    bloodType: '',
    bloodTypes: ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    observations: '',
    email: '',
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
  created() {
    PatientService.getPatientById(this.$route.params.patientId).then(
      request => {
        this.firstName = request.data.firstName
        this.lastName = request.data.lastName
        this.dni = request.data.dni
        this.email = request.data.contact.email
        this.mobilephone = request.data.contact.mobilephone
        this.telephone = request.data.contact.telephone
        this.bloodType = request.data.bloodType
        this.observations = request.data.observations
      }
    )
  },
  methods: {
    change() {
      this.somethingChanged = true
      console.log(this.somethingChanged)
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
