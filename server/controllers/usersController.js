const { getUserPwHash } = require('../db/queries');
const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const { validateForm } = require('../utils/validateRegisterUsers');
const asyncHandler = require('express-async-handler');
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
  res.status(201).json({ message: "User registered successfully" });
})

const login = asyncHandler(async (req, res) => {
  const storedHashedPassword = await getUserPwHash(req.body.username);

  const isMatch = await bcrypt.compare(req.body.password, storedHashedPassword);

  if (isMatch) {
      console.log('Passwords match! Authenticated');
      res.status(200).json({ message: "Authentication successful" });

  } else {
      console.log('Passwords do not match!');
      throw new AuthenticationError("Invalid credentials", 401);
  }
});


module.exports = {
  registerUser: [
    ...validateForm,
    hashPassword, 
    addUserToDb
  ],
  login
}