const express          = require('express'),
      router           = express.Router(),
      staticController = require("../controllers/staticController.js");

router.get("/", staticController.index);
router.get("/about", staticController.about);

module.exports = router;
