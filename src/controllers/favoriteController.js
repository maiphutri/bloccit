const favoriteQueries = require("../db/queries.favorites.js"),
      Authorizer      = require("../policies/favorite");

module.exports = {
  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();
    if (authorized) {
      let newFavorite = {
        userId: req.user.id,
        postId: req.params.postId
      }
      if (req.user) {
        favoriteQueries.createFavorite(newFavorite, (err, favorite) => {
          if (err) {
            req.flash("error", err);
          }
          res.redirect(req.headers.referer);
        })
      }
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect("/users/sign_in");
    }
    
  },

  destroy(req, res, next) {
    favoriteQueries.deleteFavorite(req, (err, favorite) => {
      if (err) {
        req.flash("error", err);
        res.redirect(err, req.headers.referer)
      } else {
        res.redirect(req.headers.referer);
      }
    })
  }
}