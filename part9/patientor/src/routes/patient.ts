import express from 'express'
import patientService from '../services/patientService'
import utils from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsExcSsn())
})

router.get('/:id', (req, res) => {
  const id  = req.params.id;
  try {
    const patient = patientService.fetchOnePatient(id);
    res.send(patient);
  } catch (error: unknown) {
    let errMes = 'Err! '
    if (error instanceof Error) {
      errMes += error.message;
    }
    res.status(400).send(errMes);
  }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    //parse the fields within the request body
    const newEntry = utils.toNewPatientEntry(req.body)
    //append the data
    const addedEntry = patientService.addNewPatient(newEntry);
    res.json(addedEntry)
  } catch(error: unknown) {
    let errMes = 'Error! '
    if (error instanceof Error) {
      errMes += error.message
    }

    res.status(400).send(errMes);
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = utils.toNewEntry(req.body)
    const addedEntry = patientService.addNewDiagnosis(id, newEntry)
    res.send(addedEntry)
  } catch (error) {
    let errMes = 'Err! ';
    if (error instanceof Error) {
      errMes += error.message;
    }
    res.status(400).send(errMes);
  }
})

export default router;