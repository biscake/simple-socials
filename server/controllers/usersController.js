const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const { validateForm } = require('../utils/validateRegisterUsers');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const AuthenticationError = require('../errors/AuthenticationError');

const saltRounds = 10;

const hashPassword = asyncHandler(async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.pwHash = hash;
    next();
  } catch (error) {
    next(error);
  }
})

const addUserToDb = asyncHandler(async (req, res) => {
  await db.insertUser(req.body.username, req.body.email, req.pwHash);

  res.status(201).json({
    success: true, 
    message: "User registered successfully",
  });
})

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) { 
      return next(err);
    }

    if (!user) {
      return next(new AuthenticationError("Login failed", 401));
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
}

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) { 
      return next(err); 
    }

    req.session.destroy(err => {
      if (err) {
        return next(err);
      }

      res.clearCookie('connect.sid', {
        path: '/', 
        secure: process.env.ENV === 'production', 
        sameSite: 'Lax', 
        httpOnly: true, 
      });

      res.json({ message: 'Logged out successfully' });
    });
  });
}

const verifySession = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  next(new AuthenticationError("Invalid session", 401));
}

module.exports =  {
  registerUser: [
    ...validateForm,
    hashPassword, 
    addUserToDb
  ],
  login,
  logout,
  verifySession
}
