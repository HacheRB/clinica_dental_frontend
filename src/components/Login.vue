<template>
  <v-col cols="auto">
    <v-dialog transition="dialog-top-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">Login</v-btn>
      </template>
      <template>
        <v-card>
          <!-- Tabs -->
          <v-tabs v-model="tabs">
            <v-spacer></v-spacer>
            <v-tab> Login </v-tab>
            <v-tab> Sign Up </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <!-- /Contenido de Login -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Username"
                      prepend-icon="mdi-account-circle"
                    />
                    <v-text-field
                      label="Password"
                      :type="showPassword ? 'text' : 'password'"
                      prepend-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember me"
                    :value="rememberMe"
                  ></v-checkbox>
                  <v-spacer></v-spacer>
                  <v-btn color="success">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <!-- /Contenido de Sign Up-->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Username"
                      prepend-icon="mdi-account-circle"
                    />
                    <v-text-field
                      label="Email"
                      prepend-icon="mdi-account-circle"
                    />
                    <v-text-field label="Password" prepend-icon="mdi-lock" />
                    <v-text-field
                      label="Confirm Password"
                      prepend-icon="mdi-lock"
                    />
                  </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success">Sign Up</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </template>
      <!-- /Tabs -->
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      rememberMe: false,
      showPassword: false,
      tabs: [null],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    logIn() {}
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
