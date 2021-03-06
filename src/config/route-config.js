module.exports = {
  init(app) {
    const staticRoutes   = require("../routes/static"),
          topicRoutes    = require("../routes/topics"),
          postRoutes     = require("../routes/posts"),
          userRoutes     = require("../routes/users"),
          commentRoutes  = require("../routes/comments"),
          voteRoutes     = require("../routes/votes"),
          favoriteRoutes = require("../routes/favorites");
    
    if (process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(userRoutes);
    app.use(commentRoutes);
    app.use(voteRoutes);
    app.use(favoriteRoutes);
  }
}
