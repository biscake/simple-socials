const { body, validationResult } = require("express-validator");
const db = require('../db/queries');
const ValidationError = require("../errors/ValidationError");

const validateFormPassword = [
  body('password')
    .notEmpty()
    .trim()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
    .escape(),
]

const validatePassword = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(400, errors.array());
  }
  next();
}

const validateFormDuplicates = [
  body('username')
    .notEmpty()
    .trim()
    .toLowerCase()
    .matches(/^[a-zA-Z0-9]+$/)
    .isLength({min: 4})
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("Username is already taken");
      }
    })
    .escape(),
  body('email')
    .notEmpty()
    .trim()
    .toLowerCase()
    .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    .custom(async (value) => {
      const email = await db.getEmailByEmail(value);
      if (email) {
        throw new Error("Email is already in use");
      }
    })
    .escape()
]

const validateDuplicates = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(409, errors.array());
  }
  next();
}

module.exports = {
  validateForm: [
    validateFormPassword,
    validatePassword,
    validateFormDuplicates,
    validateDuplicates
  ]
}