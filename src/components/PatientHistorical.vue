<template>
  <v-card color="#B2DFDB" height="500px">
    <v-card-title class="headline teal--text">
      <strong>Historial</strong>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">
        Hoy
      </div>

      <v-timeline align-top dense>
        <v-timeline-item
          v-for="treatment in finishedTreatments"
          :key="treatment.time"
          :color="treatment.color"
          small
        >
          <div>
            <div class="font-weight-medium">
              {{ treatment.from }}
            </div>
            <div>{{ treatment.time }}</div>
            <div>
              <strong>{{ treatment.message }}</strong>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link
        :to="{
          name: 'MedicalHistory',
          params: { patientId: this.$route.params.patientId }
        }"
      >
        <v-btn color="teal darken-2 white--text mb-2">
          Ver mas
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import TreatmentService from '@/services/treatmentService'
export default {
  name: 'Historical',
  data() {
    return {
      finishedTreatments: [],
      sorterTreatments: []
    }
  },
  created() {
    TreatmentService.getFinishedTreatmentByPatient(
      this.$route.params.patientId
    ).then(treatments => {
      this.finishedTreatments = []
      if (treatments.data.length < 1) {
        let today = new Date(Date.now())
        this.finishedTreatments.push({
          message: 'No hay tratamientos anteriores',
          time: `Fecha: ${today.getFullYear()}-${today.getMonth() +
            1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`,
          from: '',
          color: 'teal'
        })
      } else {
        let reduceView = 3
        this.sorterTreatments = treatments.data.sort(function(a, b) {
          return (
            new Date(b.appointments[0].start) -
            new Date(a.appointments[0].start)
          )
        })
        this.sorterTreatments.forEach(treatment => {
          if (reduceView === 0) return
          let employees = ''
          if (treatment.appointments[0].employees.length > 1) {
            treatment.appointments[0].employees.forEach(employee => {
              employees += `${employee.firstName} ${employee.lastName.slice(
                0,
                3
              )}. - `
            })
            employees = employees.slice(0, employees.length - 2)
          } else {
            employees = `${
              treatment.appointments[0].employees[0].firstName
            } ${treatment.appointments[0].employees[0].lastName.slice(0, 3)}.`
          }
          this.finishedTreatments.push({
            message: treatment.intervention,
            time: 'Citas:' + treatment.appointments[0].start + '...',
            from: employees,
            color: 'teal'
          })
          reduceView--
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
