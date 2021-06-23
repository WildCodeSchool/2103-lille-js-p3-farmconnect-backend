const express = require('express');
const cors = require('cors');

const app = express();
const usersRoutes = require('./routes/users');
const appsRoutes = require('./routes/apps');
const contactRoutes = require('./routes/contactform');

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);
app.use('/apps', appsRoutes);
app.use('/contact', contactRoutes);

app.listen(5050, () => {
  console.log('API available on http://localhost:5050 !');
});
