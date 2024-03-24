import express from 'express';
import cors from 'cors'
const app = express();

app.use(cors())

app.get('/api/ping', (_req, res) => {
  res.send('pong');
  console.log('im called');
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server runnning at port ${PORT}`)
})


