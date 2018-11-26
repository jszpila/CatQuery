const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host:         process.env.CATS_DB_HOST || 'localhost',
  port:         process.env.CATS_DB_PORT || 3306,
  database:     process.env.CATS_DB_NAME || 'cats',
  user:         process.env.CATS_DB_USER || 'test',
  password:     process.env.CATS_DB_PASS || 'test',
  insecureAuth: true
});

module.exports = db;
