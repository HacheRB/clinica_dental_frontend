<template>
  <div>
    <v-btn color="teal lighten-2 white--text" :to="route">
      {{ name }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'PrimaryButton',
  props: ['route', 'name']
}
</script>

<style lang="scss" scoped></style>
