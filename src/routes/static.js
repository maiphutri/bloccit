const express = require('express'),
      router  = express.Router();

router.get('/', (req, res, next) => {
  res.send("Welcome to Bloccit");
});

module.exports = router;
