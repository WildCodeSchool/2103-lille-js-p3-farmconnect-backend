const express = require('express');

const router = express.Router();
const { db } = require('../../conf');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT id, name, description, logo, banner, isFree, app_web, app_android, app_ios, provider_app FROM applications';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
