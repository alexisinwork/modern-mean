var User = require('../../models/user');

module.exports = {
  getTodos: function(req, res, next) {
    var user = req.params.username;
    
    User.findOne({ 'username': user }, function(err, user) {
      if (err) {
        res.send('Error - No such user!')
      }
      else {
        res.json(user['todos']);
      }
    });
  },
  updateTodo: function(req, res, next) {
    var user = req.params.username;
    var todoId = +req.params.id;
  
    var todoNew = req.body;
  
    if (!todoNew) {
      res.status(400);
      res.json({
        "error": "Invalid Data"
      });
    } else {
      User.findOne({ 'username': user }, function(err, user) {
        if (err) { res.send('Error - No such user!') }
        else {
          var todos = user['todos'];
        
          // set the data for each key
          todos.forEach(function(todo) {
            if (todo.id === todoId) {
              todo['id'] = todoNew.id;
              todo['isCompleted'] = todoNew.isCompleted;
              todo['text'] = todoNew.text;
              todo['description'] = todoNew.description;
            }
          });
        
          user.save(function (err, docs) {
            res.send(todoNew);
          });
        }
      });
    }
  },
  getTodo: function(req, res, next) {
    var user = req.params.username;
    var todoId = +req.params.id;
    var todoSend;
  
    User.findOne({ 'username': user }, {}, {}, function(err, user) {
      if (err) { res.send('Error - No such user!') }
      else {
        var todos = user['todos'];
      
        // set the data for each key
        todos.forEach(function(todo) {
          if (todo.id === todoId) {
            todoSend = todo;
          }
        });
      
        res.json(todoSend);
      }
    });
  },
  saveTodo: function(req, res, next) {
    var user = req.params.username;
    var todoNew = req.body;
  
    if (!todoNew) {
      res.status(400);
      res.json({
        "error": "Invalid Data"
      });
    } else {
      User.findOne({ 'username': user }, function(err, user) {
        if (err) { res.send('Error - No such user!') }
        else {
          var todos = user['todos'];
        
          // save new one
          todos.push(todoNew);
        
          user.save(function (err, docs) {
            res.json(todoNew);
          });
        }
      });
    }
  },
  deleteTodo: function(req, res) {
    var user = req.params.username;
    var todoId = +req.params.id;
  
    User.findOne({ 'username': user }, function(err, user) {
      if (err) { res.send('Error - No such user!') }
      else {
        var todos = user['todos'];
      
        // save new one
        todos.forEach(function (val, i, arr) {
          if(arr[i]['id'] === todoId) {
            arr.splice(i, 1);
          }
        });
      
        user.save(function (err, docs) {
          res.json("Deleted");
        });
      }
    });
  }
};