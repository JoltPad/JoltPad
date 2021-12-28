const db = require('./database.js');
const bcrypt = require('bcryptjs');

const Controller = {};

// Gets all notes from current day
Controller.getDaily = async (req, res, next) => {
  const { user_id } = req.body;
  //Query string will obtain all the notes where the day is the present day
  let qString = "SELECT * FROM notes WHERE user_id = $1 AND date_created >= NOW() - '1 DAY'::INTERVAL"
  try {
    const data = await db.query(qString, [user_id]);
    res.locals.dailyNotes = data.rows;
    return next();
  } catch (err) {
    return next();
  }
}

//Gets all notes for the calendar view
Controller.getAll = async (req, res, next) => {
  const { user_id } = req.body;
  let qString = "Select * FROM notes WHERE user_id = $1";
  try {
    const data = await db.query(qString, [user_id]);
    res.locals.allNotes = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Error in Controller.getAll',
      message: { err: 'Controller.getAll: Error' }
    })
  }
}

//Gets all notes filtered by Category
Controller.getCategory = (req, res, next) => {
  const { user_id, category_id } = req.body;
  //Query has to group by categories, you might need to do a string.join here
  let qString = "SELECT * FROM notes WHERE user_id = $1 AND category_id = $2";
  try {
    const data = await db.query(qString, [user_id, category_id]);
    res.locals.notesByCategory = data.rows;
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.getCategory',
      message: { err: 'Controller.getCategory: Error' }
    })
  }
}
//Adds a note to the database
Controller.addNote = async (req, res, next) => {
  const { user_id } = req.body;
    let qString = "Insert INTO notes WHERE user_id = $1"
  try {
    const data = await db.query(qString, [user_id]);
    res.sendStatus(201).send('Note successfully added');
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.addNote',
      message: { err: 'Controller.addNote: Error'},
    })
  }
}

Controller.deleteNote = async (req, res, next) => {
  const { user_id, note_id } = req.body;
  let qString = "DELETE FROM notes WHERE user_id = $1 AND note_id = $2"
  try {
    const data = await db.query(qString, [user_id, note_id]);
    res.sendStatus(202).send('Note successfully deleted');
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.deleteNote',
      message: { err: 'Controller.deleteNote: Error'},
    })
  }
}

Controller.updateNote = async (req, res, next) => {
  const { user_id, note_id, contents } = req.body;
    let qString = "UPDATE notes SET contents=$3 WHERE user_id=$1 AND note_id=$2";
  try {
    const data = await db.query(qString, [user_id, note_id, contents]);
    res.sendStatus(202).send('Note successfully updated');
    return next();
  } catch (err) {
    return next({
      log: 'Error in Controller.updateNote',
      message: { err: 'Controller.updateNote: Error'},
    })
  }
}

Controller.login = (req, res, next) => {
  const { username, password } = req.body.userInfo;
  console.log({'username': username, 'password':password});
  let qString =  "select * from users Where name = $1"; //grab user presets while matching for username/pw
  // const hash = bcrypt.hashSync(password, 2);
  // console.log(hash);
  db.query(qString, [username])
    .then(async (data) => {
      const hash = await data.rows[0].password;
      const eval = await bcrypt.compare(password, hash);
      if (eval) {
        res.locals.loginStatus = true;
        return next();
      } else throw 'Password is incorrect';
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in login',
        message: {err: 'Controller.login: Error'}
      });
    });
};

Controller.verifyUser = (req, res, next) => {
  const { username } = req.body.allInfo;
  let verifyAvailable = "select * from users Where name = $1";
  db.query(verifyAvailable, [username])
  .then(response => {
    console.log(response);
    if (response.rows[0] !== undefined) throw 'Username is already taken!'
    else return next();
  })
  .catch(err => {
    console.log('error');
    return next({
      log: 'Error in Controller.signup',
      message: {err: `${err.message}`}
    });
  });
}

Controller.signup = async (req, res, next) => {
  console.log('this is the post request body', req.body.allInfo);
  const { username, password } = req.body.allInfo;
  let qString =  "Insert INTO users (name, password) Values ($1, $2);" 
  let hash = await bcrypt.hash(password, 10);
  db.query(qString, [username, hash])
  .then((response) => {
    console.log('promise response', response);
    return next();
  })
  .catch(err => {
    console.log(err.message);
    return next({
      log: 'Error in Controller.signup',
      message: {err: 'Controller.signup: Error'}
    });
 });  
};

module.exports = Controller;