const { Router } = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport');
const AuthenticationError = require('../errors/AuthenticationError');

const apiRouter = Router();

apiRouter.post('/users/register', usersController.registerUser);

apiRouter.post("/users/login", usersController.login);

apiRouter.post('/users/logout', usersController.logout);

apiRouter.get('/users/verify-session', usersController.verifySession, (req, res) => res.status(200).json({ message: "valid session" }));

apiRouter.get('/posts', usersController.verifySession, (req, res) => res.send('authenticated'));

module.exports = apiRouter;
