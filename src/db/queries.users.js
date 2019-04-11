const User    = require("./models").User,
      bcrypt  = require('bcryptjs'),
      Post    = require("./models").Post,
      Comment = require("./models").Comment;

module.exports = {
  createUser(newUser, callback) {
    const salt           = bcrypt.genSaltSync(),
          hashedPassword = bcrypt.hashSync(newUser.password, salt);
    
    return User.create({
      email: newUser.email,
      password: hashedPassword
    }).then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    })
  },

  getUser(id, callback) {
    let result = {};

    User.findByPk(id).then(user => {
      if (!user) {
        callback(404);
      } else {
        result.user = user;

        Post.scope({method: ["lastFiveFor", id]}).findAll().then(posts => {
          result.posts = posts;

          Comment.scope({method: ["lastFiveFor", id]}).findAll().then(comments => {
            result.comments = comments;
            callback(null, result);
          })
          .catch(err => {
            callback(err);
          })
        })
      }
    })
  }
}