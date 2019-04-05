const Comment    = require("./models").Comment,
      Post       = require("./models").Post,
      User       = require("./models").User,
      Authorizer = require("../policies/comment");

module.exports = {
  createNewComment(newComment, callback) {
    return Comment.create(newComment).then(comment => {
      callback(null, comment);
    })
    .catch(err => {
      callback(err);
    })
  },
  
  deleteCommment(req, callback) {
    return Comment.findByPk(req.params.id).then(comment => {
      const authorized = new Authorizer(req.user, comment).destroy();

      if (authorized) {
        comment.destroy();
        callback(null, comment);
      } else {
        req.flash("notice", "You are not authorized to do that.");
        callback(401);
      }
    })
  }
}