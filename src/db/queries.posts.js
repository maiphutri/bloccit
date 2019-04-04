const Topic      = require("./models").Topic,
      Post       = require("./models").Post,
      Authorizer = require("../policies/post");

module.exports = {
  addPost(newPost, callback) {
    return Post.create(newPost).then(post => {
        callback(null, post);
    })
    .catch(err => {
        console.log(err);
    })
  },
  
  getPost(id, callback) {
    return Post.findByPk(id).then(post => {
        callback(null, post);
    })
    .catch(err => {
        callback(err);
    })
  },

  deletePost(req, callback) {
    return Post.findByPk(req.params.id).then(post => {
        const authorized = new Authorizer(req.user, post).destroy();
        if (authorized) {
            post.destroy().then(res => {
                callback(null, true, post);
            })
        } else {
            callback(null, false, post);
        }
    })
    .catch(err => {
        callback(err);
    })
  },

  updatePost(req, updatedPost, callback) {
    return Post.findByPk(req.params.id).then(post => {
        if (!post) {
        return callback("Post not found");
        }
        const authorized = new Authorizer(req.user, post).update();

        if (authorized) {
            post.update(updatedPost, {
                fields: Object.keys(updatedPost)
            })
            .then(() => {
                callback(null, post);
            })
            .catch(err => {
                callback(err);
            })
        } else {
            req.flash("notice", "You are not authorized to do that.")
            callback(null, post);
        }
    })
  }
}
