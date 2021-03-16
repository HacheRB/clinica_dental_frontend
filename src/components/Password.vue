<template>
  <div>
    <v-btn color="teal darken-2" dark class="ma-2" @click="dialog2 = !dialog2">
      Cambiar contraseña
    </v-btn>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title class="headline teal darken-2 white--text rounded-0">
          Cambio de contraseña
          <v-spacer></v-spacer>
          <v-btn icon color=" white" text @click="closeDialog"
            ><v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-col cols="12">
              <v-text-field
                color="teal darken-2"
                :dense="$vuetify.breakpoint.smAndDown"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                :rules="passwordRules"
                hint="Mínimo 8 caracteres"
                counter
                @click:append="show1 = !show1"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="teal darken-2"
                :dense="$vuetify.breakpoint.smAndDown"
                v-model="confirmPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Repetir Contraseña"
                hint="Mínimo 8 caracteres"
                counter
                required
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            class="d-flex justify-end"
            color="teal darken-2 white--text"
            required
            @click="updatePassword"
          >
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
  name: 'Password',
  props: { employee: Object },
  data() {
    return {
      valid: false,
      dialog2: false,
      password: '',
      confirmPassword: '',
      show1: false,
      passwordRules: [
        v => !!v || 'Password es requerido',
        v => v.length >= 8 || 'El password debe ser de 8 caracteres',
        v =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_+]).{8,}$/i.test(
            v
          ) ||
          'El password debe contener una mayuscula, una minuscula y un caracter especial'
      ],
      confirmPasswordRules: [
        v => !!v || 'Repetir password es requerido',
        v => v.length >= 8 || 'El password debe ser de 8 caracteres',
        v =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_+]).{8,}$/i.test(
            v
          ) ||
          'El password debe contener una mayuscula, una minuscula y un caracter especial',
        this.password === this.confirmPassword ||
          'Las contraseñas deben ser iguales'
      ]
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword ||
        'Las contraseñas deben ser iguales'
    }
  },
  methods: {
    closeDialog: function() {
      this.dialog2 = false
    },
    updatePassword: function() {
      EmployeeService.updatePassword(this.employee._id, {
        password: this.password
      }).then(() => {
        this.dialog2 = false
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
