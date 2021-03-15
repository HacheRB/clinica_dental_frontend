<template>
  <v-card
    color="teal darken-2"
    @click="$emit('selectedAppointment')"
    class="pb-5"
    dark
  >
    <v-card-title>
      {{ treatment.interventionSubtype }}
    </v-card-title>
    <v-card-text>
      <v-row class="d-flex flex-column">
        <v-col>
          Fecha: {{ appointment.start }}
          |
          {{ appointment.end.slice(-5) }}
        </v-col>
        <v-col>
          Piezas :
          <span v-for="(piece, idx) in appointment.pieces" :key="idx">
            {{ idx !== appointment.pieces.length - 1 ? piece + ', ' : piece }}
          </span>
        </v-col>
        <v-col>
          Empleados:
          <span v-for="(employee, idx) in appointment.employees" :key="idx">
            {{
              idx !== appointment.employees.length - 1
                ? employee.firstName + ' ' + employee.lastName + ', '
                : employee.firstName + ' ' + employee.lastName
            }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppointmentCard',
  props: ['treatment', 'appointment']
}
</script>

<style lang="scss" scoped></style>
