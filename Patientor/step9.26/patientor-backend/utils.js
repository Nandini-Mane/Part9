"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
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
exports.toNewPatientEntry = toNewPatientEntry;
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (typeof healthCheckRating !== 'number' || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDischarge = (object) => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
        throw new Error('Incorrect or missing discharge data');
    }
    return {
        date: parseDate(object.date),
        criteria: parseDescription(object.criteria),
    };
};
const parseSickLeave = (object) => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
        throw new Error('Incorrect or missing sick leave data');
    }
    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
    };
};
const toNewEntry = (object) => {
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
            return Object.assign(Object.assign({}, baseEntry), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
        case 'OccupationalHealthcare':
            if (!('employerName' in object)) {
                throw new Error('Missing employerName for OccupationalHealthcare entry');
            }
            const occupationalEntry = Object.assign(Object.assign({}, baseEntry), { type: 'OccupationalHealthcare', employerName: parseName(object.employerName) });
            if ('sickLeave' in object) {
                return Object.assign(Object.assign({}, occupationalEntry), { sickLeave: parseSickLeave(object.sickLeave) });
            }
            return occupationalEntry;
        case 'HealthCheck':
            if (!('healthCheckRating' in object)) {
                throw new Error('Missing healthCheckRating for HealthCheck entry');
            }
            return Object.assign(Object.assign({}, baseEntry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        default:
            throw new Error('Incorrect entry type: ' + object.type);
    }
};
exports.toNewEntry = toNewEntry;
