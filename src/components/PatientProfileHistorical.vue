<template>
  <v-card color="#B2DFDB">
    <v-card-title class="headline">
      Historial
    </v-card-title>

    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">
        Today
      </div>

      <v-timeline align-top dense>
        <v-timeline-item
          v-for="message in messages"
          :key="message.time"
          :color="message.color"
          small
        >
          <div>
            <div class="font-weight-normal">
              <strong>{{ message.from }}</strong>
            </div>
            <div>Date{{ message.time }}</div>
            <div>{{ message.message }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-card-actions>
      <v-btn text>
        More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Historical',
  data() {
    return {
      messages: [
        {
          from: 'Dr Who',
          message: `Empaste`,
          time: '18/01/2021 10:42am',
          color: 'deep-purple lighten-1'
        },
        {
          from: 'Dr Who2',
          message: 'Empaste',
          time: '16/09/2020 10:37am',
          color: 'green'
        },
        {
          from: 'Dr who3',
          message: 'Extracción',
          time: '20/5/2019 9:47am',
          color: 'deep-purple lighten-1'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
