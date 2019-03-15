const request = require('request'),
      server  = require('../../src/server.js'),
      base    = 'http://localhost:3000/',
      marco   = 'http://localhost:3000/marco';

describe ('routes : static', () => {

  describe ('GET /', () => {

    it('should return status code 200', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });

  describe ('GET /marco', () => {

    it('should return status code 200 & response with string "polo"', (done) => {
      request.get(marco, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toBe('polo');
        done();
      })
    })
  });
});
