<template>
  <v-col cols="12">
    <!-- <v-autocomplete
      v-model="friends"
      :items="people"
      filled
      chips
      color="blue-grey lighten-2"
      label="Select"
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
          <v-avatar left>
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar> 
     {{ data.item.name }}
        </v-chip>
      </template> 
    <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-avatar>
            <img :src="data.item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.group"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template> 
     </v-autocomplete> -->
  </v-col>
</template>

<script>
export default {
  name: 'EmployeeSelector'
  // props: ['employees'],
  // data() {
  //   return {
  //     autoUpdate: true,
  //     isUpdating: false
  //   }
  // },
  // methods: {
  //   remove(item) {
  //     const index = this.friends.indexOf(item.name)
  //     if (index >= 0) this.friends.splice(index, 1)
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
