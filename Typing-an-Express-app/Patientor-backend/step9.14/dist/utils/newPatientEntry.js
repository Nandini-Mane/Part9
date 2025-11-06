"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const zod_1 = require("zod");
// Define schema using Zod
const newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date("Invalid date format (YYYY-MM-DD expected)"),
    ssn: zod_1.z.string(),
    gender: zod_1.z.enum(["male", "female", "other"]),
    occupation: zod_1.z.string(),
});
const toNewPatientEntry = (object) => {
    return newPatientSchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
