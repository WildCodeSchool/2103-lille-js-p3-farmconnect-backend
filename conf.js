const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_SCHEMA,
  DB_PASSWORD,
  BACK_PORT,
  JWT_SALTROUNDS,
  JWT_SECRET,
  FRONTEND_URL,
  ADMIN_URL,
} = process.env;

const db = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
});

module.exports = {
  db,
  backPort: BACK_PORT,
  jwtrounds: parseInt(JWT_SALTROUNDS, 10),
  jwtsecret: JWT_SECRET,
  frontendUrl: FRONTEND_URL,
  adminUrl: ADMIN_URL,
};
