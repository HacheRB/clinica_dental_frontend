<template>
  <v-container id="contact" fluid class="contact px-0 px-sm-15">
    <div class="mt-3 py-15 contact"></div>

    <div
      class=" text-xs-body-2 display-2 text-center text-uppercase font-weight-bold mb-2"
    >
      Contáctanos
    </div>
    <v-responsive class="mx-auto mb-8" width="150">
      <v-divider class="mb-1"></v-divider>
    </v-responsive>
    <v-row class="d-flex justify-center" cols="12" lg="8" xl="6">
      <v-col text-left cols="12" lg="8" xl="6">
        <p class=" px-5 pb-5 px-sm-0" text-left cols="12" lg="8" xl="6">
          Si tiene alguna duda, necesita realizar una consulta, reservar hora
          para su próxima cita o su primera visita, puede ponerse en contacto
          con nosotros mediante el siguiente formulario de contacto. Le
          responderemos con la mayor brevedad que nos sea posible.
        </p>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center" cols="12" lg="8" xl="6">
      <v-col text-left cols="12" lg="8" xl="6">
        <v-card
          outlined
          class="d-flex flex-column justify-center"
          cols="12"
          sm="6"
        >
          <v-card-text>
            <v-form ref="form">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="teal lighten-1"
                      v-model="fullName"
                      label="Nombre y Apellidos *"
                      required
                      :rules="fullNameRules"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="teal lighten-1"
                      v-model="email"
                      :rules="emailRules"
                      label="Email *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="teal lighten-1"
                      v-model="phone"
                      :rules="phoneRules"
                      label="Teléfono de contacto *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <h4>Motivo de la consulta</h4>
                    <v-select
                      color="teal lighten-1"
                      :items="opciones"
                      label="Seleccione un motivo"
                      v-model="motivo"
                      item-color="teal lighten-1"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      color="teal lighten-1"
                      name="Descripción"
                      label="Descripción"
                      outlined
                      filled
                      auto-grow
                      v-model="description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <small>*indica campos requeridos</small>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="teal darken-2 white--text mb-2"
              @click.prevent="sendForm"
            >
              Solicitar información
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex flex-col pt-5"> </v-row>
    <div class="py-15 contact"></div>
  </v-container>
</template>
<script>
export default {
  name: 'LandingContact',
  data() {
    return {
      fullName: '',
      description: '',
      email: '',
      phone: '',
      motivo: '',
      opciones: [
        'Solicitar Información',
        'Solicitar Presupuesto',
        'Pedir Cita'
      ],
      fullNameRules: [
        v => !!v || 'First name is required',
        v => v.length <= 30 || 'First name must be less than 30 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
            v
          ) || 'E-mail must be valid'
      ],
      phoneRules: [
        v => !!v || 'Mobilephone is required',
        v => /^[679][0-9]{8}$/.test(v) || 'Mobilephone must be valid'
      ],
      methods: {
        sendForm() {
          if (!this.$refs.form.validate()) {
            console.log('no pasa las validaciones')
            return
          }
          console.log('Se envia el formulario')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  background-color: #e0f2f1;
}
</style>
