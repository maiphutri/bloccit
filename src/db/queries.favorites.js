const Favorite   = require("./models").Favorite,
      Authorizer = require("../policies/favorite");

module.exports = {
  createFavorite(newFavorite, callback) {
    return Favorite.create(newFavorite)
    .then(favorite => {
      callback(null, favorite);
    })
    .catch(err => {
      callback(err);
    })
  },

  deleteFavorite(req, callback) {
    return Favorite.findByPk(req.params.id).then(favorite => {

      const authorized = new Authorizer(req.user, favorite).destroy();

      if (authorized) {
        favorite.destroy().then(() => {
          callback(null, favorite);
        })
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
  }
}