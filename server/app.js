const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors')
const errorHandler = require('./errors/errorHandler');
const apiRouter = require('./routes/api.js');
const passport = require("passport");
const session = require("express-session");
const pool = require("./db/pool.js");
const pgSession = require('connect-pg-simple')(session);

//import .env
require('dotenv').config();

// enable cors
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));

// cookie session
app.use(session({
  resave: false,
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.ENV === 'production',
    sameSite: 'Lax',
    httpOnly: true,
  }
}));

// passport
require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);

// error handler
app.use(errorHandler);

// Use PORT provided in environment or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});