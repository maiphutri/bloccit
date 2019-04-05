const request   = require("request"),
      server    = require("../../src/server"),
      base      = "http://localhost:3000/topics/",
      sequelize = require("../../src/db/models/index").sequelize,
      Topic     = require("../../src/db/models").Topic,
      Post      = require("../../src/db/models").Post,
      User      = require("../../src/db/models").User,
      Vote      = require("../../src/db/models").Vote;

describe("routes : vote", () => {
  
  beforeEach(done => {
    this.user;
    this.topic;
    this.post;
    this.vote;

    sequelize.sync({force: true}).then(res => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then(user => {
        this.user = user;

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then(topic => {
          this.topic = topic;
          this.post = topic.posts[0];
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        })
      })
      .catch(err => {
        console.log(err);
        done();
      })
    })
  });

  describe("guest attempting to vote on a post", () => {
    
    beforeEach(done => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 0 //ensure no user in scope
        }
      }, (err, res, body) => {
        done();
      })
    });

    describe("GET /topics/:topicId/posts/:postId/votes/upvote", () => {

      it("should not create a new note", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/votes/upvote`,
        };

        request.get(options,
          (err, res, body) => {
            Vote.findOne({
              where:{
                userId: this.user.id,
                postId: this.post.id
              }
            })
            .then(vote => {
              expect(vote).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            })
          }
        )
      })
    })
  }); //end context for guest user

  describe("signed in user attempting to vote on a post", () => {

    beforeEach(done => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: 'member',
          userId: this.user.id,
          email: this.user.email
        }
      }, (err, res, body) => {
        done();
      })
    });

    describe("GET /topics/:topicId/posts/:postId/votes/upvote", () => {

      it("should create an upvote", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/votes/upvote`
        };

        request.get(options,
          (err, res, body) => {
            Vote.findOne({
              where: {
                userId: this.user.id,
                postId: this.post.id
              }
            })
            .then(vote => {
              expect(vote).not.toBeNull();
              expect(vote.value).toBe(1);
              expect(vote.userId).toBe(this.user.id);
              expect(vote.postId).toBe(this.post.id);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            })
          }
        )
      });

      it("should create an downvote", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/votes/downvote`
        };

        request.get(options,
          (err, res, body) => {
            Vote.findOne({
              where: {
                userId: this.user.id,
                postId: this.post.id
              }
            })
            .then(vote => {
              expect(vote).not.toBeNull();
              expect(vote.value).toBe(-1);
              expect(vote.userId).toBe(this.user.id);
              expect(vote.postId).toBe(this.post.id);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            })
          }
        )
      })
    })
  }) //end context for signed in user
})