<template>
  <div>
    <canvas
      id="myCanvas"
      ref="canvas"
      @mousedown="beginDrawing"
      @mousemove="keepDrawing"
      @mouseup="stopDrawing"
    ></canvas>
  </div>
</template>

<script>
import myImage from '../assets/logo.png'
export default {
  name: 'Draw',
  data: () => ({}),
  methods: {
    func() {
      let cvn = this.$refs.canvas
      let ctx = cvn.getContext('2d')
      let bg = new Image()
      bg.src = myImage
      bg.onload = function() {
        ctx.drawImage(bg, 0, 0)
      }
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath()
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 1
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
    this.func()
    var c = document.getElementById('myCanvas')
    this.canvas = c.getContext('2d')
  }
}
</script>

<style lang="scss" scoped></style>
