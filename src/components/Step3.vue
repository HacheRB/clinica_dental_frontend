<template>
  <v-container>
    <v-row>
      <ChooseDoctor @getemployees="updateEmployees" :employees="employees" />
    </v-row>
    <v-row>
      <ChoosePieces @getpieces="updatePieces" />
    </v-row>
    <v-row>
      <v-textarea
        outlined
        name="input-7-4"
        label="Observations"
        v-model="object.observations"
        color="teal lighten-2"
      ></v-textarea>
    </v-row>
  </v-container>
</template>

<script>
import ChooseDoctor from '../components/ChooseDoctor'
import ChoosePieces from '../components/ChoosePieces'

export default {
  name: 'Step3',
  props: ['employees'],
  components: {
    ChooseDoctor,
    ChoosePieces
  },
  data: () => ({
    object: {
      observations: '',
      selectedEmployees: [],
      pieces: []
    }
  }),
  methods: {
    updateEmployees(employeeId) {
      console.log('padre', employeeId)
      this.object.selectedEmployees = employeeId
    },
    updatePieces(pieces) {
      console.log('padre', pieces)
      this.object.pieces = pieces
    }
  },
  watch: {
    object: {
      handler(object) {
        console.log(object)
        this.$emit('getstep3', object)
      },
      deep: true
    }
    // observations(observations) {
    //   console.log(observations)
    //   this.$emit('getobservations', observations)
    // },
    // employees(employees) {
    //   console.log(employees)
    //   this.$emit('getobservations', employees)
    // },
    // pieces(pieces) {
    //   console.log(pieces)
    //   this.$emit('getobservations', pieces)
    // }
  }
}
</script>

<style lang="scss" scoped></style>
