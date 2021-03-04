<template>
  <v-container>
    <v-row>
      <ChooseDoctor />
    </v-row>
    <v-row>
      <ChoosePieces />
    </v-row>
    <v-row>
      <v-textarea
        outlined
        name="input-7-4"
        label="Observations"
        v-model="observations"
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
  components: {
    ChooseDoctor,
    ChoosePieces
  },
  data: () => ({
    observations: ''
  })
}
</script>

<style lang="scss" scoped></style>
