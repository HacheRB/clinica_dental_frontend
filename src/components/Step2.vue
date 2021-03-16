<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn
          small
          @click=";(newTreatment = false), getTreatments()"
          :color="!newTreatment ? 'teal lighten-1 white--text' : 'white'"
          >Continuar Tratamiento</v-btn
        >
      </v-col>
      <v-col class="d-flex justify-start">
        <v-btn
          small
          @click="newTreatment = true"
          :color="newTreatment ? 'teal lighten-1 white--text' : 'white'"
          >Nuevo Tratamiento</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-select
        :items="newTreatment ? Object.keys(allTreatments) : activeTreatments"
        v-model="intervention"
        item-text="Intervención"
        return-object
        color="teal lighten-2"
        label="Elige una intervención"
      ></v-select>
    </v-row>
    <v-row>
      <v-select
        :items="allTreatments[intervention]"
        v-model="subIntervention"
        color="teal lighten-1"
        v-if="intervention && newTreatment"
        label="Elige una intervención"
      >
      </v-select>
    </v-row>
  </v-container>
</template>

<script>
import TreatmentService from '../services/treatmentService'

export default {
  name: 'name',
  props: {
    patientId: String
  },
  data: () => ({
    newTreatment: null,
    allTreatments: {
      'Prótesis híbridas': [
        '4 implantes atornillado directo',
        '4 implantes atornillado indirecto',
        '5 implantes atornillado directo',
        '5 implantes atornillado indirecto',
        'Desmontar'
      ],
      'Prótesis mini híbrida': ['4 piezas', '5 piezas'],
      'Prótesis locator': [
        '2 implantes metal',
        '2 implantes sin metal',
        'mano de obra',
        'aditamentos locator',
        'aditamentos teflón'
      ],
      'Prótesis fija': [
        'Metal porcelana',
        'Zirconio',
        'Carilla porcelana',
        'Carilla composite directa',
        'Carilla composite indirecta',
        'Sobre implantes con aditamento',
        'Sobre implantes directo a implante',
        'Provisional',
        'Provisional sobre implante'
      ],
      'Prótesis removible': [
        'Esquelético de 1 a 3 piezas',
        'Esquelético cada pieza extr',
        'Esquelético soldadura',
        'Acrílicas de 1 a 3 piezas',
        'Acrílicas cada pieza extra',
        'Completas superio o inferior',
        'Completas con malla',
        'Completas con paladar metálico',
        'Composturas con medidas',
        'Composturas sin medidas',
        'Rebase',
        'Maryland'
      ],
      Ferulas: ['Ortodoncia', 'Blandas', 'Mixta', 'Michigan'],
      Limpiezas: ['Simple', 'Profunda', 'Cuadrantes'],
      Obturaciones: [
        'Sellado',
        'Simple',
        'Extensa',
        'Recontrucción',
        'Reconstrucción con tornillo'
      ],
      Endodoncia: [
        '1 canal',
        '2 canales',
        '3 canales',
        'Pulpotomia',
        'Pulpectomia',
        're-endo'
      ],
      Cirugía: [
        'Extracción simple',
        'Extracción compleja',
        'Extracción cordales',
        'Periodoncia pro cuadrante',
        'Periodoncia curetaje',
        'Periodoncia gingivectomia',
        'Periodoncia hueso',
        'Periodoncia membrana',
        'Implantes Straumann',
        'Implantes JD'
      ],
      Ortodoncia: [
        'Fija',
        'Por diente',
        'Quitar brackets',
        'Retenedor fijo',
        'Férula 1º férula',
        'Férula sucesivas',
        'Microtornillos'
      ],
      Blanqueamientos: ['Blanqueamientos'],
      Radiografía: ['Periapical', 'Aleta', 'Ortopantomografía', 'Oclusal', '3D']
    },
    activeTreatments: [],
    intervention: null,
    subIntervention: null
  }),
  methods: {
    getTreatments: function() {
      TreatmentService.getPatientTreatments(this.patientId)
        .then(treatments => {
          this.activeTreatments = treatments.data
          console.log(this.activeTreatments)
        })
        .catch(err => console.log(err))
    }
  },
  watch: {
    intervention() {
      this.$emit(
        'gettreatment',
        this.intervention,
        this.subIntervention,
        this.newTreatment
      )
    },
    subIntervention() {
      this.$emit(
        'gettreatment',
        this.intervention,
        this.subIntervention,
        this.newTreatment
      )
    }
  },
  async created() {
    if (this.patientId) {
      let patientTreatments = await TreatmentService.getPatientTreatments(
        this.patientId
      )
      this.activeTreatments = patientTreatments.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
