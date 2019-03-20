const express = require('express'),
      router  = express.Router(),
      topicController = require('../controllers/topicController');

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.post("/topics/create", topicController.create);
router.get("/topics/:id", topicController.show);
router.post("/topics/:id/destroy", topicController.destroy);
router.get("/topics/:id/edit", topicController.edit);
router.post("/topics/:id/update", topicController.update);

module.exports = router;
