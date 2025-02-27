const QueryError = require("../errors/QueryError");
const pool = require("./pool");

async function getUserByEmail(email) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  } catch (error) {
    throw new QueryError("Email not found");
  }
}

async function getUserPwHash(user) {
  try {
    const result = await pool.query('SELECT pwHash FROM users WHERE username = $1', [user]);
    return result.rows[0].pwhash;
  } catch (error) {
    throw new QueryError("Username not found", 404);
  }
}

async function getUserByUsername(username) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
  } catch (error) {
    throw new QueryError("Username not found", 404);
  }
}

async function insertUser(username, email, hash) {
  const client = await pool.connect();
  try {
    await pool.query('INSERT INTO users (username, email, pwHash) VALUES ($1, $2, $3)', [username, email, hash]);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw QueryError("Internal Server Error", 500);
  } finally {
    client.release();
  }
}

module.exports = {
  getUserPwHash,
  getUserByUsername,
  insertUser,
  getUserByEmail
};
