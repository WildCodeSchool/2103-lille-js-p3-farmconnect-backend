const express = require('express');
const cors = require('cors');

const app = express();
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);

app.listen(5050, () => {
  console.log('API available on http://localhost:5050 !');
});
