const express        = require('express'),
      router         = express.Router(),
      voteController = require("../controllers/voteController");

router.get("/topics/:topicId/posts/:postId/votes/upvote", voteController.upvote);
router.get("/topics/:topicId/posts/:postId/votes/downvote", voteController.downvote);
      
module.exports = router;