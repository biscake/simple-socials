const { Router } = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport');
const AuthenticationError = require('../errors/AuthenticationError');

const apiRouter = Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new AuthenticationError("Unauthorized", 403);
}

apiRouter.post('/users/register', usersController.registerUser);

apiRouter.post("/users/login", usersController.login);

apiRouter.post('/users/logout', usersController.logout);

apiRouter.get('/posts', isAuthenticated, (req, res) => res.send('authenticated'));

module.exports = apiRouter;
