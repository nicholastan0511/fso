import { NewPatientEntry, Gender } from "./types";

const toNewPatientEntry = (obj: unknown): NewPatientEntry => {
  if (!obj || typeof obj !== 'object')
    throw new Error('Incorrect or missing data');

  if ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj) {
    const newEntry: NewPatientEntry = {
      name: parseString(obj.name),
      dateOfBirth: parseBirth(obj.dateOfBirth),
      ssn: parseString(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation)
    };

    return newEntry;
  }

  throw new Error('Incorrect or missing fields');
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const parseString = (param: unknown): string => {
  if (!isString(param)) 
    throw new Error('Incorrect or missing param');
  return param;
} 

const parseBirth = (birth: unknown): string => {
  if (!isString(birth) || !isBirth(birth)) 
    throw new Error('Incorrect or missing birth');
  return birth;
}

const isBirth = (birth: string): Boolean => {
  return Boolean(Date.parse(birth))
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('Incorrect or missing gender');

  return gender;
}

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender)
}

export default toNewPatientEntry