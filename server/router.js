const express = require ('express');
const Controller = require ('./Controller.js');

const router = express.Router();

router.get('/daily/:user_id', Controller.getDaily, (req, res) => {
  console.log('all notes retrieved', res.locals.dailyNotes);
  return res.status(200).json(res.locals.dailyNotes);
});

router.get('/category', Controller.getCategory, (req, res) => {
  console.log('notes by category retrieved');
  return res.status(200).json(res.locals.notesByCategory);
});

router.get('/calendar', Controller.getAll,(req, res) => {
  console.log('all notes retrieved');
  return res.status(200).json(res.locals.allNotes);
});

router.post('/add', Controller.addNote, (req, res) => {
  console.log('note successfully added');
  res.status(201).send('note successfully added');
});

router.put('/update', Controller.updateNote, (req, res) => {
  console.log('note successfully updated');
  res.status(201).send('note successfully updated');
});

router.delete('/delete', Controller.deleteNote, (req, res) => {
  console.log('note successfully deleted');
  res.status(201).send('note successfully deleted');
});
 
router.post('/login', Controller.verifyUser, (req, res) => {
  console.log('successfully logged in');
  return res.status(200).json(res.locals);
});

router.post('/signup', Controller.registerUser, (req, res) => {
  console.log('successfully signed up new user');
  return res.status(200).json(res.locals);
});

module.exports = router;