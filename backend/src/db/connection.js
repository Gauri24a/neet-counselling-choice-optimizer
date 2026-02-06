/**
 * PostgreSQL pool (PRD §6.1). Used by models.
 */
const { Pool } = require('pg');
const { DATABASE_URL } = require('../config/env');

const pool = DATABASE_URL
  ? new Pool({ connectionString: DATABASE_URL })
  : null;

module.exports = { pool };
