const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.CATS_PORT || 3000

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

require('../routes/index')(app);

describe('GET /info', function() {
  it('should respond with api info', function() {
    return request(app)
      .get('/info')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function(res) {
        res.body = { 
          name: 'catquery', 
          version: '1.0.0' 
        }
      })
      .expect(200);
  });
});
