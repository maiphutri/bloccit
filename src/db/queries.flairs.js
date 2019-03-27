const Flair = require("./models").Flair,
      Post  = require("./models").Post;

module.exports = {
  addFlair(newFlair, callback) {
    return Flair.create(newFlair).then(flair => {
      callback(null, flair);
    })
    .catch(err => {
      console.log(err);
    })
  },
  
  getFlair(id, callback) {
    return Flair.findByPk(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then(flair => {
      callback(null, flair);
    })
    .catch(err => {
      callback(err);
    })
  },

  getAllFlairs(topicId, callback) {
    return Flair.findAll({ where: {topicId: topicId} }).then(flairs => {
      callback(null, flairs);
    })
    .catch(err => {
      console.log(err);
    })
  },

  deleteFlair(id, callback) {
    return Flair.destroy({ where: {id} }).then(deletedFlair => {
      callback(null, deletedFlair);
    })
    .catch(err => {
      console.log(err);
    })
  },

  updateFlair(id, updatedFlair, callback) {
    return Flair.findByPk(id).then(flair => {
      if (!flair) {
        return callback("Flair not found");
      }

      flair.update(updatedFlair, {
        field: Object.keys(updatedFlair)
      })
      .then(() => {
        callback(null, flair);
      })
      .catch(err => {
        callback(err);
      })
    })
  }
}