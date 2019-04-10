const express            = require("express"),
      router             = express.Router(),
      favoriteController = require("../controllers/favoriteController");
      
router.post("/topics/:topicId/posts/:postId/favorites/create", favoriteController.create);
router.post("/topics/:topicId/posts/:postId/favorites/:id/destroy", favoriteController.destroy);

module.exports = router;