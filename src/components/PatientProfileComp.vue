<template>
  <v-form ref="form" lazy-validation>
    <v-container fluid>
      <v-row>
        <!-- Columna de la derecha con los formularios -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstName"
                :rules="nameRules"
                label="First name"
                required
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastName"
                :rules="nameRules"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="dni" label="Dni" required></v-text-field>
            </v-col>
            <v-divider></v-divider>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="mobilephone"
                label="Mobile Phone"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="telephone"
                label="Telephone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="bloodType"
                :items="bloodTypes"
                label="Blood Types"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                filled
                label="Observations"
                auto-grow
                :value="observations"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <!-- Columna de la izquierda con las cards de citas, historial y pruebas -->
        <v-col cols="12" md="6">
          <v-row class="mb-16">
            <v-col>
              <v-card color="#B2DFDB">
                <v-card-title class="headline">
                  Citas
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="3">
                      <strong>{{ proxDate.title }}</strong>
                    </v-col>
                    <v-col cols="3">{{ proxDate.message }}</v-col>
                    <v-col cols="6">{{ proxDate.time }}</v-col>
                  </v-row>
                  <v-row class="mt-5">
                    <v-col cols="3">
                      <strong>{{ lastDate.title }}</strong>
                    </v-col>
                    <v-col cols="3">{{ lastDate.message }}</v-col>
                    <v-col cols="6">{{ lastDate.time }}</v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-16"
            ><v-col>
              <Historical></Historical>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col
              v-for="card in cards"
              :key="card.title"
              :cols="isXsBreakpoint ? 12 : 6"
            >
              <v-card color="#B2DFDB">
                <v-img
                  :src="card.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="card.title"></v-card-title>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Historical from '@/components/PatientProfileHistorical'
export default {
  name: 'Profile',
  components: {
    Historical
  },
  data: () => ({
    dialog: false,
    firstName: '',
    lastName: '',
    dni: '',
    mobilephone: '',
    telephone: '',
    bloodType: '',
    bloodTypes: ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    observations: 'hola',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 50 || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    proxDate: {
      title: 'Próxima Cita',
      message: `Empaste`,
      time: '18/01/2021 10:42am'
    },
    lastDate: {
      title: 'Última Cita',
      message: `Empaste`,
      time: '15/01/2021 10:42am'
    },
    cards: [
      {
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        flex: 12
      },
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      }
    ]
  }),
  computed: {
    isXsBreakpoint: function() {
      return this.$vuetify.breakpoint.name === 'xs'
    }
  }
}
</script>

<style lang="scss" scoped></style>
