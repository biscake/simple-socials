const pool = require("./pool");

async function getAllUsernames() {
  const result = await pool.query("SELECT * FROM usernames");
  return result.rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsername(query) {
 const result = await pool.query("SELECT * FROM usernames WHERE username LIKE ($1)", ['%' + query + '%']);
 return result.rows;
}

async function deleteUsernames() {
  await pool.query("DELETE FROM usernames");
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
  getAllUsernames,
  insertUsername,
  searchUsername,
  deleteUsernames,
  getUserPwHash,
  getUserByUsername,
  insertUser
};
