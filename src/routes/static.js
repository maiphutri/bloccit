const express          = require('express'),
      router           = express.Router(),
      staticController = require("../controllers/staticController.js");

router.get("/", staticController.index);

module.exports = router;
