const db = require('./database.js');
const bcrypt = require('bcryptjs');

const Controller = {};

//HANDLES GET REQUESTS: BY LATEST DATE
Controller.getDaily = async (req, res, next) => {
  const { user_id } = req.query;
  //Query string will obtain all the notes where the day is the present day
  const qString = "SELECT * FROM notes WHERE user_id = $1 AND date_created >= NOW() - '1 DAY'::INTERVAL"
  try {
    const response = await db.query(qString, [user_id]);
    res.locals.dailyNotes = response.rows;
    return next();
  } catch (err) {
    return next();
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
    })
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
    })
  }
}

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
    })
  }
};
// HANDLES PUT REQUESTS
Controller.updateNote = async (req, res, next) => {
  const { user_id, note_id, contents } = req.body;
  const qString = "UPDATE notes SET contents=$3 WHERE user_id=$1 AND note_id=$2";
  try {
    const response = await db.query(qString, [user_id, note_id, contents]);
    console.log('updated note:', response.rows)
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.updateNote',
      message: { err: 'Controller.updateNote: Error'},
    })
  }
};
// HANDLES DELETE REQUESTS
Controller.deleteNote = async (req, res, next) => {
  const { user_id, note_id } = req.body;
  let qString = "DELETE FROM notes WHERE user_id = $1 AND note_id = $2"
  try {
    const response = await db.query(qString, [user_id, note_id]);
    console.log('deleted note:', response.rows);
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.deleteNote',
      message: { err: 'Controller.deleteNote: Error'},
    })
  }
};

// Controller.login = (req, res, next) => {
//   const { username, password } = req.body.userInfo;
//   console.log({'username': username, 'password':password});
//   let qString =  "select * from users Where name = $1"; //grab user presets while matching for username/pw
//   // const hash = bcrypt.hashSync(password, 2);
//   // console.log(hash);
//   db.query(qString, [username])
//     .then(async (response) => {
//       const hash = await response.rows[0].password;
//       const eval = await bcrypt.compare(password, hash);
//       if (eval) {
//         res.locals.loginStatus = true;
//         return next();
//       } else throw 'Password is incorrect';
//     })
//     .catch(err => {
//       console.log(err.message);
//       return next({
//         log: 'Error in login',
//         message: {err: 'Controller.login: Error'}
//       });
//     });
// };

// Controller.verifyUser = (req, res, next) => {
//   const { username } = req.body.allInfo;
//   let verifyAvailable = "select * from users Where name = $1";
//   db.query(verifyAvailable, [username])
//   .then(response => {
//     console.log(response);
//     if (response.rows[0] !== undefined) throw 'Username is already taken!'
//     else return next();
//   })
//   .catch(err => {
//     console.log('error');
//     return next({
//       log: 'Error in Controller.signup',
//       message: {err: `${err.message}`}
//     });
//   });
// };

// Controller.signup = async (req, res, next) => {
//   console.log('this is the post request body', req.body.allInfo);
//   const { username, password } = req.body.allInfo;
//   let qString =  "Insert INTO users (name, password) Values ($1, $2);" 
//   let hash = await bcrypt.hash(password, 10);
//   db.query(qString, [username, hash])
//   .then((response) => {
//     console.log('promise response', response);
//     return next();
//   })
//   .catch(err => {
//     console.log(err.message);
//     return next({
//       log: 'Error in Controller.signup',
//       message: {err: 'Controller.signup: Error'}
//     });
//  });  
// };

module.exports = Controller;