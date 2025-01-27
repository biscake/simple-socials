const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { getUserPwHash, insertUser } = require('../db/queries');
const usersController = require('../controllers/usersController');

const apiRouter = Router();

apiRouter.post('/users/register', usersController.registerUser);

// apiRouter.post('/user/login', usersController.)

module.exports = apiRouter;
