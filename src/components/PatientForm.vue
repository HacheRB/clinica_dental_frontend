<template>
  <div></div>
  <!-- <v-row class="d-flex justify-center">
    <v-col cols="12" sm="12" md="12" lg="8" xl="6">
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                color="purple darken-2"
                v-model="firstName"
                :rules="firstNameRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                color="teal lighten-1"
                v-model="lastName"
                :rules="lastNameRules"
                label="Apellidos"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                color="teal lighten-1"
                v-model="dni"
                :rules="dniRules"
                label="Dni"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                color="teal lighten-1"
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                color="teal lighten-1"
                v-model="mobilephone"
                :rules="mobilephoneRules"
                label="Móvil"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                color="teal lighten-1"
                ref="telephone"
                v-model="telephone"
                :rules="telephoneRules"
                label="Teléfono"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <h4>Select patient's blood type</h4>
              <v-select
                color="teal lighten-1"
                :items="bloodTypes"
                label="Grupo Sanguíneo"
                :rules="bloodTypeRules"
                v-model="bloodType"
                item-color="teal lighten-1"
                solo
              ></v-select>
            </v-col>
          </v-row>

          <v-row class="observations">
            <v-textarea
              color="teal lighten-1"
              name="Observaciones"
              label="Observaciones"
              outlined
              filled
              auto-grow
              v-model="observations"
            ></v-textarea>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              type="button"
              color="teal lighten-2 white--text"
              @click.prevent="createPatient"
            >
              Crear Paciente
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row> -->
</template>

//
<script>
// import patientService from '../services/patientService'
// // import PrimaryButton from '../components/PrimaryButton'

// export default {
//   name: 'PatientForm',
//   // components: {PrimaryButton},
//   data: () => ({
//     firstName: '',
//     lastName: '',
//     dni: '',
//     email: '',
//     mobilephone: '',
//     telephone: '',
//     bloodType: '',
//     observations: '',
//     bloodTypes: ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
//     firstNameRules: [
//       v => !!v || 'First name is required',
//       v => v.length <= 30 || 'First name must be less than 30 characters'
//     ],
//     lastNameRules: [
//       v => !!v || 'Name is required',
//       v => v.length <= 50 || 'Name must be less than 50 characters'
//     ],
//     dniRules: [
//       v => !!v || 'DNI is required',
//       v => /^[0-9]{8}[a-zA-Z]$/i.test(v) || 'DNI must be valid'
//     ],
//     emailRules: [
//       v => !!v || 'E-mail is required',
//       v =>
//         /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
//           v
//         ) || 'E-mail must be valid'
//     ],
//     mobilephoneRules: [
//       v => !!v || 'Mobilephone is required',
//       v => /^[67][0-9]{8}$/.test(v) || 'Mobilephone must be valid'
//     ],
//     telephoneRules: [
//       v => !v || /^[9][0-9]{8}$/.test(v) || 'Telephone must be valid'
//     ],
//     bloodTypeRules: [v => !!v || 'Select a blood type']
//   }),
//   watch: {
//     observations: function() {
//       this.resetValidation()
//     }
//   },
//   methods: {
//     resetValidation() {
//       this.$refs.form.resetValidation()
//     },
//     async createPatient() {
//       if (!this.$refs.form.validate()) {
//         console.log('no pasa las validaciones')
//         return
//       }
//       await patientService
//         .createUser({
//           firstName: this.firstName,
//           lastName: this.lastName,
//           dni: this.dni,
//           email: this.email,
//           mobilephone: this.mobilephone,
//           telephone: this.telephone,
//           bloodType: this.bloodType,
//           observations: this.observations
//         })
//         .then(res => {
//           console.log(res)
//           this.$router.push(`${res.data._id}`)
//         })
//         .catch(err => console.log(err))
//     }
//   }
// }
//
</script>

// <style lang="scss" scoped></style>
