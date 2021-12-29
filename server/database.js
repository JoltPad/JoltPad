const { Pool } = require('pg');
require('dotenv').config();

// const PG_URI = 'postgres://lcezaxxe:ijHq5ca7xkNSxarV5w7fzM7o8OyzheZZ@castor.db.elephantsql.com/lcezaxxe';
const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('connected to database and input query', text);
    return pool.query(text, params, callback);
  }
};
