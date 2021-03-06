const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort, frontendUrl, adminUrl } = require('./conf');

const app = express();
const usersRoutes = require('./routes/users');
const appsRoutes = require('./routes/apps');
const contactRoutes = require('./routes/contactform');
const appFavRoutes = require('./routes/appfav');
const exploitRoutes = require('./routes/exploit');

app.use(express.json());
app.use(passport.initialize());
app.use(cors({ credentials: true, origin: { frontendUrl, adminUrl } }));
app.use('/users', usersRoutes);
app.use('/apps', appsRoutes);
app.use('/contact', contactRoutes);
app.use('/appfav', appFavRoutes);
app.use('/exploit', exploitRoutes);

app.use('/auth', require('./routes/auth'));

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`API root available at: http://localhost:${backPort}/`);
});
