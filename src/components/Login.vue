<template>
  <v-col cols="auto">
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="!isLoggedIn"
          dark
          font-color="white"
          color="white"
          v-bind="attrs"
          v-on="on"
          outlined
          >Login</v-btn
        >
        <v-btn
          v-if="isLoggedIn"
          dark
          font-color="white"
          color="white"
          outlined
          @click.prevent="redirect"
          >Home</v-btn
        >
      </template>
      <template>
        <v-card>
          <!-- Tabs -->

          <!-- <v-tabs color="teal lighten-2" v-model="tabs">
            <v-spacer></v-spacer>
            <v-tab> Login </v-tab>
            <v-tab> Sign Up </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs"> -->

          <!-- /Contenido de Login -->
          <!-- <v-tab-item> -->
          <v-card flat>
            <v-card-title
              class="headline teal darken-2 white--text rounded-0 mb-5"
            >
              Login
              <v-spacer></v-spacer>
              <v-btn icon color=" white" text @click="dialog = false"
                ><v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-col cols="12">
                  <v-text-field
                    color="teal lighten-2"
                    label="Email"
                    prepend-icon="mdi-account-circle"
                    v-model="email"
                    :rules="emailRules"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    color="teal lighten-2"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="password"
                  />
                </v-col>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-checkbox
                color="teal lighten-2"
                v-model="rememberMe"
                label="Remember me"
                :value="rememberMe"
              ></v-checkbox>
              <v-spacer></v-spacer>
              <v-btn dark color="teal darken-2 ma-5" @click="logIn"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
          <!-- </v-tab-item> -->

          <!-- /Contenido de Sign Up-->
          <!-- <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      color="teal lighten-2"
                      label="Username"
                      prepend-icon="mdi-account-circle"
                    />
                    <v-text-field
                      color="teal lighten-2"
                      label="Email"
                      prepend-icon="mdi-account-circle"
                    />
                    <v-text-field
                      color="teal lighten-2"
                      label="Password"
                      prepend-icon="mdi-lock"
                    />
                    <v-text-field
                      color="teal lighten-2"
                      label="Confirm Password"
                      prepend-icon="mdi-lock"
                    />
                  </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="teal lighten-2">Sign Up</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items> -->
        </v-card>
      </template>
      <!-- /Tabs -->
    </v-dialog>
  </v-col>
</template>

<script>
import authService from '../services/authService'

export default {
  name: 'Login',
  data() {
    return {
      dialog: false,
      isLoggedIn: false,
      rememberMe: false,
      showPassword: false,
      tabs: [null],
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail isLoggedIn required',
        v =>
          /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
            v
          ) || 'E-mail must be valid'
      ]
      // passwordRules: [
      //   v => !!v || 'Password isLoggedIn required',
      //   v =>
      //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i.test(
      //       v
      //     ) || 'Password mustbe valid'
      // ]
    }
  },
  async created() {
    if (!localStorage.token) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
    }
  },
  methods: {
    redirect() {
      if (localStorage.token) {
        this.$router.push('/home')
      }
    },
    logIn() {
      authService
        .login(this.email, this.password)
        .then(response => {
          if (response.data && response.data.token) {
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('employeeId', response.data.employeeId)
            this.$router.push({ path: 'home' })
            this.isLoggedIn = true
          } else {
            alert('Email or Password Wrong!')
            this.isLoggedIn = false
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
