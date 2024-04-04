import { NewPatientEntry, Gender, Entry, DiagnosisEntry, Discharge, EntryWithout, HospitalEntry, SickLeave, HealthCheckRating } from "./types";
const { v1: uuid } = require('uuid');

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



// 
// 
// 

const toNewEntry = (obj: unknown): Entry => {
  if (obj && typeof obj == 'object') {
    if ('type' in obj && 'description' in obj && 'date' in obj && 'specialist' in obj && 'diagnosisCodes' in obj) {
      const type = parseType(obj.type)
      const newEntry: EntryWithout = {
        id: uuid(),
        description: parseDesc(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
      }

      switch (type) {
        case 'Hospital':
          if ('discharge' in obj) {
            const hospitalEntry: HospitalEntry  = {
              ...newEntry,
              type,
              discharge: parseDischarge(obj.discharge)
            }
            return hospitalEntry
          }
          throw new Error('Err! Missing fields for hospital entry!')
        case 'OccupationalHealthcare':
          if ('employerName' in obj && 'sickLeave' in obj) {
            return {
              ...newEntry,
              type,
              employerName: parseEmployer(obj.employerName),
              sickLeave: parseSick(obj.sickLeave)
            }
          }
          throw new Error('Err! Missing fields for occupational healthcare entry!')
        case 'HealthCheck':
          if ('healthCheckRating' in obj) {
            return {
              ...newEntry,
              type,
              healthCheckRating: parseHealth(obj.healthCheckRating)
            }
          }
          throw new Error('Err! Missing fields for health check entry!')
        default:
          assertNever(type);
      }
    }
    throw new Error('Missing fields!')
  }
  throw new Error('Missing object!')
}

// const parseId = (id: unknown): string => {
//   if (!isString(id))
//     throw new Error('Incorrect or missing id');
//   return id;
// }

const parseDesc = (desc: unknown): string => {
  if (!isString(desc))
    throw new Error('Incorrect or missing description');
  return desc;
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isBirth(date))
    throw new Error('Incorrect or missing date');
  return date;
}

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist))
    throw new Error('Incorrect or missing specialist');
  return specialist;
}

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<DiagnosisEntry['code']> => {
  if (!diagnosisCodes || typeof diagnosisCodes !== 'object')
    return [] as Array<DiagnosisEntry['code']>

  return diagnosisCodes as Array<DiagnosisEntry['code']>;
}

const parseType = (param: unknown): 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' => {
  if (!isString(param) || param !== 'Hospital' && param !== 'OccupationalHealthcare' && param !== 'HealthCheck')
    throw new Error('Incorrect or missing entry type')
  return param;
}

const parseEmployer = (param: unknown): string => {
  if (!isString(param))
    throw new Error('Incorrect or missing employer name')
  return param;
} 

const parseDischarge = (param: unknown): Discharge => {
  if (!param || typeof param !== 'object' || !('date' in param) || !('criteria' in param)) 
    throw new Error('Incorrect or missing discharge')
  else if (!isString(param.date) || !isBirth(param.date))
    throw new Error('Incorrect or missing date in discharge')
  else if (!isString(param.criteria))
    throw new Error('Incorrect or missing criteria in discharge')
  return param as Discharge;
}

const parseSick = (param: unknown): SickLeave => {
  if (!param || typeof param !== 'object' || !('startDate' in param) || !('endDate' in param)) 
    throw new Error('Incorrect or missing discharge')
  else if (!isString(param.startDate) || !isBirth(param.startDate))
    throw new Error('Incorrect or missing start date')
  else if (!isString(param.endDate) || !isBirth(param.endDate))
    throw new Error('Incorrect or missing end date')
  return param as SickLeave;
}

const parseHealth = (param: unknown): HealthCheckRating => {
  if (!isNumber(param) || !isRating(param))  
    throw new Error('Incorrect or missing healthcheck rating')
  return param;
}

const isRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v.toString()).includes(rating.toString())
}

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number
}

const assertNever = (value: never): never => {
  throw new Error('not exhaustible' + JSON.stringify(value))
}

export default {
  toNewPatientEntry,
  toNewEntry
}