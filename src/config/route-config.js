module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static"),
          topicRoutes  = require("../routes/topics"),
          postRoutes   = require("../routes/posts"),
          flairRoutes  = require("../routes/flairs");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
  }
}
