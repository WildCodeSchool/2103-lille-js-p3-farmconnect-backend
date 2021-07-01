const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql =
    'SELECT id, firstname, lastname, zipcode, city, country, email, mobile FROM users where email=?';
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT email, password FROM users WHERE id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

router.post('/', async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    zipcode,
    country,
    mobile,
    city,
  } = req.body;

  const sql =
    'INSERT INTO users (email, password, firstname, lastname, zipcode, country, mobile, city) VALUES(?,?,?,?,?,?,?,?)';
  const sqlValues = [
    email,
    password,
    firstname,
    lastname,
    zipcode,
    country,
    mobile,
    city,
  ];
  try {
    const [results] = await db.query(sql, sqlValues);
    return res.status(201).json(results);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      // 409: Conflict
      return res.status(409).send('This user already exists!');
    }
    if (err.code === 'ER_BAD_NULL_ERROR') {
      // 422 : Unprocessable Entity
      return res.status(422).send('Please fill all fields!');
    }
    return res.status(500).send('Generic error message');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const sql = 'UPDATE users SET email=?, password=? WHERE id=?';
  const sqlValues = [email, password, id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).send('Generic error message');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
