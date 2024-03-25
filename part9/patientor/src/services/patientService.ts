import { PatientEntryExcSsn, PatientEntry, NewPatientEntry } from "../types";
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid' 

const getPatientsExcSsn = (): PatientEntryExcSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation  
    })
  );
}

const addNewPatient = (newPatient: NewPatientEntry): PatientEntry => {
  const newEntry = {
    id: uuid(),
    ...newPatient
  }

  patientData.push(newEntry)

  return newEntry;
}

export default {
  getPatientsExcSsn,
  addNewPatient
};