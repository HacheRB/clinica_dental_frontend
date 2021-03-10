<template>
  <v-row>
    <v-autocomplete
      v-model="selected"
      :disabled="isUpdating"
      :items="employees"
      filled
      chips
      color="teal lighten-1"
      label="Seleccione personal"
      item-text="firstName"
      item-value="item"
      multiple
      return-object
    >
      <template v-slot:selection="data">
        <v-chip
          color="teal lighten-1 white--text"
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item.firstName }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content
            v-text="data.item.firstName"
          ></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.firstName"></v-list-item-title>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </v-row>
</template>

<script>
// import employeeService from '../services/employeeService'

export default {
  name: 'ChooseDoctor',
  data: () => ({
    selected: [],
    isUpdating: false,
    autoUpdate: true
  }),
  props: ['employees'],
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    selected(employeesId) {
      console.log(this.selected, this.employeesId)
      this.$emit('getemployees', employeesId)
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
