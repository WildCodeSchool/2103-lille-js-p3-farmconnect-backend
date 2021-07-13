const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/:idApp/:idUser', async (req, res) => {
  const { idApp, idUser } = req.params;
  const sql = `
  SELECT 
    applications_id 
  FROM
    applications_has_users
  WHERE (applications_id=? AND users_id=?)
  `;
  const sqlValues = [idApp, idUser];
  const [[results]] = await db.query(sql, sqlValues);
  res.json(results);
});

router.delete('/:idApp/:idUser', async (req, res) => {
  const { idApp, idUser } = req.params;
  const sql = `
  DELETE FROM
    applications_has_users
  WHERE (applications_id=? AND users_id=?)
  `;
  const sqlValues = [idApp, idUser];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT 
    applications.id, name, description, logo, banner, isFree, appWeb, appAndroid, appIos, providerApp
  FROM 
    applications_has_users
  JOIN 
    users 
  ON 
    users.id=applications_has_users.users_id
  JOIN 
    applications 
  ON 
    applications.id=applications_has_users.applications_id
  WHERE 
    users_id=?`;
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

router.post('/', async (req, res) => {
  const { usersId, applicationsId } = req.body;

  const sql = `
  INSERT INTO 
    applications_has_users (users_id, applications_id) 
  VALUES(?,?)`;
  const sqlValues = [usersId, applicationsId];

  try {
    const [results] = await db.query(sql, sqlValues);
    // TODO
    return res.status(201).json(results);
  } catch (err) {
    return res.status(500).send('Generic error message');
  }
});

router.delete('/', async (req, res) => {
  const { usersId, appId } = req.body;
  const sql = `
  DELETE FROM 
    applications_has_users 
  WHERE 
    users_id=? AND applications_id=?`;
  const sqlValues = [usersId, appId];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
