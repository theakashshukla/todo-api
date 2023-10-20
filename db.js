const initOptions = {
  /* Initialization Options */
};

const pgp = require('pg-promise')(initOptions);

// Load environment variables from .env
require('dotenv').config();

// Define the database connection using the DATABASE_URL environment variable
const db = pgp(process.env.DATABASE_URL);

module.exports = { db };
