const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT 
    applications.id, name, description, logo, banner, isFree, app_web, app_android, app_ios, provider_app
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
