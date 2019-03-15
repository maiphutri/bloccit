const express = require('express'),
      app     = express(),
      routeConfig = require('./config/route-config.js');

routeConfig.init(app);

module.exports = app;
