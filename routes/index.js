const pj = require('../package.json')

async function info(req, res) {
  res.json({
    name: pj.name,
    version: pj.version
  })
}

module.exports = function (router) {
  router.get('/info', info);
}
