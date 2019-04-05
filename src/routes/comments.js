const express = require("express"),
      router  = express.Router(),
      commentController = require("../controllers/commentController"),
      validation = require("./validation");

router.post("/topics/:topicId/posts/:postId/comments/create", validation.validateComments, commentController.create);
router.post("/topics/:topicId/posts/:postId/comments/:id/destroy", commentController.destroy);
      
module.exports = router;