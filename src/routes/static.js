const express = require('express'),
      router  = express.Router();

router.get('/', (req, res, next) => {
  res.send("Welcome to Bloccit");
});

router.get('/marco', (req, res, next) => {
  res.send('polo')
})

module.exports = router;
