// Import important libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
// Import mongoose to connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongo-aws');
// Here all API defined for application
var api = require('./routes/api');
// Invoke express app
var app = express();
// Model for User
var User = require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Passport to authenticate user on login
app.use(session({ secret: "this is the secret" })); // Hash user information in cookie
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Passport usage
passport.use(new localStrategy(function(username, password, done) {
  User.findOne({ username: username, password: password }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
  })
}));
// Passport transform user object to cookie
passport.serializeUser(function(user, done){
  done(null, user);
});
// Passport transform to object from cookie
passport.deserializeUser(function(user, done) {
  User.findById(user._id, function (err, user) {
    done(err, user);
  });
});
// Routes /api for api and other for frontend
app.use('/api', api);
app.use('/*', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
