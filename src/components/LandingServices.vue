<template>
  <v-container id="services" class="text-center services px-0 ">
    <div class="mt-3 py-15 team"></div>

    <h2 class="display-2 text-uppercase font-weight-bold mb-2">Servicios</h2>

    <v-responsive class="mx-auto mb-8" width="150">
      <v-divider class="mb-1"></v-divider>
    </v-responsive>

    <v-row class="d-flex flex-col  justify-xs-start pt-5">
      <v-col
        v-for="(service, idx) in services"
        :key="idx"
        cols="12"
        sm="6"
        md="6"
        lg="3"
        class="d-flex flex-col"
        min-height="100vh"
      >
        <v-row class="d-flex justify-xs-start align-center">
          <v-col
            class="d-flex flex-col justify-xs-start justify-end my-lg-10"
            cols="2"
            xs="2"
            sm="5"
            md="5"
          >
            <v-icon
              v-if="$vuetify.breakpoint.xsOnly"
              medium
              color="teal darken-2 "
            >
              mdi-tooth-outline
            </v-icon>
            <v-icon
              v-if="$vuetify.breakpoint.smAndUp"
              x-large
              color="teal darken-2 "
            >
              mdi-tooth-outline
            </v-icon>
          </v-col>
          <v-col class="d-flex flex-col justify-start" cols="7" sm="7" md="7">
            <div>
              <p class="text-6 text-lg-h6 ml-5 ma-0 ma-lg-4  ">{{ service }}</p>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="mt-3 py-15 team"></div>
  </v-container>
</template>

<script>
export default {
  name: 'LandingServices',
  data() {
    return {
      services: [
        'Blanqueamiento',
        'Endodoncia',
        'Extracciones',
        'Implantes',
        'Limpiezas',
        'Odontología',
        'Odontopediatría',
        'Ortodoncia',
        'Prótesis',
        'Radiografías'
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
