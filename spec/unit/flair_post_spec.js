const sequelize = require("../../src/db/models/index").sequelize,
      Topic     = require("../../src/db/models").Topic,
      Post      = require("../../src/db/models").Post,
      Flair     = require("../../src/db/models").Flair;
    
describe("Flair", () => {

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
    })
  });

  describe("#create()", () => {

    it("should create a flair object with name, color, and assigned topic", (done) => {
      Flair.create({
        name: "Questions",
        color: "green",
        topicId: this.topic.id
      })
      .then(flair => {
        expect(flair.name).toBe("Questions");
        expect(flair.color).toBe("green");
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      })
    });

    it("should not create a flair with missing name, color, or assigned topic", (done) => {
      Flair.create({
        name: "Questions"
      })
      .then(flair => {
        done();
      })
      .catch(err => {
        expect(err.message).toContain("Flair.color cannot be null");
        expect(err.message).toContain("Flair.topicId cannot be null");
        done();
      })
    });
  });

  describe("#setTopic()", () => {

    it("should associate a topic and flair together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then(newTopic => {
        expect(this.flair.id).toBe(this.topic.id);
        this.flair.setTopic(newTopic).then(flair => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        })
      })
    })

    it("should associate a topic and post together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {
        expect(this.post.id).toBe(this.topic.id);
        this.post.setTopic(newTopic).then((post) => {
          expect(post.topicId).toBe(newTopic.id);
          done();
        })
      })
    })
  });

  describe("#setFlair()", () => {

    it("should associate a post and flair together", (done) => {
      Flair.create({
        name: "Questions",
        color: "green",
        topicId: this.topic.id
      })
      .then(newFlair => {
        expect(this.post.id).toBe(this.flair.id);
        this.post.setFlair(newFlair).then(post => {
          expect(post.flairId).toBe(newFlair.id);
          done();
        })
      })
    })
  });

  describe("#getTopic()", () => {

    it("should return the associated topic with flair", (done) => {
      this.flair.getTopic().then(associatedTopic => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      })
    });

    it('should return the associated topic with post', (done) => {
      this.post.getTopic().then(associatedTopic => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      })
    })
  });

  describe("#getFlair()", () => {

    it("should return the associated flair", (done) => {
      this.post.getFlair().then(associatedFlair => {
        expect(associatedFlair.name).toBe("Misc");
        done();
      })
    })
  })
})