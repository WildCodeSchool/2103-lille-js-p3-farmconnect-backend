const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM applications';
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM applications WHERE id=?';
  const sqlValues = [id];
  const [[results]] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
