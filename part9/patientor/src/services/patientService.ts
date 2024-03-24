import { PatientEntryExcSsn } from "../types";
import patientData from '../../data/patients';

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

export default {
  getPatientsExcSsn
};