const db = require('./database.js');
var bcrypt = require('bcryptjs');

const Controller = {};

Controller.getDaily = (req, res, next) => {
  const { username } = req.body.userInfo;
  let qString = "Select * from"
  db.query(qString, [username])
    .then
}

Controller.getYearly = (req, res, next) => {
  const { username } = req.body.userInfo;
  let qString = "Select * from"
  db.query(qString, [username])
    .then
}

Controller.addCard = (req, res, next) => {
  const { username, card } = req.body.userInfo;
  let qString = "Insert INTO"
  const noteContent = [card]
  db.query(qString, [username])
    .then
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