const passport = require("passport"),
      LocalStategy = require("passport-local").Strategy,
      User         = require("../db/models").User,
      authHelp     = require("../auth/helpers");

module.exports = {
  init(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStategy({
      usernameField: "email"
    }, (email, password, done) => {
      User.findOne({ where: {email}}).then(user => {
        if (!user || !authHelp.comparePass(password, user.password)) {
          return done(null, false, {message: "Invalid email or password"});
        }
        return done(null, user);
      })
    }));

    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
      User.findByPk(id).then(user => {
        callback(null, user);
      })
      .catch(err => {
        callback(err, user);
      })
    })
  }
}
