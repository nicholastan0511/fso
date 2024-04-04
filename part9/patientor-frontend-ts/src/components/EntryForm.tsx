import { MenuItem, TextField, FormControl, InputLabel, Button, Select } from "@mui/material";
import { useState } from "react";
import patientService from '../services/patients'
import Error from "./Error";
import axios from "axios";
import { Patient } from "../types";

interface Props {
  id: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  patient: Patient;
}

const EntryForm = ({ id, setPatient, patient } : Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [rating, setRating] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
        const newPatientEntry = await patientService.createPatientEntry(id, {
            description,
            date,
            specialist,
            diagnosisCodes: [diagnosisCodes],
            healthCheckRating: Number(rating),
            type: 'HealthCheck'
        })
        setDescription('')
        setDate('')
        setSpecialist('')
        setDiagnosisCodes('')
        setRating('')

        //rerenders patient page
        setPatient({
          ...patient,
          entries: patient.entries.concat(newPatientEntry)
        })
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
      <TextField
        label="Diagnosis Codes"
        name="diagnosisCodes"
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        value={diagnosisCodes}
        margin="normal"
        fullWidth
      />
      
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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  )
}

export default EntryForm;