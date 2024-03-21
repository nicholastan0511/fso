import express = require('express');
import bmiCalc from './bmiCalculator';

const app = express();
const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  let bmi: string;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    bmi = bmiCalc(Number(height), Number(weight))
    res.json({
      bmi,
      weight,
      height
    })
  } else {
    res.status(404).send({ error: 'malformatted parameters' })
  }
})

app.use(unknownEndpoint)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})


