<template>
  <v-container fluid pa-5>
    <v-row class="ma-xs-0 ma-md-5">
      <v-col cols="12" sm="6" lg="3" class="d-flex justify-start align-center">
        <v-breadcrumbs large divider="/" :items="items" class="pl-0" />
      </v-col>
    </v-row>
    <v-form ref="form" lazy-validation>
      <v-row class="ma-xs-0 ma-md-5">
        <v-col cols="12" md="12" lg="4" xl="6">
          <v-card color="#B2DFDB" height="500px">
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
        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
          <PatientNextAppointments></PatientNextAppointments>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
          <PatientHistorical></PatientHistorical>
        </v-col>
      </v-row>
      <v-row class="ma-xs-0 ma-md-5">
        <v-col cols="12" md="6">
          <PatientImage
            :files="this.files"
            :totalFilesShown="4"
            :key="componentKey"
            @forcererender="forceRerender"
          ></PatientImage>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
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
    componentKey: 0,
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
    files: [],
    somethingChanged: false,
    items: [],
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
  computed: {
    name() {
      console.log('patient', this.patient)
      return `${this.patient.firstName} ${this.patient.lastName}`
    }
  },
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
          this.items = [
            { text: 'Pacientes', disabled: false, href: '/patients/list' },
            {
              text: `${this.firstName} ${this.lastName}`,
              disabled: true,
              href: `/patients/${this.patientId}`
            }
          ]
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit() {
      this.active = true
    },
    forceRerender() {
      this.componentKey += 1
    },
    updatePatient() {
      this.loadPatient()
    }
  }
}
</script>

<style lang="scss" scoped></style>
