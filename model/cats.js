const db = require(`./index`);

async function find(params) {
  let qParams = [];
  let query = `SELECT c.id, c.name, c.birthDate, c.breed, c.imageUrl, u.username
    FROM cats c, users u WHERE c.userID = u.id AND `;

  function addParam(tablePrefix, columnName, val) {
    qParams.length >= 1 ? query += ` AND ` : ``;
    query += tablePrefix + `.` + columnName + ` = ? `;
    qParams.push(val);
  }

  if (params.id) {
    addParam(`c`, `id`, params.id);
  }

  if (params.name) {
    addParam(`c`, `name`, params.name);
  }

  if (params.username) {
    addParam(`u`, `username`, params.username);
  }

  query += ` ORDER BY u.lastSeenAt DESC;`;

  let [res] = await db.query(query, qParams);

  return res;
}

async function findAny() {
  let [[res]] = await db.query(`SELECT name, breed, imageUrl
    FROM cats
    ORDER BY RAND()
    LIMIT 1;`);

  return res;
}

function addCat(name, weight, birthDate, breed, imageUrl, userID) {
  return db.query(`INSERT into cats (name, weight, birthdate, breed, imageUrl, userID)
    VALUES (?, ?, ?, ?, ?, ?);`, 
    [name, weight, birthDate, breed, imageUrl, userID]);
}

module.exports = {
  find,
  findAny,
  addCat
};
