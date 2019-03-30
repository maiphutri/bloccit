const User   = require("./models").User,
      bcrypt = require('bcryptjs');

module.exports = {
  createUser(newUser, callback) {
    const salt           = bcrypt.genSaltSync(),
          hashedPassword = bcrypt.hashSync(newUser.password, salt);
    
    return User.create({
      email: newUser.email,
      password: hashedPassword
    }).then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    })
  }
}