const express = require ('express');
const router = require ('./router')
const path = require ('path');
const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
//app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */

// handles all routes
app.use('/', router);

// app.post('/categories', Controller.getCategory, (req, res) => {
//   console.log('notes by category retrieved');
//   return res.status(200).json(res.locals.all);
// });

// app.post('/daily', Controller.getDaily, (req, res) => {

// })

// app.post('/calendar', Controller.getAll,(req, res) => {
//   console.log('notes by calendar retrieved');
//   return res.status(200).json(res.locals.all);
// });
 
// app.post('/login', Controller.login, Controller.getDaily, (req, res) => {
//   console.log('logged in');
//   return res.status(200).json(res.locals.all);
// });

// app.post('/signup', Controller.verifyUser, Controller.signup, (req, res) => {
//   console.log('signed up new user');
//   return res.sendStatus(200);
// });

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`⚡Server listening on port: ${PORT}... 🚀`);
});

module.exports = app;