const { Pool } = require('pg');

const PG_URI = 'postgres://lcezaxxe:ijHq5ca7xkNSxarV5w7fzM7o8OyzheZZ@castor.db.elephantsql.com/lcezaxxe';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('connected to database and put in query', text);
    return pool.query(text, params, callback);
  }
};
