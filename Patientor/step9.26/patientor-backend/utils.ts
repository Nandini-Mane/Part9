import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge, SickLeave, Diagnosis } from '.C:\Users\ravin\Downloads\Part9\patientor-backend(9.27)\build';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (typeof healthCheckRating !== 'number' || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    throw new Error('Incorrect or missing discharge data');
  }
  return {
    date: parseDate(object.date),
    criteria: parseDescription(object.criteria),
  };
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect or missing sick leave data');
  }
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing data: a `type` property is required');
  }

  const baseEntry = {
    description: 'description' in object ? parseDescription(object.description) : '',
    date: 'date' in object ? parseDate(object.date) : '',
    specialist: 'specialist' in object ? parseSpecialist(object.specialist) : '',
    diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined
  };

  switch (object.type) {
    case 'Hospital':
      if (!('discharge' in object)) {
        throw new Error('Missing discharge data for Hospital entry');
      }
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    case 'OccupationalHealthcare':
      if (!('employerName' in object)) {
        throw new Error('Missing employerName for OccupationalHealthcare entry');
      }
      const occupationalEntry = {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseName(object.employerName),
      };
      if ('sickLeave' in object) {
        return {
          ...occupationalEntry,
          sickLeave: parseSickLeave(object.sickLeave),
        };
      }
      return occupationalEntry;
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('Missing healthCheckRating for HealthCheck entry');
      }
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    default:
      throw new Error('Incorrect entry type: ' + object.type);
  }
};
