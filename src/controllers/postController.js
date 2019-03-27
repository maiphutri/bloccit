const postQueries  = require("../db/queries.posts.js"),
      flairQueries = require("../db/queries.flairs.js");

module.exports = {
  new(req, res, next) {
    flairQueries.getAllFlairs(req.params.topicId, (err, flairs) => {
      if (err) {
        res.redirect(500, "/");
      } else {
        res.render("posts/new", {flairs: flairs, topicId: req.params.topicId});
      }
    })
  },

  create(req, res, next) {
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      topicId: req.params.topicId,
      flairId: req.body.flairs || req.params.topicId
    };
    postQueries.addPost(newPost, (err, post) => {
      if (err) {
        res.redirect(500, "/topics/posts/new");
      } else {
        res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
      }
    })
  },
  
  show(req, res, next) {
    postQueries.getPost(req.params.id, (err, post, flair) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/show", {post: post, flair: flair});
      }
    })
  },

  destroy(req, res, next) {
    postQueries.deletePost(req.params.id, (err, deletedPost) => {
      if (err) {
        res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`);
      } else {
        res.redirect(303, `/topics/${req.params.topicId}`);
      }
    })
  },

  edit(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/edit", {post});
      }
    })
  },

  update(req, res, next) {
    postQueries.updatePost(req.params.id, req.body, (err, post) => {
      if (err || post == null) {
        res.redirect(404, `/topics/${post.topicId}/posts/${post.id}/edit`)
      } else {
        res.redirect(303, `/topics/${post.topicId}/posts/${post.id}`)
      }
    })
  }
}
