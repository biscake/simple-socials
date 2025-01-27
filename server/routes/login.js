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
      res.status(500).send("Internal Server Error")
    }

    if (result) {
      console.log('Passwords match! Authenticated');
      res.status(200).send("Status: OK");
    } else {
      console.log('Passwords do not match!');
      res.status(403).send("Status: Invalid password");
    }
  })


  //TODO: issue jwt
})

module.exports = loginRouter;
