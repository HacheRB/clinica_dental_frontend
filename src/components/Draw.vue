<template>
  <v-card>
    <v-card-title class="headline teal darken-2 white--text">
      <strong>Editar</strong>
    </v-card-title>

    <v-card-text class="d-flex justify-center white">
      <canvas
        class="mt-5"
        :width="height"
        :height="height"
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
  data: () => ({}),
  computed: {
    height() {
      let height = ''
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          height = '300'
          break
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl':
          height = '600'
          break
      }
      console.log(height)
      return height
    }
  },
  methods: {
    inicialize() {
      let cvn = this.$refs.canvas
      let ctx = cvn.getContext('2d')
      this.canvas = ctx
      let bg = new Image()
      bg.src = this.image
      bg.style.backgroundColor = '#000000'
      bg.id = 'imageClass'
      console.log(bg)
      bg.onload = function() {
        ctx.drawImage(bg, 0, 0, 600, 600, 0, 0, 600, 600)
      }
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath() //inicializa la ruta de dibujo del ratón
      ctx.strokeStyle = '#F44336' //color de la linea a dibujar
      ctx.lineWidth = 2 //ancho de la linea a dibujar
      ctx.moveTo(x1, y1) //especifica la ruta en el canvas(donde comieza a pintar) sin crear la linea
      ctx.lineTo(x2, y2) // especifica hasta donde se pinta la linea a mostrar
      ctx.stroke() //hace que se dibuje la linea definida por los metodos moveto y lineto
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
