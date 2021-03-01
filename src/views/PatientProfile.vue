<template>
  <v-form ref="form" lazy-validation>
    <v-container fluid>
      <v-row>
        <!-- Columna de la derecha con los formularios -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="firstName" label="First name" required>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastName"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="dni" label="Dni" required></v-text-field>
            </v-col>
            <v-divider></v-divider>

            <v-col cols="12" md="4">
              <v-text-field v-model="email" label="E-mail" required>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="mobilephone"
                label="Mobile Phone"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="telephone"
                label="Telephone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="bloodType"
                :items="bloodTypes"
                label="Blood Types"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                filled
                label="Observations"
                auto-grow
                :value="observations"
              ></v-textarea>
            </v-col>
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
import Dates from '@/components/PatientDates'
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
    email: ''
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
  }
}
</script>

<style lang="scss" scoped></style>
