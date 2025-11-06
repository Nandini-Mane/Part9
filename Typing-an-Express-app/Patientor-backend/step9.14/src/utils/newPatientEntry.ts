import { z } from "zod";

// Define schema using Zod
const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date("Invalid date format (YYYY-MM-DD expected)"),
  ssn: z.string(),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string(),
});

// Export type and parser
export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};
