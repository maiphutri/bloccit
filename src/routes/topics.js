const express = require('express'),
      router  = express.Router(),
      topicController = require('../controllers/topicController');

router.get("/topics", topicController.index);

module.exports = router;
