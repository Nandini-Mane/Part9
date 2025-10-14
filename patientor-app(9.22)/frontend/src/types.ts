export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
  ssn?: string;
  entries?: any[];
  // Mocked properties to match the image
  age?: number;
  phone?: string;
  email?: string;
  address?: string;
  diagnosis?: string;
  treatment?: string;
  lastVisit?: string;
}