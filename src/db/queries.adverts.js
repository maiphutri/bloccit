const Advertisement = require("./models").Advertisements;

module.exports = {
  getAllAdverts(callback) {
    return Advertisement.findAll().then((adverts) => {
      callback(null, adverts);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addAdvert(newAdvert, callback) {
    return Advertisement.create({
      title: newAdvert.title,
      description: newAdvert.description
    })
    .then((advert) => {
      callback(null, advert);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvert(id, callback) {
    return Advertisement.findByPk(id).then((advert) => {
      callback(null, advert);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteAdvert(id, callback) {
    return Advertisement.destroy({
      where: {id}
    }).then((advert) => {
      callback(null, advert);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateAdvert(id, updatedAdvert, callback) {
    return Advertisement.findByPk(id).then((advert) => {
      if (!advert) return callback("Advertisement not found");

      advert.update(updatedAdvert, {
        field: Object.keys(updatedAdvert)
      })
      .then(() => {
        callback(null, advert);
      })
      .catch((err) => {
        callback(err);
      })
    })
  }

}
