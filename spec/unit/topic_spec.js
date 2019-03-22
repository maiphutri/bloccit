const sequelize = require("../../src/db/models/index").sequelize,
      Topics    = require("../../src/db/models").Topics,
      Post      = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topics.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {

    it("should create a topic with title and description", (done) => {
      Topics.create({
        title: "Pros of Cryosleep during the long journey",
        description: "1. Not having to answer the 'are we there yet?' question."
      })
      .then((topic) => {
        expect(topic.title).toBe("Pros of Cryosleep during the long journey");
        expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#getPosts()", () => {

    it("should return associated posts", (done) => {
      this.topic.getPosts().then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
        done();
      });
    });
  });
})
