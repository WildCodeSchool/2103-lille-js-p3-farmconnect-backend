const express = require('express');
const cors = require('cors');
const { db } = require('./conf');

const app = express();
app.use(cors());

app.get('/user', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM exploitant');
  res.status(200).json(rows);
});

app.get('/application', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM application');
  res.status(200).json(rows);
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(5050, () => {
  console.log('Farm Connect API now available on http://localhost:5050 !');
});
