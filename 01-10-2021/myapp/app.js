var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//MongoDB Connection
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var countryRouter = require('./routes/country');
var usersRouter = require('./routes/users');
var stateRouter = require('./routes/state');
var cityRouter = require('./routes/city');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Db Connection Start 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mydb:mydb@localhost:27017/dropdown', { useNewUrlParser: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err)) 
//DB Connection End


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/country', countryRouter);
app.use('/state', stateRouter);
app.use('/city',cityRouter);
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

module.exports = app;



