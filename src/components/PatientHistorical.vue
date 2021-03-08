<template
  ><v-col>
    <v-card color="#B2DFDB">
      <v-card-title class="headline">
        Historial
      </v-card-title>

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
              <div>Date {{ treatment.time }}</div>
              <div>
                <strong>{{ treatment.message }}</strong>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>

      <v-card-actions>
        <v-btn text>
          Ver mas
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import TreatmentService from '@/services/treatmentService'
export default {
  name: 'Historical',
  data() {
    return {
      finishedTreatments: []
    }
  },
  created() {
    TreatmentService.getFinishedTreatmentByPatient(
      this.$route.params.patientId
    ).then(treatments => {
      treatments.data.forEach(treatment => {
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
          time: treatment.appointments[0].start,
          from: employees,
          color: 'teal'
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
