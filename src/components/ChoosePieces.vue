<template>
  <v-row>
    <v-autocomplete
      v-model="selected"
      :disabled="isUpdating"
      :items="pieces"
      filled
      chips
      color="teal lighten-2"
      label="Choose the pieces"
      item-text="name"
      item-value="name"
      multiple
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item"></v-list-item-title>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </v-row>
</template>

<script>
export default {
  name: 'ChooseDoctor',
  data: () => ({
    pieces: [
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48'
    ],
    selected: [],
    isUpdating: false,
    autoUpdate: true
  }),
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    selected(pieces) {
      this.$emit('getpieces', pieces)
    }
  },

  methods: {
    remove(item) {
      const index = this.selected.indexOf(item)
      if (index >= 0) this.selected.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
