var User = require('../../models/user');

module.exports = {
  login: function (req, res) {
    const userToFind = req.body;
    User.findOne({
      username: userToFind.username,
      password: userToFind.password
    }, function (err, user) {
      if (err) res.json(err);
      res.json(user);
    });
  },
  loggedIn: function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  },
  logout: function(req, res) {
    req.logout();
    res.json({ text: 'You are now logged out' });
  },
  register: function (req, res) {
    var user = req.body;
    User.findOne({email: user.email}, function (err, existingUser) {
      if (existingUser === null) {
        User.findOne({username: user.username}, function (err, secondExistingUser) {
          if (secondExistingUser === null) {
            User.create(user, function (err, user) {
              res.json(user);
            })
          } else {
            res.json(null);
          }
        });
      } else {
        res.json(null);
      }
    });
  }
};