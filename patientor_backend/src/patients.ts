import { Patient } from './types';

const patients: Patient[] = [
    {
        id: "d2773336-f723-11e9-8f0b-362b9e155667",
        name: "John McClane",
        dateOfBirth: "1986-07-09",
        gender: "male",
        occupation: "New york city cop",
        ssn: "230386-356J"
    },
    {
        id: "d2773598-f723-11e9-8f0b-362b9e155667",
        name: "Martin Riggs",
        dateOfBirth: "1989-01-10",
        gender: "male",
        occupation: "Cop",
        ssn: "100189-353J"
    },
    {
        id: "d27736ec-f723-11e9-8f0b-362b9e155667",
        name: "Hans Gruber",
        dateOfBirth: "1970-04-25",
        gender: "male",
        occupation: "Technician",
        ssn: "250470-432J"
    },
    {
        id: "d2773822-f723-11e9-8f0b-362b9e155667",
        name: "Dana Scully",
        dateOfBirth: "1988-01-05",
        gender: "female",
        occupation: "Forensic Pathologist",
        ssn: "050188-431J"
    },
];

export default patients;