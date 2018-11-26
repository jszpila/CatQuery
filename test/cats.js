const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.CATS_PORT || 3000

app.use(bodyParser.json())

require('../routes/cats')(app);

const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdDEyMw.67W_82xcjI9OE3H5SvE56QZYiWlrSZQWNrjpUR7wbqo';

describe('GET /cats', function () {
  it('should return an error if the is no auth token in the headers', function() {
    return request(app)
      .get('/cats')
      .expect(401);
  });

  it('should return an error if there are insufficient search parameters', function() {
    return request(app)
      .get('/cats')
      .set('Authorization', authToken)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        res.body = {
          error: 'Invalid search criteria'
        }
      })
      .expect(400);
  });
});

describe('GET /cats/login', function() {
  it('should return an error if there is no auth token in the headers', function() {
    return request(app)
      .get('cats/login')
      .send('username=highlyunlikelyusername&password=aninconceivablepassword')
      .expect(401);
  });
});

describe('POST /cats/register', function() {
  it('should return an error if the cat name is missing', function() {
    return request(app)
      .post('cats/register')
      .send('username=test&password=testtesttest&birthdate=2007-07-17&weight=10.00')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        res.body = {
          error: 'Name missing'
        }
      })
      .expect(400);
  });

  it('should return an error if the password is too short', function () {
    return request(app)
      .post('cats/register')
      .send('name=test&username=test&password=test&birthdate=2007-07-17&weight=10.00')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        res.body = {
          error: 'Password < 8 characters'
        }
      })
      .expect(400);
  });

  it('should return an error if the username is not found', function () {
    return request(app)
      .post('cats/register')
      .send('name=test&username=test&password=test&birthdate=2007-07-17&weight=10.00')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        res.body = {
          error: 'Username invalid'
        }
      })
      .expect(400);
  });
})