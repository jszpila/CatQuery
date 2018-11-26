const express    = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.CATS_PORT || 3000

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

require('./routes/index')(app);
require('./routes/cats')(app);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'authToken invalid' });
  }
});

app.listen(port, () => console.log(`CatQuery running on ${port}!`))
