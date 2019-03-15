const express     = require('express'),
      app         = express(),
      appConfig   = require('./config/main-config.js')
      routeConfig = require('./config/route-config.js');

appConfig.init();
routeConfig.init(app);

module.exports = app;
