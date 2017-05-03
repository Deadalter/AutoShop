var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var cookieSession = require('cookie-session');
var sessionStore = require('connect-mongo')(session);
var config = require('./app/config').confProduction;

var models = require('./models/models');
var routes = require('./routes/routes');

var app = express();


// view engine setup Устанавка папки с представлениями и подключение Jade
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //иконка сайта
app.use(logger('dev')); //Включение логгера
app.use(bodyParser.json()); //Подключение парсера (для получения json из форм)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //Подключения парсера cookie (для сессий)
app.use(session({  //Подключение сессий (указывается сервертная фраза, хранилише сессий, ключ)
    secret: 'asdf',
    store: new sessionStore({
        url: 'mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.host+':'+config.db.port+'/'+config.db.databases
    }),
    keys: 'skey',
    saveUninitialized: true,
    resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));  //Подключение папки со статическимим файлами (стилями, скриптами, изображениями)


app.use('/', routes); //Перенаправление всех запросов на роутер (routes.js)

// catch 404 and forward to error handler
app.use(function(req, res, next) {  //Подключение модуля для ощибки 404
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
