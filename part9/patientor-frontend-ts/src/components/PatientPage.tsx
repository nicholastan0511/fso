import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from '../services/patients'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Diagnosis } from "../types";
import EntryDetails from "./Entry";
import EntryForm from "./EntryForm";

const PatientPage = ({ diagnoses } : { diagnoses: Diagnosis[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>()

  useEffect(() => {
    const fetchOnePatient = async () => {
      if (typeof id === 'string') {
        const patient = await patientService.getOnePatient(id);
        setPatient(patient);
      }
    }
    fetchOnePatient();
  }, []);

  if (!patient) {
    return <div>fetching....</div>
  }

  return (
    <div>
      <h1>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h1>
      <div>Ssn: {patient.ssn}</div>
      <div>Birth: {patient.dateOfBirth}</div>
      <div>
        <h3>{patient.entries[0] ? 'Entries' : null}</h3>
        {patient.entries.map(entry => (
          <>
            <EntryDetails diagnoses={diagnoses} entry={entry} key={entry.id}/>
          </>
        ))}
      </div>
      <EntryForm id={patient.id} setPatient={setPatient} patient={patient}/>
      
      
    </div>
  )
}

export default PatientPage;