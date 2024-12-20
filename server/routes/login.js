const { Router } = require('express');
const controller = require('../controllers/usersController');
const bcrypt = require('bcryptjs');
const { getUserPwHash } = require('../db/queries');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
  const storedHashedPassword = getUserPwHash(req.body.username);

  bcrypt.compare(req.body.password, storedHashedPassword, (err, result) => {
    if (err) {
      console.error('Error comparing passwords', err);
      return;
    }

    if (result) {
      console.log('Passwords match! Authenticated');
      res.json({success: true});
    } else {
      console.log('Passwords do not match!');
      res.json({success: false});
    }
  })


  //TODO: issue jwt
})

module.exports = loginRouter;
