<template>
  <v-card>
    <v-card-title class="headline teal darken-2 white--text">
      <strong>Editar</strong>
    </v-card-title>

    <v-card-text class="d-flex justify-center white">
      <canvas
        width="500"
        height="500"
        class="mt-5"
        ref="canvas"
        @mousedown="beginDrawing"
        @mousemove="keepDrawing"
        @mouseup="stopDrawing"
      ></canvas>
    </v-card-text>

    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: 'Draw',
  props: { image: String },
  data: () => ({ dialog: false }),
  methods: {
    inicialize() {
      let cvn = this.$refs.canvas
      let ctx = cvn.getContext('2d')
      this.canvas = ctx
      let bg = new Image()
      console.log('this.image', this.image)
      bg.src = this.image
      bg.width = '600'
      bg.height = '600'
      bg.id = 'imageClass'
      bg.onload = function() {
        ctx.drawImage(bg, 0, 0)
      }
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath()
      ctx.strokeStyle = '#96000E'
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
  mounted() {
    this.inicialize()
  }
}
</script>

<style lang="scss" scoped></style>
