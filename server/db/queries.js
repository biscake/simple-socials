const pool = require("./pool");

async function getEmailByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

async function getUserPwHash(user) {
  const result = await pool.query('SELECT pwHash FROM users WHERE username = $1', [user]);
  return result.rows[0];
}

async function getUserByUsername(username) {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}

async function insertUser(username, email, hash) {
  await pool.query('INSERT INTO users (username, email, pwHash) VALUES ($1, $2, $3)', [username, email, hash]);
}

module.exports = {
  getUserPwHash,
  getUserByUsername,
  insertUser,
  getEmailByEmail
};
