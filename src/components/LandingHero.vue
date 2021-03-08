<template>
  <v-row>
    <v-img
      :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
      src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    >
      <v-theme-provider dark>
        <v-container fill-height>
          <v-row align="center" class="white--text mx-auto" justify="center">
            <v-col class="white--text text-center" cols="12" tag="h1">
              <span
                :class="[
                  $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'
                ]"
                class="font-weight-light"
              >
                Clinica Marrero
              </span>

              <br />

              <span
                :class="[
                  $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4'
                ]"
                class="font-weight-black"
              >
                demo
              </span>
            </v-col>

            <v-btn
              class="align-self-end"
              fab
              outlined
              @click="$vuetify.goTo('#about-me')"
            >
              <v-icon>mdi-chevron-double-down</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-theme-provider>
      <div class="fill-height image-gradient"></div>
    </v-img>
  </v-row>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.image-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0.25),
    rgba(255, 0, 0, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
</style>
