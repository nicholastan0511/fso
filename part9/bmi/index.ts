import express = require('express');
import bmiCalc from './bmiCalculator';
import { calculateExercises } from './exerciseCalc';

const app = express();
const unknownEndpoint = (_req: any, res: any) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.json())

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  let bmi: string;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    bmi = bmiCalc(Number(height), Number(weight));
    res.json({
      bmi,
      weight,
      height
    });
  } else {
    res.status(404).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const { daily, target } = req.body

  if (!daily || !target)
    res.status(404).send({ error: 'parameters missing' })
  else if (!(daily instanceof Array) || isNaN(Number(target)) || !daily.every(e => typeof e == 'number'))
    res.status(404).send({ error: 'malformatted parameters' })
  else 
    res.json(calculateExercises(daily, target))
})

app.use(unknownEndpoint);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});


