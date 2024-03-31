import { Entry } from "../types"
import { Box } from "@mui/material"
import { Diagnosis } from "../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses } : Props ) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box 
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          padding: 2,
          borderRadius: 4,
          boxShadow: 3,
        }}
        >
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>diagnosed by {entry.specialist}</p>
            <p>discharged on {entry.discharge.date}</p>
            <ul>
              {entry.diagnosisCodes?.map(diagnosis => { 
                const fetchedDiagnosis = diagnoses.find(data => data.code == diagnosis);
                if (fetchedDiagnosis)
                return (
                  <li key={diagnosis}>{diagnosis} {fetchedDiagnosis.name}</li>
                )
              })}
            </ul>
        </Box>
      )
    case "HealthCheck":
      return (
        <Box 
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          padding: 2,
          borderRadius: 4,
          boxShadow: 3,
        }}
        >
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>Health Check Rating: {entry.healthCheckRating}</p>
            <p>diagnosed by {entry.specialist}</p>
            <ul>
              {entry.diagnosisCodes?.map(diagnosis => { 
                const fetchedDiagnosis = diagnoses.find(data => data.code == diagnosis);
                if (fetchedDiagnosis)
                return (
                  <li key={diagnosis}>{diagnosis} {fetchedDiagnosis.name}</li>
                )
              })}
            </ul>
        </Box>
      )
    case "OccupationalHealthcare":
      return (
        <Box 
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          padding: 2,
          borderRadius: 4,
          boxShadow: 3,
        }}
        >
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>Sick leave: {entry.sickLeave?.startDate} ~ {entry.sickLeave?.endDate}</p>
            <p>diagnosed by {entry.specialist}</p>
            <ul>
              {entry.diagnosisCodes?.map(diagnosis => { 
                const fetchedDiagnosis = diagnoses.find(data => data.code == diagnosis);
                if (fetchedDiagnosis)
                return (
                  <li key={diagnosis}>{diagnosis} {fetchedDiagnosis.name}</li>
                )
              })}
            </ul>
        </Box>
      )
    default:
      assertNever(entry);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails