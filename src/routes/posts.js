const express        = require('express'),
      router         = express.Router(),
      postController = require("../controllers/postController"),
      validation     = require("./validation");

router.get("/topics/:topicId/posts/new", postController.new);
router.post("/topics/:topicId/posts/create", validation.validatePosts, postController.create);
router.get("/topics/:topicId/posts/:id", postController.show);
router.post("/topics/:topicId/posts/:id/destroy", postController.destroy);
router.get("/topics/:topicId/posts/:id/edit", postController.edit);
router.post("/topics/:topicId/posts/:id/update", validation.validatePosts, postController.update);

module.exports = router;
