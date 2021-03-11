<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="teal darken-2 white--text" v-bind="attrs" v-on="on"
        >Crear Empleado</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline teal--text">Crear Empleado</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="teal darken-1"
                      v-model="date"
                      label="Fecha de creación"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    scrollable
                    locale="es-ES"
                    color="teal darken-1"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="teal darken-1" @click="modal = false">
                      Cancelar
                    </v-btn>
                    <v-btn
                      button
                      color="teal darken-1 white--text"
                      @click="$refs.dialog.save(date)"
                    >
                      Guardar
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <v-checkbox
                  color="teal darken-1 white--text"
                  v-model="employed"
                  :label="changeCheckActive"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-select
                  color="teal lighten-1"
                  :items="occupation"
                  v-model="occupationSelected"
                  label="Cargo"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="teal lighten-1"
                  v-model="firstName"
                  label="Nombre*"
                  required
                  @change="change"
                  :rules="firstNameRules"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="teal lighten-1"
                  v-model="lastName"
                  :rules="lastNameRules"
                  label="Apellidos*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="teal lighten-1"
                  v-model="dni"
                  :rules="dniRules"
                  label="Dni*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="teal lighten-1"
                  v-model="email"
                  :rules="emailRules"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="teal lighten-1"
                  v-model="mobilephone"
                  :rules="mobilephoneRules"
                  label="Móvil*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="teal lighten-1"
                  ref="telephone"
                  v-model="telephone"
                  :rules="telephoneRules"
                  label="Teléfono"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  hint="Mínimo 8 caracteres"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <span class="teal--text">Asocie color al empleado:</span>
                <v-color-picker
                  :hide-canvas="hide"
                  :hide-inputs="hide"
                  :hide-mode-switch="hide"
                  :hide-sliders="hide"
                  class="ma-2 d-flex justify-start"
                  :swatches="swatches"
                  show-swatches
                  v-model="colorSelected"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indica campos requeridos</small>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="teal darken-2 white--text mb-2"
          text
          @click="dialog = false"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="teal darken-2 white--text mb-2"
          @click.prevent="createEmployee"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EmployeeService from '../services/employeeService'
export default {
  name: 'CreateEmployee',
  data: () => ({
    hide: true,
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    employed: true,
    occupation: ['Dentista', 'Auxiliar'],
    occupationValue: ['DOCTOR', 'ASSISTANT'],
    occupationSelected: '',
    show1: false,
    password: 'Password',
    dialog: false,
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    mobilephone: '',
    telephone: '',
    colorSelected: '',
    swatches: [
      ['#F44336', '#009688', '#757575'],
      ['#E91E63', '#33691E', '#000000'],
      ['#9C27B0', '#E65100', '#558B2F'],
      ['#3F51B5', '#795548', '#827717'],
      ['#2196F3', '#607D8B', '#006064']
    ],
    rules: {
      required: value => !!value || 'Requerido.',
      min: v => v.length >= 8 || 'Min 8 Caracteres'
    },
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
    ]
  }),
  computed: {
    changeCheckActive() {
      if (this.employed) return 'Activo'
      else return 'No Activo'
    }
  },
  methods: {
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async createEmployee() {
      if (!this.$refs.form.validate()) {
        console.log('no pasa las validaciones')
        return
      }
      let occupation =
        this.occupationSelected === 'Dentista' ? 'DOCTOR' : 'ASSISTANT'
      await EmployeeService.createEmployee({
        occupation: occupation,
        firstName: this.firstName,
        lastName: this.lastName,
        dni: this.dni,
        email: this.email,
        mobilephone: this.mobilephone,
        telephone: this.telephone,
        password: this.password,
        color: this.colorSelected
      })
        .then(res => {
          console.log(res)
          this.$router.go()
        })
        .catch(err => console.log(err))
    },
    change() {
      this.somethingChanged = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
