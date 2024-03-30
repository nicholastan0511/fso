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
    ...newPatient,
    entries: []
  }

  patientData.push(newEntry)

  return newEntry;
}

const fetchOnePatient = (id: string): PatientEntry => {
  const patient = patientData.find(patient => patient.id == id);
  if (patient && !patient.entries) {
    return {
      ...patient,
      entries: []
    };
  } else {
    throw new Error ('malformatted id');
  }
}

export default {
  getPatientsExcSsn,
  addNewPatient,
  fetchOnePatient
};