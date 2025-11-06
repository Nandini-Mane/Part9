import { Patient, Gender} from '../src/types';

export const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    occupation: "New York City cop",
    gender: Gender.Male,
    ssn: "090786-122X",
    dateOfBirth: "1986-07-09",
    entries: [
      {
        id: "2206757b-7b56-4b68-8097-f58c707d8964",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "MD House",
        description:
          "Healing time approx. 2 weeks. Patient doesn’t remember how he got the injury. Discharged 2015-01-16: Thumb has healed.",
        diagnosisCodes: ["Z57.1", "N30.0"],
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed.",
        },
      },
      {
        id: "3e5d0d62-7b53-4b68-8097-f58c707d8964",
        date: "2023-01-04",
        type: "HealthCheck",
        specialist: "Dr Alban",
        description: "good",
        healthCheckRating: 1,
        diagnosisCodes: ["Z57.1", "N30.0"],
      },
    ],
  },
  {
    id: "f7d264f3-c5c8-4796-980b-f35c59312c17",
    name: "Sarah Connor",
    occupation: "Waitress",
    gender: Gender.Female,
    ssn: "120380-543K",
    dateOfBirth: "1980-03-12",
    entries: [
      {
        id: "a3e571c4-7b61-4c68-8097-f58c707d8964",
        date: "2022-11-15",
        type: "Hospital",
        specialist: "Dr Grey",
        description: "Patient admitted for appendectomy. Healing time ~3 weeks.",
        diagnosisCodes: ["I10", "E11.9"],
        discharge: {
          date: "2022-12-05",
          criteria: "Wound healed properly, no complications.",
        },
      },
      {
        id: "b4f8d975-7b62-4c68-8097-f58c707d8964",
        date: "2023-02-10",
        type: "HealthCheck",
        specialist: "Dr Grey",
        description: "recovering from surgery",
        healthCheckRating: 2,
        diagnosisCodes: ["I10", "E11.9"],
      },
    ],
  },
  {
    id: "e4f8d975-7b62-4c68-8097-f58c707d8964",
    name: "Tony Stark",
    occupation: "Engineer",
    gender: Gender.Male,
    ssn: "150575-789M",
    dateOfBirth: "1975-05-15",
    entries: [
      {
        id: "c5d1e2a5-7b63-4c68-8097-f58c707d8964",
        date: "2023-05-10",
        type: "Hospital",
        specialist: "Dr Strange",
        description: "Hospitalized due to cardiac event. Surgery performed.",
        diagnosisCodes: ["I20.0", "Z95.5"],
        discharge: {
          date: "2023-05-20",
          criteria: "Discharged with pacemaker installed.",
        },
      },
      {
        id: "d6e2a5d1-7b64-4c68-8097-f58c707d8964",
        date: "2023-05-22",
        type: "HealthCheck",
        specialist: "Dr Strange",
        description: "chest pain, improved with treatment",
        healthCheckRating: 0,
        diagnosisCodes: ["I20.0", "Z95.5"],
      },
    ],
  },
];
