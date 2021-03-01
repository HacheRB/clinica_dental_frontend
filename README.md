<h1> Dental Clinic CRM</h1>

<h2> Instructions </h2>

<h3> Prerequisites </h3>
To build and run this application locally, you'll need Node, VueJS and a internet browser

<h3> Run this App </h3>

```
# Clone this repository
$ git clone https://github.com/anate82/clinica_dental.git

# Navigate to the main folder in the repository
$ cd clinica-dental

# Navigate to the App Folder, install NPM packages
$ cd app
$ npm install

# Run Frontend:
$ npm run serve

# Return to main folder, navigate to the backend folder and install NPM packages
$ cd ..
$ cd backend
$ npm install

# Run Backend:
$ npm run serve
```

<h3> Technologies used</h3>

- [NodeJS]
- [HTML5]
- [CSS3]
- [Express]
- [Mongoose]
- [MongoDB]
- [Vuetify]
- [Axios]

<h2> Data Model</h2>

<h3>Appointments</h3>

| Key          | Type       | Reference | Required | Validation |
| ------------ | ---------- | --------- | -------- | ---------- |
| \_id         | ObjectId   |           | False    |            |
| employees    | [ObjectId] | Employees | True     |            |
| start        | Date       |           | True     |            |
| end          | Date       |           | True     |            |
| intervention | String     |           | True     |            |
| piece        | Number     |           | False    |            |
| observations | String     |           | False    |            |
| medication   | String     |           | False    |            |
| finished     | Boolean    |           | True     |            |

<h3>Employees</h3>

| Key              | Type       | Reference      | Required | Validation     |
| ---------------- | ---------- | -------------- | -------- | -------------- |
| \_id             | ObjectId   |                | False    |                |
| dateOfEmployment | Date       |                | False    | Default        |
| employed         | Boolean    |                | True     | Default        |
| occupation       | String     |                | True     |                |
| firstName        | String     |                | True     | maxLength      |
| lastName         | String     |                | True     | maxLength      |
| dni              | String     |                | True     | Unique & RegEx |
| password         | String     |                | True     |                |
| contact          | Object     | Contact Object | True     |                |
| appointments     | [ObjectId] | Appointments   | False    |                |

<h3>Patients</h3>

| Key          | Type       | Reference  | Required | Validation     |
| ------------ | ---------- | ---------- | -------- | -------------- |
| \_id         | ObjectId   |            | False    |                |
| dateIn       | Date       |            | False    | Default        |
| active       | Boolean    |            | True     | Default        |
| firstName    | String     |            | True     | maxLength      |
| lastName     | String     |            | True     | maxLength      |
| dni          | String     |            | True     | Unique & RegEx |
| contact      | Object     |            | True     |                |
| bloodType    | String     |            | True     |                |
| Observations | String     |            | False    |                |
| treatments   | [ObjectId] | Treatments | False    |                |
| files        | [Object]   |            | False    |                |
| images       | [Object]   |            | False    |                |

<h3>Treatments</h3>

| Key          | Type       | Reference    | Required | Validation |
| ------------ | ---------- | ------------ | -------- | ---------- |
| \_id         | ObjectId   |              | False    |            |
| patient      | ObjectId   | Patients     | False    | Default    |
| description  | String     |              | True     |            |
| appointments | [ObjectId] | Appointments | True     | maxLength  |
| finished     | Boolean    |              | True     |            |
| files        | [ObjectId] | Patients     | False    |            |
| images       | [ObjectId] | Patients     | False    |            |

<h3>Contact Object Structure</h3>

| Key         | Type   | Required | Validation     |
| ----------- | ------ | -------- | -------------- |
| email       | String | True     | Unique & RexEx |
| mobilephone | Number | True     | RegEx          |
| telephone   | Number | False    | RegEx          |

<h3>Files/Image Object Structure</h3>

| Key  | Type   | Required | Validation |
| ---- | ------ | -------- | ---------- |
| date | Date   | True     |            |
| link | string | True     |            |

<br>

<h2>API Routes</h2>

<h3>Index</h3>

| Router             | URL           | Auth |
| ------------------ | ------------- | ---- |
| AuthRouter         | /auth         | True |
| AppointmentsRouter | /appointments | True |
| EmployeessRouter   | /employees    | True |
| PatientsRouter     | /patients     | True |

<h3>Appointments</h3>

| Method | URL           | Auth | Function                                   |
| ------ | ------------- | ---- | ------------------------------------------ |
| GET    | /appointments | True | Get some basic info about all appointments |

<h3>Authentication</h3>

| Method | URL         | Auth | Function |
| ------ | ----------- | ---- | -------- |
| POST   | /auth/login | True | Login    |

<h3>Employees></h3>

| Method | URL                    | Auth | Function                                      |
| ------ | ---------------------- | ---- | --------------------------------------------- |
| GET    | /employees             | True | Get some basic information from all employees |
| GET    | /employees/:employeeId | True | Get all information about a employee          |
| POST   | /employees             | True | Create a new employee                         |
| PUT    | /employees/:employeeId | True | Edit a employee                               |

<h3>Patients</h3>

| Method | URL                                 | Auth | Function                                                      |
| ------ | ----------------------------------- | ---- | ------------------------------------------------------------- |
| GET    | /patients/                          | True | Get some basic information from all patients                  |
| GET    | /patients/:patientId/documents      | True | Get all files and images from a patient                       |
| GET    | /patients/:patientId/treatments     | True | Get all treatments and appointments from a patient            |
| GET    | /patients/:patientId/treatmentslist | True | Get some basic information about appointments from a patients |
| GET    | /patients/:patientId                | True | Update a patient                                              |
| POST   | /patients/                          | True | Create a new patient                                          |
| PUT    | /patients/:patientId                | True | Update a patient                                              |

<h2>TEAM</h2>

- **Ana Angulo** - _Desarrolladora (Análisis, diseño y desarollo)_ - [anate82](https://github.com/anate82)
- **Hector Rodriguez Bravo** - [HacheRB](https://github.com/HacheRB)
- **Martin Daniel Schilkowske Robayna** - [msrroschi](https://github.com/msrroschi)

## License

MIT License
