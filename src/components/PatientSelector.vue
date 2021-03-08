<template>
  <v-row class="mt-5">
    <v-autocomplete
      v-model="model"
      :items="patients"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-selected
      item-text="dni"
      item-value="_id"
      color="teal lighten-1"
      label="Search for a patient"
      :menu-props="{ closeOnContentClick: true }"
      solo
      return-object
    >
      <!-- item-text es el cambo de busqueda -->
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for a patient
          </v-list-item-title>
        </v-list-item>
      </template>

      <!-- Paciente Seleccionado -->
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="teal lighten-1"
          class="white--text"
          v-on="on"
        >
          <span
            v-text="item.firstName + ' ' + item.lastName + ' - ' + item.dni"
          ></span>
        </v-chip>
      </template>
      <!-- Resultados -->
      <template v-slot:item="{ item }">
        <v-list-item-avatar
          color="teal lighten-1"
          class="headline font-weight-light white--text"
        >
          {{ item.firstName.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.firstname"></v-list-item-title>
          <v-list-item-subtitle
            v-text="item.firstName + ' ' + item.lastName + ' - ' + item.dni"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </v-row>
</template>

<script>
import PatientService from '../services/patientService'

export default {
  name: 'AppointmentForm',
  data() {
    return {
      patients: [],
      isLoading: false,
      model: null,
      search: null
    }
  },
  methods: {
    emitPatient: function(patient) {
      this.$emit('getpatient', patient)
    }
  },
  watch: {
    model(patient) {
      console.log('X', patient)
      if (patient != null) {
        this.tab = 0
        this.emitPatient(patient)
      } else {
        this.tab = null
        this.emitPatient(null)
      }
    },
    search() {
      //patient entre parentesis
      // Items have already been loaded
      if (this.patients.length > 0) return
      this.isLoading = true

      PatientService.getPatients()
        .then(patients => {
          this.patients = patients.data
        })
        .catch(err => console.log(err))
        // Lazily load input items
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
