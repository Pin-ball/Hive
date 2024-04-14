require('dotenv').config();
const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    user :process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset: 'utf8mb4'
  }
});

module.exports = db;
