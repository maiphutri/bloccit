module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static"),
          topicRoutes  = require("../routes/topics"),
          postRoutes   = require("../routes/posts"),
          userRoutes   = require("../routes/users");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(userRoutes);
  }
}
