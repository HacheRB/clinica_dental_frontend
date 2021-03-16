<template>
  <v-footer color="teal darken-2 text-left white--text" padless app absolute>
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
          <v-card flat tile class="transparent white--text text-center">
            <p
              cols="12"
              class="d-block text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 text-uppercase"
            >
              Telde
            </p>

            <p
              cols="12"
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1"
            >
              Calle León y Castillo, 200
            </p>

            <p
              cols="12"
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1"
            >
              35010, Las Palmas.
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
          <v-card flat tile class="transparent white--text text-center ">
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              <strong>Las Palmas</strong> Calle Leon Y castillo, 200
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
          <v-card flat tile class="transparent white--text text-center">
            <p
              class="text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2 text-uppercase"
            >
              Horario
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              Lunes a Jueves 9:30 - 20:00h
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              Viernes 9:30 - 14:00h
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              Sábado / Domingo Cerrados
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
          <v-card flat tile class="transparent white--text text-center ">
            <p
              class="text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2 text-uppercase"
            >
              Teléfono
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              928111111
            </p>
            <p
              class="text-left font-weight-bold text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2 text-uppercase"
            >
              Email
            </p>

            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              info@clinicadental.es
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex d-sm-none flex-col">
        <v-col class="d-flex flex-col justify-center" cols="12" sm="4" md="4">
          <v-card flat tile class="transparent white--text text-center ">
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              <v-icon color="white">
                mdi-phone
              </v-icon>
              <strong> 928111111</strong>
            </p>
            <p
              class="text-left text-body-2 text-sm-body-2 text-md-body-1 text-lg-body-1 text-xl-body-1 mb-2"
            >
              <v-icon color="white">mdi-email</v-icon
              ><strong> info@clinicadental.es</strong>
            </p>
          </v-card>
        </v-col>
      </v-row>
      <!--  Row de año y nombre clinica -->
      <v-row>
        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Clínica Dental</strong>
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
