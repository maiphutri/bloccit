require('dotenv').config();
const path       = require('path'),
      viewFolder = path.join(__dirname, "..", "views"),
      bodyParser = require('body-parser');

module.exports = {
  init(app, express) {
    app.set("views", viewFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")))
  }
}
