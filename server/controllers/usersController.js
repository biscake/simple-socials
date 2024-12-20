const { Router } = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const ExistingUserError = require('../errors/customError');
const { validateForm, validate } = require('../utils/validations');

// expres-validator for forms

const saltRounds = 10;

const checkUserExist = asyncHandler(async (req, res, next) => {
  const user = await db.getUserByUsername(req.body.username);

  if (user) {
    throw new ExistingUserError('Existing username');
  }
  next();
})

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
    res.json({success: true, user: {username: req.body.username}});
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerUser: [
    validateForm,
    validate,
    checkUserExist,
    hashPasswordMiddleware, 
    addUserToDb
  ],
  checkUserExist
}