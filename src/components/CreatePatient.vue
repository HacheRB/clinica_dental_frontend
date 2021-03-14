<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="teal darken-2 white--text" v-bind="attrs" v-on="on"
        >Crear Paciente</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline teal--text">Crear Paciente</span>
        <v-spacer></v-spacer>
        <v-btn
          class="pr-0"
          color="teal darken-2 white--text mb-2"
          text
          @click="dialog = false"
          ><v-icon dark right>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  v-model="firstName"
                  label="Nombre *"
                  required
                  @change="change"
                  :rules="firstNameRules"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  v-model="lastName"
                  :rules="lastNameRules"
                  label="Apellidos *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  v-model="dni"
                  :rules="dniRules"
                  label="Dni *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  v-model="email"
                  :rules="emailRules"
                  label="Email *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  v-model="mobilephone"
                  :rules="mobilephoneRules"
                  label="Móvil *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  ref="telephone"
                  v-model="telephone"
                  :rules="telephoneRules"
                  label="Teléfono"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <h4>Grupo sanguíneo</h4>
                <v-select
                  :dense="this.$vuetify.breakpoint.smAndDown"
                  color="teal lighten-1"
                  :items="bloodTypes"
                  label="Grupo sanguíneo"
                  :rules="bloodTypeRules"
                  v-model="bloodType"
                  item-color="teal lighten-1"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  color="teal lighten-1"
                  name="Observaciones"
                  label="Observaciones"
                  outlined
                  filled
                  auto-grow
                  v-model="observations"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions
        ><small class="ml-5 text--secondary">* indica campos requeridos</small>
        <!-- <v-btn
          color="teal darken-2 white--text mb-2"
          text
          @click="dialog = false"
        >
          Cerrar
        </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn
          color="teal darken-2 white--text ma-5"
          @click.prevent="createPatient"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import patientService from '../services/patientService'
export default {
  name: 'CreatePatient',
  data: () => ({
    dialog: false,
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    mobilephone: '',
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
  watch: {
    observations: function() {
      this.resetValidation()
    }
  },
  methods: {
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async createPatient() {
      if (!this.$refs.form.validate()) {
        console.log('no pasa las validaciones')
        return
      }
      await patientService
        .createUser({
          firstName: this.firstName,
          lastName: this.lastName,
          dni: this.dni,
          email: this.email,
          mobilephone: this.mobilephone,
          telephone: this.telephone,
          bloodType: this.bloodType,
          observations: this.observations
        })
        .then(res => {
          console.log(res)
          this.$router.push(`${res.data._id}`)
        })
        .catch(err => console.log(err))
    },
    change() {
      this.somethingChanged = true
      console.log(this.somethingChanged)
    }
  }
}
</script>

<style lang="scss" scoped></style>
