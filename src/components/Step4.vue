<template>
  <v-row justify="center">
    <v-col>
      <v-date-picker
        v-model="date"
        color="teal lighten-1"
        :allowed-dates="allowedDates"
        class="mt-4"
        locale="es-ES"
      ></v-date-picker>
    </v-col>
    <v-col>
      <v-select
        color="teal lighten-1"
        :items="timeAppointmentStart"
        @change="selectEnd = null"
        v-model="selectStart"
        label="Hora entrada"
      ></v-select>
      <v-select
        color="teal lighten-1"
        :items="hoursAvailable"
        v-model="selectEnd"
        label="Hora salida"
      ></v-select>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Step4',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    selectStart: 0,
    selectEnd: 0,
    openTime: 0,
    appointmentDate: '',
    appointmentHourStart: '',
    appointmentHourEnd: '',
    timeAppointmentStart: [
      { text: '9:00', value: 9, disabled: false },
      { text: '9:30', value: 9.5, disabled: false },
      { text: '10:00', value: 10, disabled: false },
      { text: '10:30', value: 10.5, disabled: false },
      { text: '11:00', value: 11, disabled: false },
      { text: '11:30', value: 11.5, disabled: false },
      { text: '12:00', value: 12, disabled: false },
      { text: '12:30', value: 12.5, disabled: false },
      { text: '13:00', value: 13, disabled: false },
      { text: '13:30', value: 13.5, disabled: false },
      { text: '14:00', value: 14, disabled: false },
      { text: '14:30', value: 14.5, disabled: false },
      { text: '15:00', value: 15, disabled: false },
      { text: '15:30', value: 15.5, disabled: false },
      { text: '16:00', value: 16, disabled: false },
      { text: '16:30', value: 16.5, disabled: false },
      { text: '17:00', value: 17, disabled: false },
      { text: '17:30', value: 17.5, disabled: false },
      { text: '18:00', value: 18, disabled: false },
      { text: '18:30', value: 18.5, disabled: false },
      { text: '19:00', value: 19, disabled: false }
    ], //10.5 horas al día para las citas
    timeAppointmentEnd: [
      { text: '9:30', value: 9.5, disabled: false },
      { text: '10:00', value: 10, disabled: false },
      { text: '10:30', value: 10.5, disabled: false },
      { text: '11:00', value: 11, disabled: false },
      { text: '11:30', value: 11.5, disabled: false },
      { text: '12:00', value: 12, disabled: false },
      { text: '12:30', value: 12.5, disabled: false },
      { text: '13:00', value: 13, disabled: false },
      { text: '13:30', value: 13.5, disabled: false },
      { text: '14:00', value: 14, disabled: false },
      { text: '14:30', value: 14.5, disabled: false },
      { text: '15:00', value: 15, disabled: false },
      { text: '15:30', value: 15.5, disabled: false },
      { text: '16:00', value: 16, disabled: false },
      { text: '16:30', value: 16.5, disabled: false },
      { text: '17:00', value: 17, disabled: false },
      { text: '17:30', value: 17.5, disabled: false },
      { text: '18:00', value: 18, disabled: false },
      { text: '18:30', value: 18.5, disabled: false },
      { text: '19:00', value: 19, disabled: false },
      { text: '19:30', value: 19.5, disabled: false }
    ]
  }),
  watch: {
    selectStart: function(val) {
      if (val.toString().includes('.5'))
        this.appointmentHourStart = val.toString().replace('.5', ':30')
      else this.appointmentHourStart = val.toString() + ':00'
      this.$emit(
        'sendhourstartappointmentstep',
        this.date + ' ' + this.appointmentHourStart
      )
    },
    selectEnd: function(val) {
      if (this.selectEnd !== null) {
        if (val.toString().includes('.5'))
          this.appointmentHourEnd = val.toString().replace('.5', ':30')
        else this.appointmentHourEnd = val.toString() + ':00'
        this.$emit(
          'sendhourendappointmentstep',
          this.date + ' ' + this.appointmentHourEnd
        )
      } else {
        this.$emit('sendhourendappointmentstep', null)
      }
    }
  },
  computed: {
    hoursAvailable: function() {
      this.timeAppointmentEnd.forEach(hour => {
        if (hour.value <= this.selectStart) {
          hour.disabled = true
        } else {
          hour.disabled = false
        }
      })

      return this.timeAppointmentEnd
    }
  },
  methods: {
    allowedDates: val => {
      if (val) return true
    }
  }
}
</script>

<style lang="scss" scoped></style>
