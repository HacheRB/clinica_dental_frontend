<template>
  <div>
    <v-btn :to="route">
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
