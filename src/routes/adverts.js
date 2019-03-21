const express          = require("express"),
      router           = express.Router(),
      advertController = require("../controllers/advertController");

router.get("/advertisement", advertController.index);
router.get("/advertisement/new", advertController.new);
router.post("/advertisement/create", advertController.create);
router.get("/advertisement/:id", advertController.show);
router.post("/advertisement/:id/destroy", advertController.destroy);
router.get("/advertisement/:id/edit", advertController.edit);
router.post("/advertisement/:id/update", advertController.update);

module.exports = router;
