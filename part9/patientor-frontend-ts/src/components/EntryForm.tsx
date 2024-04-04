import { MenuItem, TextField, FormControl, InputLabel, Button, Select } from "@mui/material";
import { useState } from "react";
import patientService from '../services/patients'
import Error from "./Error";
import axios from "axios";
import { Patient, Diagnosis } from "../types";
import DiagnosisForm from "./DiagnosisForm";

interface Props {
  id: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  patient: Patient;
  diagnoses: Diagnosis[]
}

const EntryForm = ({ id, setPatient, patient, diagnoses } : Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [rating, setRating] = useState('')
  const [error, setError] = useState('')
  const [type, setType] = useState('HealthCheck')
  const [discharge, setDischarge] = useState('')
  const [criteria, setCriteria] = useState('')
  const [employerName, setEmployer] = useState('') 
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if (type == 'HealthCheck') {
        const newPatientEntry = await patientService.createPatientEntry(id, {
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating: Number(rating),
            type
        })

        console.log(diagnosisCodes)

        //rerenders patient page
        setPatient({
          ...patient,
          entries: patient.entries.concat(newPatientEntry)
        })
      } else if (type == 'Hospital') {
        const newPatientEntry = await patientService.createPatientEntry(id, {
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: discharge,
            criteria
          },
          type
        })
        setPatient({
          ...patient,
          entries: patient.entries.concat(newPatientEntry)
        })
      } else if (type == 'OccupationalHealthcare') {
        const newPatientEntry = await patientService.createPatientEntry(id, {
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate,
            endDate
          },
          type
        })
        setPatient({
          ...patient,
          entries: patient.entries.concat(newPatientEntry)
        })
      }

      setDescription('')
      setDate('')
      setSpecialist('')
      setDiagnosisCodes([])
      setRating('')
      setCriteria('')
      setEmployer('')
      setDischarge('')
      setStart('')
      setEnd('')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        setTimeout(() => {
          setError('')
        }, 5000)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <Error error={error}/>

      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          onChange={({ target }) => setType(target.value as string)}
          value={type}
        >
          <MenuItem value='HealthCheck'>Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Health Care</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Description"
        name="description"
        margin="normal"
        onChange={({ target }) => setDescription(target.value)}
        value={description}
        fullWidth
      />
      <TextField
        // label="Date"
        name="date"
        type="date"
        onChange={({ target }) => setDate(target.value)}
        value={date}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Specialist"
        name="specialist"
        onChange={({ target }) => setSpecialist(target.value)}
        value={specialist}
        margin="normal"
        fullWidth
      />
      <div>
        <h3>Diagnosis Codes</h3>
        <DiagnosisForm diagnoses={diagnoses} setDiagnosisCodes={setDiagnosisCodes}/>
      </div>
      
      {type == 'HealthCheck' 
        ? 
        <FormControl fullWidth margin="normal">
           <InputLabel>Health Check Rating</InputLabel>
           <Select
             name="healthCheckRating"
             onChange={({ target }) => setRating(target.value as string)}
             value={rating}
           >
             <MenuItem value='0'>Healthy</MenuItem>
             <MenuItem value="1">Low Risk</MenuItem>
             <MenuItem value="2">High Risk</MenuItem>
             <MenuItem value='3'>Critical Risk</MenuItem>
           </Select>
         </FormControl>
         : type == 'Hospital'
         ?
         <div>
            <TextField
                label='Discharge date'
                name="discharge"
                type="date"
                onChange={({ target }) => setDischarge(target.value)}
                value={discharge}
                margin="normal"
                fullWidth
            />
            <TextField
                label='Criteria'
                name="criteria"
                type="text"
                onChange={({ target }) => setCriteria(target.value)}
                value={criteria}
                margin="normal"
                fullWidth
            />
          </div>
         : //for type 'OccupationalHealthcare'
         <div>
            <TextField
              label='Employer Name'
              name="employerName"
              type="text"
              onChange={({ target }) => setEmployer(target.value)}
              value={employerName}
              margin="normal"
              fullWidth
            />
            <TextField
                label='Start Date'
                name="startDate"
                type="date"
                onChange={({ target }) => setStart(target.value)}
                value={startDate}
                margin="normal"
                fullWidth
            />
            <TextField
                label='End Date'
                name="endDate"
                type="date"
                onChange={({ target }) => setEnd(target.value)}
                value={endDate}
                margin="normal"
                fullWidth
            />
         </div>

      }

   
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  )
}

export default EntryForm;