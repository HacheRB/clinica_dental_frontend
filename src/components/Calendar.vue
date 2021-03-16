<template>
  <v-col :cols="cols" class="order-last order-md-first">
    <v-sheet height="64">
      <v-toolbar flat>
        <v-btn outlined class="mr-4" color="teal lighten-2" @click="setToday">
          Hoy
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn fab text small color="teal lighten-2" @click="prev">
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-btn fab text small color="teal lighten-2" @click="next">
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="teal lighten-2" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Dia</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semana</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mes</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 dias</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        locale="es"
        v-model="focus"
        color="teal lighten-2"
        :events="all ? events : filteredEvents"
        :event-color="getEventColor"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card min-width="350px" max-height="500px" flat v-if="selectedOpen">
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title v-html="selectedEvent.startTime"></v-toolbar-title>
            <v-spacer></v-spacer>
            |
            <v-spacer></v-spacer>
            <v-toolbar-title v-html="selectedEvent.endTime"></v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <h2 class="mt-4 mb-2">
              {{ selectedEvent.patient.firstName }}
              {{ selectedEvent.patient.lastName }}
            </h2>
            <v-divider></v-divider>
            <p class="mt-2 mb-2">Piezas: {{ selectedEvent.pieces }}</p>
            <h3 class="mt-2 mb-2">Doctor: {{ selectedEvent.employee }}</h3>
            <p class="mt-2">Otros: {{ selectedEvent.otherEmployees.join() }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="showAppointment">
              Ver más
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-col>
</template>

<script>
import AppointmentService from '../services/appointmentService'

export default {
  name: 'Calendar',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mes',
      week: 'Semana',
      day: 'Dia',
      '4day': '4 Dias'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    filteredEvents: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1'
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party'
    ]
  }),
  props: ['cols', 'showThis', 'all', 'cleaning'],
  watch: {
    showThis() {
      if (this.cleaning)
        this.filteredEvents = this.filterCleaningEvents().concat(
          this.filterPerSelectedEmployees()
        )
      else this.filteredEvents = this.filterPerSelectedEmployees()
    },
    cleaning() {
      if (this.cleaning)
        this.filteredEvents = this.filterCleaningEvents().concat(
          this.filterPerSelectedEmployees()
        )
      else this.filteredEvents = this.filterPerSelectedEmployees()
    }
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.getAppointment(event)
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        console.log(this.selectedEvent)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    showAppointment() {
      this.$emit('getappointment', this.selectedEvent.appointmentId)
      this.selectedOpen = false
    },
    updateRange() {
      const events = []

      AppointmentService.getAppointmentsDate()
        .then(appointments => {
          appointments.data.forEach(appointment => {
            let startHour = new Date(appointment.start).getHours()
            let startMinute = new Date(appointment.start).getMinutes()

            let endHour = new Date(appointment.end).getHours()
            let endMinute = new Date(appointment.end).getMinutes()

            appointment.employees.forEach(employee => {
              events.push({
                name: appointment.intervention,
                start: new Date(appointment.start),
                startTime:
                  startMinute === 0
                    ? `${startHour}:${startMinute}0`
                    : `${startHour}:${startMinute}`,
                end: new Date(appointment.end),
                endTime:
                  endMinute === 0
                    ? `${endHour}:${endMinute}0`
                    : `${endHour}:${endMinute}`,
                color:
                  appointment.intervention === 'Limpiezas'
                    ? 'teal'
                    : employee.color,
                timed: true,
                employee: `${employee.firstName} ${employee.lastName}`,
                employeeId: employee._id,
                otherEmployees: this.getOtherEmployees(appointment, employee),
                appointmentId: appointment._id
              })
            })
          })
        })
        .catch(err => console.log(err))

      this.events = events
      this.filteredEvents = events
    },
    getOtherEmployees(appointment, employee) {
      return appointment.employees
        .filter(otherEmployee => otherEmployee !== employee)
        .map(
          otherEmployee =>
            `${otherEmployee.firstName} ${otherEmployee.lastName}`
        )
    },
    getAppointment(event) {
      AppointmentService.getAppointmentById(event.appointmentId)
        .then(appointment => {
          console.log(appointment.data)
          event.patient = appointment.data.patient
          event.pieces = appointment.data.pieces.join()
          this.selectedOpen = true
        })
        .catch(err => console.log(err))
    },
    filterPerSelectedEmployees() {
      return this.events.filter(event =>
        this.showThis.includes(event.employeeId)
      )
    },
    filterCleaningEvents() {
      return this.events.filter(event => event.name === 'Limpiezas')
    }
  }
}
</script>

<style lang="scss" scoped></style>
