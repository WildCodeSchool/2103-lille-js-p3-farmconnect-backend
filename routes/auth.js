const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db, jwtrounds, jwtsecret } = require('../conf');
require('../passport-strategies');

router.post('/admin', passport.authenticate('local'), (req, res) => {
  if (req.user.isStaff) {
    const token = jwt.sign(req.user, jwtsecret);
    res.status(200).json({ id: req.user.id, token });
  } else {
    res.status(400).send();
  }
});

router.post('/signup', async (req, res) => {
  try {
    const formData = req.body;
    formData.password = bcrypt.hashSync(formData.password, jwtrounds);
    const [sqlRes] = await db.query(`INSERT INTO users SET ?`, formData);
    delete formData.password;
    formData.id = sqlRes.insertId;
    const token = jwt.sign(formData, jwtsecret);
    res.status(201).json(token);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign(req.user, jwtsecret);
  res.status(200).json({ id: req.user.id, token });
});

module.exports = router;
