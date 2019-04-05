const Topic     = require("./models").Topic,
      Post      = require("./models").Post,
      User      = require("./models").User,
      Comment   = require("./models").Comment;

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
    return Post.findByPk(id, {
        include: [{
            model: Comment,
            as: "comments",
            include: [{
                model: User
            }]
        }]
    }).then(post => {
        callback(null, post);
    })
    .catch(err => {
        callback(err);
    })
  },

  deletePost(id, callback) {
    return Post.destroy({
        where: {id}
    }).then(deletedPost => {
        callback(null, deletedPost);
    })
    .catch(err => {
        callback(err);
    })
  },

  updatePost(id, updatedPost, callback) {
    return Post.findByPk(id).then(post => {
        if (!post) {
        return callback("Post not found");
        }

        post.update(updatedPost, {
            fields: Object.keys(updatedPost)
        })
        .then(() => {
            callback(null, post);
        })
        .catch(err => {
            callback(err);
        })
    })
  }
}
