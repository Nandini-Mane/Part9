import patients from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
    const newPatientWithId = {
        id: uuidv4(),
        ...newPatient,
        entries: []
    };
    patients.push(newPatientWithId);
    return newPatientWithId;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
  const entryWithId = {
    ...newEntry,
    id: uuidv4()
  };
  patient.entries.push(entryWithId);
  return entryWithId;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};
