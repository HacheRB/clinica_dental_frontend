<template>
  <v-container fluid pa-5>
    <v-row>
      <v-col cols="6" class="d-flex justify-start align-center">
        <v-text-field
          color="teal lighten-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          @keyup="doSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="d-flex justify-end align-center">
        <CreateEmployee></CreateEmployee>
        <EmployeeProfile
          :employee="employee"
          @closeDialog="closeDialog"
          @updateProfile="updateProfile"
        ></EmployeeProfile>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="teal--text">
            <strong> Empleados </strong>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="employees"
            :page="page"
            :items-per-page="itemsPerPage"
            :options.sync="options"
            :server-items-length="totalEmployees"
            :search="search"
            @click:row="showEmployee"
          >
            <template v-slot:item.color="{ item }">
              <v-chip :color="item.color" class="rounded-circle" small dark>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmployeeProfile from '../components/EmployeeProfile'
import CreateEmployee from '../components/CreateEmployee'
import EmployeeService from '../services/employeeService'
export default {
  name: 'Employees',
  components: { CreateEmployee, EmployeeProfile },
  data: () => ({
    employees: [],
    search: '',
    employee: {},
    totalEmployees: 0,
    options: {},
    page: 1,
    itemsPerPage: 10,
    headers: [
      {
        text: 'Apellidos',
        align: 'start',
        sortable: true,
        value: 'lastName',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Nombre',
        value: 'firstName',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Dni',
        value: 'dni',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Telefono',
        value: 'contact.mobilephone',
        class: 'teal darken-2 white--text'
      },
      {
        text: 'Cargo',
        value: 'occupation',
        class: 'teal darken-2 white--text'
      },

      {
        text: 'Color',
        value: 'color',
        class: 'teal darken-2 white--text'
      }
    ]
  }),
  created() {
    EmployeeService.getEmployees()
      .then(response => {
        this.employees = response.data.employees.map(employee => {
          return {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            color: employee.color,
            contact: employee.contact,
            dni: employee.dni,
            occupation:
              employee.occupation === 'DOCTOR' ? 'Dentista' : 'Auxiliar'
          }
        })
      })
      .catch(err => console.log(err))
  },
  watch: {
    options: function() {
      const { page, itemsPerPage } = this.options
      this.page = page
      this.itemsPerPage = itemsPerPage
      this.doSearch()
    }
  },
  // computed: {
  //   changeOccupation(occupation) {
  //     return occupation === 'DOCTOR' ? 'Dentista' : 'Auxiliar'
  //   }
  // },
  methods: {
    closeDialog: function() {
      this.employee = {}
    },
    showEmployee: function(value) {
      this.employee = value
    },
    doSearch: function() {
      EmployeeService.getEmployeesByQuery(
        this.itemsPerPage,
        this.page,
        this.search
      )
        .then(response => {
          this.employees = response.data.employees.map(employee => {
            return {
              _id: employee._id,
              dateOfEmployment: employee.dateOfEmployment,
              password: employee.password,
              employed: employee.employed,
              firstName: employee.firstName,
              lastName: employee.lastName,
              color: employee.color,
              contact: employee.contact,
              dni: employee.dni,
              occupation:
                employee.occupation === 'DOCTOR' ? 'Dentista' : 'Auxiliar'
            }
          })
          this.totalEmployees = response.data.totalEmployees
          const { sortBy, sortDesc } = this.options
          if (sortBy.length === 1 && sortDesc.length === 1) {
            this.employees = this.employees.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]
              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }
        })
        .catch(err => console.log(err))
    },
    updateProfile() {
      this.doSearch()
    }
  }
}
</script>

<style lang="scss" scoped></style>
