const express = require('express');
const cors = require('cors');
const { backPort } = require('./conf');

const app = express();
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);

app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/misc'));

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`API root available at: http://localhost:${backPort}/`);
});
