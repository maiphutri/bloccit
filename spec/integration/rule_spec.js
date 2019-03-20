const request = require('request'),
      server  = require('../../src/server'),
      base    = "http://localhost:3000/rules";

describe("routes : rules", () => {

  describe("GET /rules", () => {

    it('should return a status code 200', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      })
    })
  })
})
