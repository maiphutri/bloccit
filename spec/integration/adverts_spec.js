const request = require('request'),
      server  = require("../../src/server.js"),
      base    = "http://localhost:3000/advertisement/",
      sequelize = require('../../src/db/models/index').sequelize,
      Advertisement = require("../../src/db/models").Advertisements;

describe("routes : advertisement", () => {

  beforeEach((done) => {
    this.advert;
    sequelize.sync({force: true}).then((res) => {
      Advertisement.create({
        title: "Netflix",
        description: "I do marathons(on Netflix)"
      })
      .then((advert) => {
        this.advert = advert;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

  describe("GET /advertisement", () => {

    it("should return a status code 200 and all advertisement", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisement");
        expect(body).toContain("Netflix");
        done();
      });
    });
  });

  describe("GET /advertisement/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });

  describe("POST /advertisement/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Coca cola",
        description:"Things go better with Coke"
      }
    };

    it("should create a new advertisement and redirect", (done) => {
      request.post(options,
        (err, res, body) => {
          Advertisement.findOne({where: {title: "Coca cola"}})
          .then((advert) => {
            expect(res.statusCode).toBe(303);
            expect(advert.title).toBe("Coca cola");
            expect(advert.description).toBe("Things go better with Coke");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          })
        }
      )
    });
  });

  describe("GET /advertisement/:id", () => {

    it("should render a view with the selected advertisement", (done) => {
      request.get(`${base}${this.advert.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Netflix");
        done();
      });
    });
  });

  describe("POST /advertisement/:id/destroy", () => {

    it('should delete the topic with the associated ID', (done) => {
      Advertisement.findAll().then((adverts) => {
        const advertCountBeforeDelete = adverts.length;
        expect(advertCountBeforeDelete).toBe(1);

        request.post(`${base}${this.advert.id}/destroy`, (err, res, body) => {
          Advertisement.findAll().then((adverts) => {
            expect(err).toBeNull();
            expect(adverts.length).toBe(advertCountBeforeDelete - 1);
            done();
          })
        })
      })
    });
  });

  describe("GET /advertisement/:id/edit", () => {

    it('should render a view with an edit topic form', (done) => {
      request.get(`${base}${this.advert.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Advertisement");
        expect(body).toContain("Netflix");
        done();
      });
    });
  });

  describe("POST /advertisement/:id/update", () => {

    it("should update the topic with the given value", (done) => {
      const options = {
        url: `${base}${this.advert.id}/update`,
        form: {
          title: "Coca cola",
          description: "Things go better with Coke"
        }
      };

      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();

          Advertisement.findOne({
            where: { id: this.advert.id }
          }).then((advert) => {
            expect(advert.title).toBe("Coca cola");
            done();
          })
        }
      )
    })
  })
})
