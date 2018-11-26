const cats  = require('../model/cats');
const users = require('../model/users');

const SECRET = process.env.CATS_SHARED_SECRET || 'test';

const eJWT = require('express-jwt')({secret: SECRET});
const jwt  = require('jsonwebtoken');

async function addCat(req, res) {
  let {username, password, name, weight, imageUrl, breed, birthDate} = req.body;

  try {
    let user = await users.findUser(username);

    if (user) {
      let valid = await users.checkPass(password, user.password);

      if (valid) {
        if (!name) {
          res.status(400).json({ error: 'Name missing' });
        }

        if (password.length < 8) {
          res.status(400).json({ error: 'Password < 8 characters' });
        }

        await cats.addCat(name, weight, birthDate, breed, imageUrl, user.id);
        res.status(200).send();
      } else {
        res.status(400).json({ error: 'Username invalid' })
      }
    } else {
      let newUser = await users.register(username, password);
      await cats.addCat(name, weight, birthDate, breed, imageUrl, newUser);
      res.status(200).send();
    }
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
}

async function searchCats(req, res) {
  let {name, username, id} = req.body;

  if (name || username || id) {
    res.json(await cats.find({ name, username, id }));
  } else {
    res.status(400).json({ error: 'Invalid search criteria'});
  }
}

async function randomCat(req, res) {
  res.json(await cats.findAny());
}

async function login(req, res) {
  let {username, password} = req.body;
  let userInfo = await users.login(username, password);

  if (userInfo.valid) {
    res.json({ authToken: jwt.sign(username, SECRET) });
  } else {
    res.status(400).json({ error: userInfo.error });
  }
}

module.exports = function(router) {
  router.post('/cat/login', login);
  router.post('/cat/register', addCat);
  router.get('/cats/random', randomCat);
  router.get('/cats', eJWT, searchCats);
}
