const { body, validationResult } = require("express-validator");

const validateForm = [
  body('username')
    .notEmpty()
    .trim()
    .toLowerCase()
    .matches(/^[a-zA-Z0-9]+$/)
    .isLength({min: 4})
    .escape(),
  body('password')
    .notEmpty()
    .trim()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
    .escape(),
  body('email')
    .notEmpty()
    .trim()
    .toLowerCase()
    .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    .escape()
]

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
}

module.exports = {
  validate,
  validateForm
}