const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/protected', passport.authenticate('jwt'), (req, res) => {
  const msg = `If you can see this, you should be logged in, ${req.user.firstname}`;
  res.status(200).send(msg);
});

module.exports = router;
