const db = require('./database.js');
const bcrypt = require('bcryptjs');

const Controller = {};

//HANDLES GET REQUESTS: BY LATEST DATE
Controller.getDaily = async (req, res, next) => {
  const { user_id } = req.params;
  //Query string will obtain all the notes where the day is the present day
  const qString = "SELECT * FROM notes WHERE user_id = $1 AND created_at >= NOW() - '1 DAY'::INTERVAL"
  try {
    const response = await db.query(qString, [user_id]);
    res.locals.dailyNotes = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.getDaily',
      message: { err: 'Controller.getDaily: Error' }
    });
  }
};
//HANDLES GET REQUESTS: BY CATEGORY
Controller.getCategory = async (req, res, next) => {
  const { user_id, category_id } = req.query;
  const qString = "SELECT * FROM notes WHERE user_id = $1 AND category_id = $2";
  try {
    const response = await db.query(qString, [user_id, category_id]);
    console.log(response.rows);
    res.locals.notesByCategory = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.getCategory',
      message: { err: 'Controller.getCategory: Error' }
    });
  }
};
//HANDLES GET REQUESTS: ALL NOTES
Controller.getAll = async (req, res, next) => {
  const { user_id } = req.query;
  const qString = "Select * FROM notes WHERE user_id = $1";
  try {
    const response = await db.query(qString, [user_id]);
    console.log('db response', response.rows);
    res.locals.allNotes = response.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Error in Controller.getAll',
      message: { err: 'Controller.getAll: Error' }
    });
  }
};
// HANDLES POST REQUESTS
Controller.addNote = async (req, res, next) => {
  const { user_id, category_id, contents } = req.body;
  console.log(req.body);
  const qString = "INSERT INTO notes (user_id, category_id, contents) VALUES($1, $2, $3) RETURNING *"
  try {
    const response = await db.query(qString, [user_id, category_id, contents]);
    console.log('new note:', response.rows);
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.addNote',
      message: { err: 'Controller.addNote: Error'},
    });
  }
};
// HANDLES PUT REQUESTS
Controller.updateNote = async (req, res, next) => {
  const { user_id, note_id, contents } = req.body;
  const qString = "UPDATE notes SET contents=$3 WHERE user_id=$1 AND note_id=$2 RETURNING *";
  try {
    const response = await db.query(qString, [user_id, note_id, contents]);
    if (response) console.log('updated note:', response.rows)
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.updateNote',
      message: { err: 'Controller.updateNote: Error'},
    });
  }
};
// HANDLES DELETE REQUESTS
Controller.deleteNote = async (req, res, next) => {
  const { user_id, note_id } = req.body;
  const qString = "DELETE FROM notes WHERE user_id = $1 AND note_id = $2 RETURNING *"
  try {
    const response = await db.query(qString, [user_id, note_id]);
    if (response) console.log('deleted note:', response.rows);
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.deleteNote',
      message: { err: 'Controller.deleteNote: Error'},
    });
  }
};

Controller.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log('req.body:', req.body)
  const qString = "SELECT * FROM users WHERE username = $1";
  try {
    const response = await db.query(qString, [username]);
    // const newHash = await bcrypt.hash(password, 10);
    console.log(response);
    const user = response.rows[0];
    console.log(user);
    const hash = response.rows[0].password_hash;
    console.log(hash);
    const eval = await bcrypt.compare(password, hash);
    if (user && eval) {
      res.locals.verified = true;
      res.locals.message = 'User verified!'
      res.locals.user = user;
      return next();
    } else {
      res.locals.verified = false;
      res.locals.message = 'Incorrect password. Please try again!';
    }
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in login',
      message: {err: 'Controller.verifyUser: Error'}
    });
  }
};

Controller.registerUser = async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  console.log('request body:', req.body);
  const qString = "INSERT INTO users(first_name, last_name, email, username, password_hash) VALUES($1, $2, $3, $4, $5) RETURNING *"
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log('hashed pw:', hash)
    const response = await db.query(qString, [firstName, lastName, email, username, hash]);
    const user = response.rows[0];
    console.log('new user:', user);
    if (user) {
      res.locals.verified = true;
      res.locals.message = 'User registered!';
      res.locals.user = user;
    } else {
      res.status(401);
      res.locals.verified = false;
      res.locals.message = 'Invalid username or password';
    } 
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in sign up',
      message: {err: 'Controller.registerUser: Error'}
    
    });
  }
};

module.exports = Controller;