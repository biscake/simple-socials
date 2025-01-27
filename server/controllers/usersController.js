const { Router } = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const ExistingUserError = require('../errors/customError');
const { validateForm } = require('../utils/validateRegisterUsers');
const ValidationErrors = require('../errors/customError');

// expres-validator for forms

const saltRounds = 10;

function hashPasswordMiddleware(req, res, next) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      req.pwHash = hash;
      next();
    })
  })
}

function addUserToDb(req, res, next) {
  try {
    db.insertUser(req.body.username, req.body.email, req.pwHash);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerUser: [
    ...validateForm,
    hashPasswordMiddleware, 
    addUserToDb
  ],
}