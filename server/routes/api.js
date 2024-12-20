const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { getUserPwHash, insertUser } = require('../db/queries');
const usersController = require('../controllers/usersController');

const apiRouter = Router();

apiRouter.post('/user/register', usersController.registerUser);

// apiRouter.post('/user/login', usersController.)

apiRouter.post('/user/check', usersController.checkUserExist, (req, res) => {
  res.send(false);
});

module.exports = apiRouter;
