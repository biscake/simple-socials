const express = require("express");
const path = require("node:path");
const app = express();

//import .env
require('dotenv').config()

// expres-validator for forms
const { body, validationResult } = require("express-validator");

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Set up public folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/api/getAll", (req, res) => {
  res.json({test: 'message1'});
});

// Use PORT provided in environment or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});