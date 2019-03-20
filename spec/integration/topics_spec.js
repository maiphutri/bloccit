const request   = require('request'),
      server    = require("../../src/server.js"),
      base      = "http://localhost:3000/topics",
      sequelize = require("../../src/db/models/index").sequelize,
      Topics    = require("../../src/db/models").Topics;

describe("routes : topics", () => {

  beforeEach((done) => {
    this.topic;
    sequelize.sync({force: true}).then((res) => {

      Topics.create({
        title: "JS Frameworks",
        description: "There is a lot of them"
      })
      .then((topic) => {
        this.topic = topic;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

  describe("GET /topics", () => {

    it('should return a status code 200 and all topics', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Topics");
        expect(body).toContain("JS Frameworks")
        done();
      });
    });
  })
})
