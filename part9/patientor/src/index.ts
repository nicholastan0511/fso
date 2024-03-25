import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnosis';
import patientRouter from './routes/patient';

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
  console.log('im called');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server runnning at port ${PORT}`)
});


