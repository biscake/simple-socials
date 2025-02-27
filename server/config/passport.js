const { getUserById, getUserByUsername } = require('../db/queries');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const AuthenticationError = require('../errors/AuthenticationError');
const bcrypt = require('bcryptjs');

const verifyCallback = (username, password, done) => {
  getUserByUsername(username)
    .then(user => {
      if (!user) {
        return done(new AuthenticationError("Invalid username", 404), false);
      }
      const storedHashedPassword = user.pwhash;
      const isMatch = bcrypt.compare(password, storedHashedPassword);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(new AuthenticationError("Invalid credentials", 401), false);
      }
    })
    .catch(err => {
      return done(err);
    })
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((userId, done) => {
  getUserById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    })
})