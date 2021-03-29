<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="teal darken-2 white--text" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card v-if="Object.keys(patient).length">
      <v-card-title class="headline teal darken-2 white--text mb-5">
        <span>Editar Paciente</span>
        <v-spacer></v-spacer>
        <v-btn icon color=" white" text @click="dialog = false"
          ><v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  color="teal lighten-1"
                  v-model="patient.firstName"
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
                  v-model="patient.lastName"
                  label="Apellidos"
                  required
                  @change="change"
                  :rules="lastNameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  color="teal lighten-1"
                  v-model="patient.dni"
                  label="DNI"
                  required
                  @change="change"
                  :rules="dniRules"
                ></v-text-field>
              </v-col>
              <v-divider></v-divider>

              <v-col cols="12" md="4">
                <v-text-field
                  color="teal lighten-1"
                  v-model="patient.contact.email"
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
                  v-model="patient.contact.mobilephone"
                  label="Móvil"
                  required
                  @change="change"
                  :rules="mobilephoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  color="teal lighten-1"
                  v-model="patient.contact.telephone"
                  label="Teléfono"
                  @change="change"
                  :rules="telephoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  color="teal lighten-1"
                  v-model="patient.bloodType"
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
                  v-model="patient.observations"
                  @change="change"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-2 white--text" @click="updatePatient"
          >Actualizar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import patientService from '../services/patientService'

export default {
  name: 'PatientForm',
  props: { patient: Object },
  data: () => ({
    firstName: '',
    valid: false,
    lastName: '',
    dialog: false,
    show1: false,
    dni: '',
    email: '',
    mobilephone: '',
    somethingChanged: false,
    telephone: '',
    bloodType: '',
    observations: '',
    bloodTypes: ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
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
  watch: {},
  methods: {
    change() {
      this.somethingChanged = true
    },
    updatePatient() {
      console.log('observations', this.patient.observations)
      patientService
        .updatePatient(
          {
            firstName: this.patient.firstName,
            lastName: this.patient.lastName,
            dni: this.patient.dni,
            observations: this.patient.observations,
            'contact.email': this.patient.contact.email,
            'contact.mobilephone': this.patient.contact.mobilephone,
            'contact.telephone': this.patient.contact.telephone,
            bloodType: this.patient.bloodType
          },
          this.$route.params.patientId
        )
        .then(response => {
          console.log('response', response)
          this.dialog = false
          this.$emit('updatePatient')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

// <style lang="scss" scoped></style>
