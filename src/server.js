const app    = require('./app.js'),
      http   = require('http'),
      server = http.createServer(app);

server.listen(3000);

server.on('listening', () => {
  console.log('server is listening for request on port 3000');
})
