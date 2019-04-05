const request   = require("request"),
      server    = require("../../src/server"),
      base      = "http://localhost:3000/topics/",
      sequelize = require("../../src/db/models/index").sequelize,
      Topic     = require("../../src/db/models").Topic,
      Post      = require("../../src/db/models").Post,
      User      = require("../../src/db/models").User,
      Comment   = require("../../src/db/models").Comment;

describe("routes : comments", () => {
  
  beforeEach(done => {
    this.user;
    this.topic;
    this.post;
    this.comment;

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
        },{
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then(topic => {
          this.topic = topic;
          this.post = topic.posts[0];

          Comment.create({
            body: "ay caramba!!!!!",
            userId: this.user.id,
            postId: this.post.id
          })
          .then(comment => {
            this.comment = comment;
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
    })
  });

  describe("guest attempting to perform CRUD actions for Comment", () => {

    beforeEach(done => {
      request.get({
        url: 'http://localhost:3000/auth/fake',
        form: {
          userId: 0
        }
      }, (err, res, body) => {
        done();
      })
    });

    describe("POST /topics/:topicId/posts/:postId/comments/create", () => {

      it("should not create a new comment", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
          form: {
            body: "This comment is amazing!"
          }
        };

        request.post(options,
          (err, res, body) => {
            Comment.findOne({where: {body: "This comment is amazing!"} }).then(comment => {
              done();
            })
            .catch(err => {
              expect(err.message).toContain("Cannot read property 'body' of null");
              console.log(err);
              done();
            })
        })
      })
    });

    describe("POST /topics/:topicId/posts/:postId/comments/:id/destroy", () => {
      
      it("should not delete the comment with the associated ID", (done) => {
        Comment.findAll().then(comments => {
          const commentCountBeforeDelete = comments.length;
          expect(commentCountBeforeDelete).toBe(1);

          request.post(
            `/topics/${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
            (err, res, body) => {
              Comment.findAll().then(comments => {
                expect(comments.length).toBe(commentCountBeforeDelete);
                done();
              })
            }
          )
        })
      })
    })
  }); // end context for guest user

  describe("signed in user performing CRUD actions for Comment", () => {

    beforeEach(done => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: "member",
          userId: this.user.id
        }
      }, (err, res, body) => {
        done();
      })
    });

    describe("POST /topics/:topicId/posts/:postId/comments/create", () => {

      it("should create a new comment and redirect", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
          form: {
            body: "This comment is amazing!"
          }
        };

        request.post(options,
          (err, res, body) => {
            Comment.findOne({where: {body: "This comment is amazing!"} }).then(comment => {
              expect(comment).not.toBeNull();
              expect(comment.body).toBe("This comment is amazing!");
              expect(comment.id).not.toBeNull();
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

    describe("POST /topics/:topicId/posts/:postId/comments/:id/destroy", () => {

      it("should delete the comment with the associated ID", (done) => {
        Comment.findAll().then(comments => {
          const commentCountBeforeDelete = comments.length;
          expect(commentCountBeforeDelete).toBe(1);

          request.post(
            `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
            (err, res, body) => {
              expect(res.statusCode).toBe(302);
              Comment.findAll().then(comments => {
                expect(err).toBeNull();
                expect(comments.length).toBe(commentCountBeforeDelete - 1);
                done();
              })
            }
          )
        })
      })
    })
  }); // end context for signed in user
})
