const request   = require('request'),
      server    = require('../../src/server'),
      base      = "http://localhost:3000/topics/",
      sequelize = require('../../src/db/models/index').sequelize,
      Topic     = require('../../src/db/models').Topic,
      Post      = require('../../src/db/models').Post,
      Flair     = require('../../src/db/models').Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then(topic => {
        this.topic = topic;
        
        Flair.create({
          name: "Misc",
          color: "grey",
          topicId: this.topic.id
        })
        .then(flair => {
          this.flair = flair;

          Post.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            topicId: this.topic.id,
            flairId: this.flair.id
          })
          .then(post => {
            this.post = post;
            done()
          })
          .catch(err => {
            console.log(err);
            done();
          })
        })
      })
    });
  });

  describe("GET /topics/:topicId/flairs/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}${this.topic.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      })
    })
  });

  describe("POST /topics/:topicId/flairs/create", () => {

    it("should create a new flair and redirect", (done) => {
      const options = {
        url: `${base}${this.topic.id}/flairs/create`,
        form: {
          name: "Misc",
          color: "grey",
          topicId: this.topic.id
        }
      };

      request.post(options,
        (err, res, body) => {
          Flair.findOne({ where: {name: "Misc"} }).then(flair => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("Misc");
            expect(flair.color).toBe("grey");
            expect(flair.topicId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          })
        }
      )
    })
  });

  describe("GET /topics/:topicId/flairs/:id", () => {

    it("should render a view with selected flair", (done) => {
      request.get(`${base}${this.topic.id}/flairs/${this.flair.id}`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Misc");
          done();
        }
      )
    })
  });

  describe("POST /topics/:topicId/flairs/:id/destroy", () => {

    it("should delete the flair with associated id", (done) => {
      expect(this.flair.id).toBe(1);
      request.post(`${base}${this.topic.id}/flairs/${this.flair.id}/destroy`,
        (err, res, body) => {
          Flair.findByPk(1).then(flair => {
            expect(err).toBeNull();
            expect(flair).toBeNull();
            done();
          })
        }
      )
    })
  });

  describe("GET /topics/:topicId/flairs/:id/edit", () => {

    it("should render a view with edit flair form", (done) => {
      request.get(`${base}${this.topic.id}/flairs/${this.flair.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Flair");
          expect(body).toContain("Misc");
          done();
        }
      )
    })
  });

  describe("POST /topics/:topicId/flairs/:id/update", () => {

    it("should return status code 303", (done) => {
      request.post({
        url: `${base}${this.topic.id}/flairs/${this.flair.id}/update`,
        form: {
          name: "Media",
          color: "red"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(303);
        done();
      })
    })

    it("should update flair with the given value", (done) => {
      const options = {
        url: `${base}${this.topic.id}/flairs/${this.flair.id}/update`,
        form: {
          name: "Media"
        }
      };

      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();

          Flair.findOne({ where: {id: this.flair.id} }).then(flair => {
            expect(flair.name).toBe("Media");
            done();
          })
        }
      )
    })
  })
})