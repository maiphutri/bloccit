const request   = require("request"),
      server    = require("../../src/server"),
      base      = "http://localhost:3000/topics/",
      sequelize = require("../../src/db/models/index").sequelize,
      Topic     = require("../../src/db/models").Topic,
      Post      = require("../../src/db/models").Post,
      User      = require("../../src/db/models").User,
      Favorite  = require("../../src/db/models").Favorite;

describe("routes : favorites", () => {
  
  beforeEach(done => {
    this.user;
    this.topic;
    this.post;
    this.favorite;

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

  describe("guest user attempting to favorite on a post", () => {

    beforeEach(done => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 0
        }
      }, (err, res, body) => {
        done();
      })
    });

    describe("POST /topics/:topicId/posts/:postId/favorites/create", () => {

      it("should not create a new favorite", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/favorites/create`
        };

        let favCountBeforeCreate;

        this.post.getFavorites().then(favorites => {
          favCountBeforeCreate = favorites.length;

          request.post(options, 
            (err, res, body) => {
              Favorite.findAll().then(favorites => {
                expect(favorites.length).toBe(favCountBeforeCreate);
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
    })
  });

  describe("signed in user favoriting a post", () => {

    beforeEach(done => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: 'member',
          userId: this.user.id
        }
      }, (err, res, body) => {
        done();
      })
    });

    describe("POST /topics/:topicId/posts/:postId/favorites/create", () => {

      it("should create a favorite", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/favorites/create`
        };

        request.post(options,
          (err, res, body) => {
            Favorite.findOne({
              where: {
                userId: this.user.id,
                postId: this.post.id
              }
            })
            .then(favorite => {
              expect(favorite).not.toBeNull();
              expect(favorite.userId).toBe(this.user.id);
              expect(favorite.postId).toBe(this.post.id);
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

    describe("POST /topics/:topicId/posts/:postId/favorites/:id/destroy", () => {

      it("should destroy a favorite", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/favorites/create`
        };
        
        request.post(options,
          (err, res, body) => {
            this.post.getFavorites().then(favorites => {
              const favorite = favorites[0];
              const favCountBeforeDelete = favorites.length;

              request.post(`${base}${this.topic.id}/posts/${this.post.id}/favorites/${favorite.id}/destroy`,
                (err, res, body) => {
                  this.post.getFavorites().then(favorites => {
                    expect(favorites.length).toBe(favCountBeforeDelete - 1);
                    done();
                  })
                  .catch(err => {
                    console.log(err);
                    done();
                  })
                }
              )
            })
            .catch(err => {
              console.log(err);
              done();
            })
          }
        )
      })
    })
  })
})