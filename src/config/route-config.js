module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static"),
          topicRoutes  = require("../routes/topics"),
          postRoutes   = require("../routes/posts");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
  }
}
