const express = require('express'),
      router  = express.Router(),
      ruleController = require('../controllers/ruleController');

router.get("/rules", ruleController.index);

module.exports = router;
