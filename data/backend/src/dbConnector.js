const { Client } = require('pg');

const getClient = () => {
  return new Client({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });
};

module.exports = { getClient };
