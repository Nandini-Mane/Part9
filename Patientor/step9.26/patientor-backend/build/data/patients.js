"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/types");
const patients = [
    {
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        dateOfBirth: '1986-07-09',
        ssn: '090786-122X',
        gender: types_1.Gender.Male,
        occupation: 'New york city cop',
        entries: [
            {
                id: 'd811e462-795b-4290-b542-a7d3269496e7',
                date: '2015-01-15',
                type: 'Hospital',
                specialist: 'Md House',
                diagnosisCodes: ['S62.5'],
                description: 'Healing time around 2 weeks. Ibuprofen and rest is recommended.',
                discharge: {
                    date: '2015-01-20',
                    criteria: 'Thumb has healed.',
                },
            },
        ],
    },
    {
        id: 'd2773336-f723-11e9-8f0b-362b9e155609',
        name: 'John Doe',
        dateOfBirth: '1995-01-01',
        ssn: '010195-788X',
        gender: types_1.Gender.Male,
        occupation: 'Web Developer',
        entries: [
            {
                id: '2064183d-a7a2-463d-aced-8b7c3d10034a',
                date: '2019-04-20',
                specialist: 'Dr. Thureos',
                type: 'OccupationalHealthcare',
                employerName: 'Digitalents',
                diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
                description: 'Patient has a lot of stress due to his work. He is a web developer and has to meet deadlines. He has a history of back pain and has been diagnosed with other specified intervertebral disc displacement.',
                sickLeave: {
                    startDate: '2019-04-20',
                    endDate: '2019-05-20',
                },
            },
        ],
    },
    {
        id: 'd2773336-f723-11e9-8f0b-362b9e155610',
        name: 'Jane Doe',
        dateOfBirth: '1990-05-15',
        ssn: '150590-444X',
        gender: types_1.Gender.Female,
        occupation: 'Data Analyst',
        entries: [],
    },
];
exports.default = patients;
