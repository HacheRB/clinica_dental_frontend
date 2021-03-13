<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="teal darken-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline teal darken-2 white--text">
          <strong>{{ image.title }}</strong>
        </v-card-title>

        <v-card-text class="d-flex justify-center">
          <canvas
            width="600"
            height="400"
            class="mt-5"
            ref="canvas"
            @mousedown="beginDrawing"
            @mousemove="keepDrawing"
            @mouseup="stopDrawing"
          ></canvas>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Draw',
  props: { image: Object },
  data: () => ({ dialog: false }),
  methods: {
    inicialize() {
      let cvn = this.$refs.canvas
      let ctx = cvn.getContext('2d')
      this.canvas = ctx
      let bg = new Image()
      bg.src = this.image.src
      bg.id = 'imageClass'
      bg.onload = function() {
        ctx.drawImage(bg, 0, 0)
      }
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath()
      ctx.strokeStyle = 'teal'
      ctx.lineWidth = 2
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.closePath()
    },
    beginDrawing(e) {
      this.x = e.offsetX
      this.y = e.offsetY
      this.isDrawing = true
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
        this.x = e.offsetX
        this.y = e.offsetY
      }
    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
        this.x = 0
        this.y = 0
        this.isDrawing = false
      }
    }
  },
  updated() {
    this.inicialize()
  }
}
</script>

<style lang="scss" scoped></style>
