const express        = require('express'),
      router         = express.Router(),
      userController = require("../controllers/userController"),
      validation     = require("./validation");

router.get("/users/sign_up", userController.signUp);
router.post("/users", validation.validateUsers, userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUserSignIn, userController.signIn);
router.get("/users/sign_out", userController.signOut);

module.exports = router;