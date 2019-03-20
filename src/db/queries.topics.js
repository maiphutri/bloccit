const Topics = require("./models").Topics;

module.exports = {
  getAllTopics(callback) {
    return Topics.findAll().then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
