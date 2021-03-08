<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn
          @click=";(newTreatment = false), getTreatments"
          :color="!newTreatment ? 'teal lighten2 white--text' : 'white'"
          >Continue Treatment</v-btn
        >
      </v-col>
      <v-col class="d-flex justify-start">
        <v-btn
          @click="newTreatment = true"
          :color="newTreatment ? 'teal lighten2 white--text' : 'white'"
          >New Treatment</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-select
        :items="newTreatment ? Object.keys(allTreatments) : activeTreatments"
        v-model="intervention"
        item-text="intervention"
        return-object
        color="teal lighten-2"
        label="Elige una intervención"
      ></v-select>
    </v-row>
    <v-row>
      <v-select
        :items="allTreatments[intervention]"
        v-model="subIntervention"
        color="teal lighten-2"
        v-if="intervention"
        label="Elige una intervención"
      >
      </v-select>
    </v-row>
  </v-container>
</template>

<script>
import PatientService from '../services/patientService'

export default {
  name: 'name',
  props: ['patientId'],
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
      PatientService.getPatientTreatments()
        .then(treatments => {
          this.activeTreatments = treatments.data
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
    let patient = await PatientService.getPatientTreatments(this.patientId)
    console.log('patient', patient)
    this.activeTreatments = patient.data.treatments
    console.log(this.activeTreatments)
  }
}
</script>

<style lang="scss" scoped></style>
