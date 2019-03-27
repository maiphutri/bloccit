const Post  = require("./models").Post,
      Flair = require("./models").Flair;

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
    return Post.findByPk(id)
    .then(post => {
        Flair.findByPk(post.flairId).then(flair => {
            callback(null, post, flair);
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
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
