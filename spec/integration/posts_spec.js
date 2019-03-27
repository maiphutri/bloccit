const request   = require('request'),
      server    = require("../../src/server"),
      base      = "http://localhost:3000/topics/",
      sequelize = require("../../src/db/models/index").sequelize,
      Topic     = require("../../src/db/models").Topic,
      Post      = require("../../src/db/models").Post,
      Flair     = require("../../src/db/models").Flair;

describe("routes : posts", () => {
  
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

  describe("GET /topics/:topicId/posts/new", () => {

    it("should render a new post form", (done) => {
      request.get(`${base}${this.topic.id}/posts/new`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Post");
          done();
        }
      )
    })
  });

  describe("POST /topics/:topicId/posts/create", () => {

    it("should create a new post and redirect", (done) => {
      const options = {
        url: `${base}${this.topic.id}/posts/create`,
        form: {
          title: "Watching snow melt",
          body: "Without a doubt my favoriting things to do besides watching paint dry!",
          flairId: this.flair.id,
          topicId: this.topic.id
        }
      };

      request.post(options,
        (err, res, body) => {
          Post.findOne({ where: {title: "Watching snow melt"} }).then(post => {
            expect(post).not.toBeNull();
            expect(post.title).toBe("Watching snow melt");
            expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
            expect(post.topicId).not.toBeNull();
            expect(post.flairId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          })
        }
      )
    });
  });

  describe("GET /topics/:topicId/posts/:id", () => {

    it("should render a view with the selected post", (done) => {
      request.get(`${base}${this.topic.id}/posts/${this.post.id}`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("My first visit to Proxima Centauri b");
          done();
        }
      )
    });
  });

  describe("POST /topics/:topicId/posts/:id/destroy", () => {

    it("should delete the post with the associated ID", (done) => {
      expect(this.post.id).toBe(1);
      request.post(`${base}${this.topic.id}/posts/${this.post.id}/destroy`,
        (err, res, body) => {
          Post.findByPk(1).then(post => {
            expect(err).toBeNull();
            expect(post).toBeNull();
            done();
          })
        }
      )
    });
  });

  describe("GET /topics/:topicId/posts/:id/edit", () => {

    it("should render a view with an edit post form", (done) => {
      request.get(`${base}${this.topic.id}/posts/${this.post.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Post");
          expect(body).toContain("My first visit to Proxima Centauri b");
          done();
        }
      )
    });
  });

  describe("POST /topics/:topicId/posts/:id/update", () => {

    it("should return a status code 303", (done) => {
      request.post({
        url: `${base}${this.topic.id}/posts/${this.post.id}/update`,
        form: {
          title: "Snowman Building Competition",
          body: "I love watching them melt slowly."
        }
      }, (err, res, body) => {
            expect(res.statusCode).toBe(303);
            done();
        }
      )
    });

    it("should update the post with the given values", (done) => {
      const options = {
        url: `${base}${this.topic.id}/posts/${this.post.id}/update`,
        form: {
          title: "Snowman Building Competition"
        }
      };

      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          
          Post.findOne({ where: {id: this.post.id} }).then(post => {
            expect(post.title).toBe("Snowman Building Competition");
            done();
          });
        }
      )
    });
  })
})
