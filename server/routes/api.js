const { Router } = require('express');
const usersController = require('../controllers/usersController');

const apiRouter = Router();

apiRouter.post('/users/register', usersController.registerUser);

apiRouter.post('/users/login', usersController.login)

module.exports = apiRouter;
