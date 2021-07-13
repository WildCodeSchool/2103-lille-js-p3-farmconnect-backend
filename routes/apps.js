const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql =
    'SELECT id, name, description, logo, banner, isFree, appWeb, appAndroid, appIos, providerApp FROM applications';
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT name, description, logo, banner, isFree, appWeb, appAndroid, appIos, providerApp FROM applications WHERE id=?';
  const sqlValues = [id];
  const [[results]] = await db.query(sql, sqlValues);
  res.json(results);
});

router.post('/', async (req, res) => {
  const {
    name,
    description,
    logo,
    banner,
    isFree,
    appweb,
    appandroid,
    appios,
    providerapp,
  } = req.body;
  const sql =
    'INSERT INTO applications (name, description, logo, banner, isFree, appWeb, appAndroid, appIos, providerApp) VALUES(?,?,?,?,?,?,?,?,?)';
  const sqlValues = [
    name,
    description,
    logo,
    banner,
    isFree,
    appweb,
    appandroid,
    appios,
    providerapp,
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
  const {
    name,
    description,
    logo,
    banner,
    isFree,
    appWeb,
    appAndroid,
    appIos,
    providerApp,
  } = req.body;
  const sql = `
  UPDATE 
    applications 
  SET 
    name=?, description=?, logo=?, banner=?, isFree=?, appWeb=?, appAndroid=?, appIos=?, providerApp=? 
  WHERE 
    id=?`;
  const sqlValues = [
    name,
    description,
    logo,
    banner,
    isFree,
    appWeb,
    appAndroid,
    appIos,
    providerApp,
    id,
  ];

  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).send('Generic error message');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM applications WHERE id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
