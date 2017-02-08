var User = require('../../models/user');

module.exports = {
  getUsers: function(req, res, next) {
    User.find(function(err, users) {
      if (err) {
        res.send('Technical error')
      }
      else {
        res.json(users);
      }
    });
  },
  updateUser: function(req, res, next) {
    var user = req.params.username;
    var changedField = Object.keys(req.body.changedField)[0];
    var changedValue = req.body.changedField[changedField];
    var newUserInfo = req.body;
  
    if (!newUserInfo) {
      res.status
      (400);
      res.json({
        "error": "Invalid Data"
      });
    } else {
      checkUser(changedField, changedValue, user, res);
    }
  }
};

function checkUser(field, value, user, res) {
  User.findOne({ email: user.email }, function (err, checkUser) {
    if (checkUser) {
      res.json({ error: 'User with this email exist!' });
    } else {
      User.findOne({'username': user}, function (err, existingUser) {
        if (err) {
          res.json({ error: 'Error - No such user!' });
        } else {
          for (var prop in existingUser) {
            if (prop === field) {
              existingUser[prop] = value;
            }
          }
          existingUser.save(function (err, docs) {
            res.json({ user: existingUser });
          });
        }
      });
    }
  });
}