<template>
  <v-footer color="teal text-left white--text" padless absolute>
    <v-container fluid>
      <!-- <h2 class="text-uppercase mb-5">Información de contacto</h2> -->

      <!-- Row de información -->
      <v-row class="d-flex flex-col pt-5">
        <!-- Ubicacion -->
        <v-col
          class="d-none d-sm-flex flex-col justify-center"
          cols="12"
          sm="4"
          md="4"
        >
          <v-card flat tile class="teal white--text text-center">
            <p
              cols="12"
              class="d-block text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1"
            >
              TELDE
            </p>

            <p
              cols="12"
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1"
            >
              Calle Prof. Francisco Cruz, 10
            </p>

            <p
              cols="12"
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1"
            >
              35200, Telde.
            </p>
          </v-card>
        </v-col>
        <!-- Ubicacion  Movil-->
        <v-col
          class="d-flex d-sm-none flex-col justify-center"
          cols="12"
          sm="4"
          md="4"
        >
          <v-card flat tile class="teal white--text text-center ">
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              <strong>TELDE</strong> Calle Prof. Francisco Cruz, 10
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            ></p>
          </v-card>
        </v-col>
        <!-- Horario -->
        <v-col
          class="d-flex d-sm-flex flex-col justify-center"
          cols="12"
          sm="4"
          md="4"
        >
          <v-card flat tile class="teal white--text text-center">
            <p
              class="text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              HORARIO
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              Lunes a Jueves 9:30 -20:00h
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              Viernes 9:30 - 14:00h
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              Sabado / Domingo Cerrados
            </p>
          </v-card>
        </v-col>

        <!-- Contacto -->
        <v-col
          class="d-none d-sm-flex flex-col justify-center"
          cols="12"
          sm="4"
          md="4"
        >
          <v-card flat tile class="teal white--text text-center ">
            <p
              class="text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              TELEFONO
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              928692406
            </p>
            <p
              class="text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              EMAIL
            </p>

            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              info@clinicadentalmarrero.es
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex d-sm-none flex-col">
        <v-col class="d-flex flex-col justify-center" cols="12" sm="4" md="4">
          <v-card flat tile class="teal white--text text-center ">
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              <v-icon color="white">
                mdi-phone
              </v-icon>
              <strong> 928692406</strong>
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              <v-icon color="white">mdi-email</v-icon
              ><strong> info@clinicadentalmarrero.es</strong>
            </p>
          </v-card>
        </v-col>
      </v-row>
      <!--  Row de año y nombre clinica -->
      <v-row>
        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Clínica Marrero</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
p {
  display: block;
}
</style>
