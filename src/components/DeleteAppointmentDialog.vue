<template>
  <v-dialog v-model="dialog" width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Esta segur@ de que quiere eliminar la cita de la base de datos?
      </v-card-title>
      <v-card-actions class="d-flex justify-center">
        <v-btn @click="dialog = false" text color="teal darken-2">No</v-btn>
        <v-btn
          @click="deleteAppointment(item), (dialog = false)"
          color="teal"
          dark
          >Sí</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AppointmentService from '../services/appointmentService'

export default {
  name: 'DeleteAppointmentDialog',
  props: ['item'],
  data: () => ({
    dialog: false
  }),
  methods: {
    deleteAppointment: function(appointment) {
      console.log(appointment)
      AppointmentService.deleteAppointment(appointment)
        .then(response => {
          console.log(response.data)
          this.$emit('deleteappointment')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped></style>
