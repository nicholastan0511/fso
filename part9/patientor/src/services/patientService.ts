import { PatientEntryExcSsn, PatientEntry, NewPatientEntry, Entry } from "../types";
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid' 

const getPatientsExcSsn = (): PatientEntryExcSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
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
  if (patient && patient.entries) {
    return {
      ...patient,
    };
  } else {
    throw new Error ('malformatted id');
  }
}

const addNewDiagnosis = (id: string, obj: Entry): Entry => {
  const patient = patientData.find(patient => patient.id === id);
  patient?.entries.push(obj);
  return obj;
}

export default {
  getPatientsExcSsn,
  addNewPatient,
  fetchOnePatient,
  addNewDiagnosis
};