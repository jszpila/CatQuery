const db     = require('./index');
const bcrypt = require('bcryptjs');

const saltR = process.env.CAT_SALT_ROUNDS || 10;

async function findUser(username) {
  let [[res]] = await db.query(`SELECT id, username, password,lastSeenAt
    FROM users
    WHERE username = ?`, 
    [username]);

  return res;
}

function checkPass(password, passHash) {
  return bcrypt.compare(password, passHash);
}

async function seen(id) {
  return db.query(`UPDATE users
  SET lastSeenAt = now()
  WHERE id = ?`, 
  [id]);
}

async function register(userName, password) {
  let hash = await bcrypt.hash(password, saltR)
  let [{insertId}] = await db.query(`INSERT INTO users (username, password, lastSeenAt)
      VALUES (?, ?, now());`, 
      [userName, hash]);

  return insertId;
}

async function login(username, password) {
  let user = await findUser(username);
  let data = {};

  if (user) {
    data.valid = await checkPass(password, user.password);

    if (data.valid) {
      await seen(user.id);
      data.lastSeenAt = user.lastSeenAt
    } else {
      data.error = 'Password invalid';
    }
  } else {
    data.valid = false;
    data.error = 'No such username';
  }

  return data;
}

module.exports = {
  findUser,
  checkPass,
  register,
  seen,
  login
}
