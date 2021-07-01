const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort } = require('./conf');

const app = express();
const usersRoutes = require('./routes/users');
const appsRoutes = require('./routes/apps');

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use('/users', usersRoutes);
app.use('/apps', appsRoutes);

app.use('/auth', require('./routes/auth'));

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`API root available at: http://localhost:${backPort}/`);
});
