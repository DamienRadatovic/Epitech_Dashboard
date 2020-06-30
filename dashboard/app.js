var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
mongoose.Promise = global.Promise;

// Change to mongodb://127.0.0.1:27017/dashboard if error

mongoose.connect('mongodb://mongo:27017/dashboard')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var steamRouter = require('./routes/steam');
var twitterRouter = require('./routes/twitter');
var spotifyRouter = require('./routes/spotify');
var youtubeRouter = require('./routes/youtube');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/steam', steamRouter);
app.use('/twitter', twitterRouter);
app.use('/spotify', spotifyRouter);
app.use('/youtube', youtubeRouter);

var OpenIDStrategy = require('passport-openid').Strategy;
var SteamStrategy = new OpenIDStrategy({
      providerURL: 'http://steamcommunity.com/openid',
      stateless: true,
      returnURL: 'http://127.0.0.1:3000/steam/sessions/callback',
      realm: 'http://127.0.0.1:3000/',
    },
    function(identifier, done) {
      process.nextTick(function () {
        var user = {
          identifier: identifier,
          steamId: identifier.match(/\d+$/)[0]
        };
        console.log(user);
        return done(null, user);
      });
    });
passport.use(SteamStrategy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
var User = require('./model/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = app;
