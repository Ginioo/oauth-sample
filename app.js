var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({
  secret: 'recommand 128 bytes random string',
  name: '_s', // session id key
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 120 * 1000 } // expired in 2 minutes
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
