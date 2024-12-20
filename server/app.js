const express = require("express");
const path = require("node:path");
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors')
const errorHandler = require('./errors/errorHandler');

const loginRoute = require('./routes/login');
// const signupRoute = require('./routes/signup');
const apiRouter = require('./routes/api.js');

//import .env
require('dotenv').config()

// enable cors
app.use(cors());

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);
// app.use("/sign-up", signupRoute);

// error handler
app.use(errorHandler);

// Use PORT provided in environment or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});