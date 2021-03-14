<template>
  <div>
    <v-dialog v-model="dialog" fullscreen width="500">
      <v-card>
        <v-card-title class="headline teal darken-2 white--text rounded-0">
          {{ firstName + ' ' + lastName }}
          <v-spacer></v-spacer>
          <v-btn icon color=" white" text @click="closeDialog"
            ><v-icon>
              mdi-close
            </v-icon>
          </v-btn>
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
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    :items="occupation"
                    v-model="occupationSelected"
                    label="Cargo"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    v-model="firstName"
                    label="Nombre*"
                    required
                    @change="change"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    v-model="lastName"
                    label="Apellidos*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    v-model="dni"
                    label="Dni*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    v-model="email"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    v-model="mobilephone"
                    label="Móvil*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    color="teal lighten-1"
                    ref="telephone"
                    v-model="telephone"
                    label="Teléfono"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :dense="$vuetify.breakpoint.smAndDown"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
                    class="d-flex justify-start px-0"
                    :swatches="swatches"
                    show-swatches
                    v-model="colorSelected"
                  ></v-color-picker>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <small class="ml-5 text--secondary">* indica campos requeridos</small>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1 white--text ma-5" @click="updateProfile">
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EmployeeService from '../services/employeeService'
export default {
  name: 'EmployeeProfile',
  props: {
    employee: { type: Object }
  },
  data() {
    return {
      dialog: false,
      text: '',
      hide: true,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      employed: true,
      occupation: ['Dentista', 'Auxiliar'],
      occupationValue: ['DOCTOR', 'ASSISTANT'],
      occupationSelected: '',
      show1: false,
      password: 'Password',
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
      ]
    }
  },
  created() {
    if (Object.keys(this.employee).length) {
      this.dialog = true
      this.changeDataProfile()
    }
  },
  watch: {
    employee: function(value) {
      console.log(this.employee)
      if (Object.keys(value).length) {
        this.dialog = true
        this.changeDataProfile()
      }
    }
  },
  computed: {
    changeCheckActive() {
      if (this.employed) return 'Activo'
      else return 'No Activo'
    }
  },
  methods: {
    changeDataProfile() {
      if (Object.keys(this.employee).length) {
        this.firstName = this.employee.firstName
        this.date = this.employee.dateOfEmployment
        this.lastName = this.employee.lastName
        this.occupationSelected =
          this.employee.occupation === 'DOCTOR' ? 'Dentista' : 'Auxiliar'
        this.dni = this.employee.dni
        this.password = this.employee.password
        this.email = this.employee.contact.email
        this.mobilephone = this.employee.contact.mobilephone
        this.telephone = this.employee.contact.telephone
        this.colorSelected = this.employee.color
        this.employed = this.employee.employed
        this.text = this.employee.lastName
      } else {
        this.firstName = ''
        this.lastName = ''
        this.occupation = []
        this.date = ''
        this.dni = ''
        this.password = ''
        this.email = ''
        this.mobilephone = ''
        this.telephone = ''
        this.color = ''
        this.employed = ''
        this.text = ''
      }
    },
    closeDialog: function() {
      this.dialog = false
      this.$emit('closedialog')
      this.$emit('updateprofile')
    },
    change() {
      this.somethingChanged = true
    },
    updateProfile() {
      EmployeeService.updateEmployee(this.employee._id, {
        firstName: this.firstName,
        dateOfEmployment: this.date,
        lastName: this.lastName,
        occupation:
          this.occupationSelected === 'Dentista' ? 'DOCTOR' : 'ASSISTANT',
        dni: this.dni,
        password: this.password,
        'contact.email': this.email,
        'contact.mobilephone': this.mobilephone,
        'contact.telephone': this.telephone,
        color: this.colorSelected,
        employed: this.employed
      })
        .then(response => {
          this.closeDialog()
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
