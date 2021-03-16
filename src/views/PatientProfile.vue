<template>
  <v-form ref="form" lazy-validation>
    <v-container fluid px-16 pt-5>
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="#B2DFDB">
            <v-card-title class="headline teal--text">
              <strong>{{ patient.firstName }} {{ patient.lastName }}</strong>
              <v-spacer></v-spacer>
              <PatientForm
                :patient="patient"
                @updatePatient="updatePatient"
              ></PatientForm>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row class="d-flex justify-center align-center flex-wrap">
                <v-col cols="6" class="d-flex justify-start">
                  <h3><strong>Nombre:</strong></h3>
                  <h4 class="ml-3">
                    <strong>{{ firstName }}</strong>
                  </h4>
                </v-col>
                <v-col cols="6" class="d-flex justify-start">
                  <h3><strong>Apellidos:</strong></h3>
                  <h4 class="ml-3">
                    <strong>{{ lastName }}</strong>
                  </h4></v-col
                >
                <v-col cols="6" class="d-flex justify-start">
                  <h3><strong>DNI:</strong></h3>
                  <h4 class="ml-3">
                    <strong>{{ dni }}</strong>
                  </h4></v-col
                >
                <v-col cols="6" class="d-flex justify-start">
                  <h3><strong>Grupo sanguíneo:</strong></h3>
                  <h4 class="ml-3">
                    <strong>{{ bloodType }}</strong>
                  </h4></v-col
                >
                <v-col cols="12" class="d-flex justify-start">
                  <h3><strong>Observaciones:</strong></h3>
                  <h4 class="ml-3">
                    <strong>
                      {{ observations }}
                    </strong>
                  </h4></v-col
                >
              </v-row>
              <v-list class="mt-3 rounded-t">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="teal darken-2">
                      mdi-email
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="teal darken-2">
                      mdi-cellphone
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Móvil</v-list-item-title>
                    <v-list-item-subtitle>{{
                      mobilephone
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list class="rounded-b">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="teal darken-2">
                      mdi-cellphone-basic
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Teléfono</v-list-item-title>
                    <v-list-item-subtitle>{{ telephone }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Columna de la derecha con los formularios -->

        <!-- Columna de la izquierda con las cards de citas, historial y pruebas -->
        <v-col cols="12" md="6">
          <v-row class="mb-16">
            <PatientNextAppointments></PatientNextAppointments>
          </v-row>
          <v-row class="mb-16">
            <PatientHistorical></PatientHistorical>
          </v-row>
          <PatientImage></PatientImage>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import PatientForm from '@/components/PatientForm'
import PatientService from '../services/patientService'
import PatientHistorical from '@/components/PatientHistorical'
import PatientImage from '@/components/PatientImage'
import PatientNextAppointments from '@/components/PatientNextAppointments'
export default {
  name: 'PatientProfile',
  components: {
    PatientHistorical,
    PatientImage,
    PatientForm,
    PatientNextAppointments
  },
  data: () => ({
    dialog: false,
    patient: {},
    firstName: '',
    lastName: '',
    active: false,
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
    if (!localStorage.token) {
      this.$router.push('/')
    }
    this.loadPatient()
  },
  methods: {
    loadPatient() {
      PatientService.getPatientById(this.$route.params.patientId)
        .then(request => {
          this.firstName = request.data.firstName
          this.lastName = request.data.lastName
          this.dni = request.data.dni
          this.email = request.data.contact.email
          this.mobilephone = request.data.contact.mobilephone
          this.telephone = request.data.contact.telephone
          this.bloodType = request.data.bloodType
          this.observations = request.data.observations
          this.patient = request.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit() {
      this.active = true
    },
    updatePatient() {
      this.loadPatient()
    }
  }
}
</script>

<style lang="scss" scoped></style>
