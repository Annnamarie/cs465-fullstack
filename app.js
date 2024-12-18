require('dotenv').config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


// mod 2  adding app_server folder to app path and wire the travlr controller
// Define routers
var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var travelRouter = require("./app_server/routes/travel");
//mod5 - apiRouter
var apiRouter = require('./app_api/routes/index');

//mod 2 - partials directory with the templating engine
var handlebars = require("hbs");

//mod 7 
const passport = require('passport');

//mod5 - bring in the db
require('./app_api/models/db');
//mod 7 
require('./app_api/config/passport');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

//mod 2 - partials directory with the templating engine
//register handlers partials (https://www.npmjs.com/package/hbs)
handlebars.registerPartials(__dirname + "/app_server/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//mod7
app.use(passport.initialize());

//mod6 - Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

//wire-up routers to controllers
app.use("/", indexRouter);
app.use("/users", usersRouter);
//mod 2
app.use("/travel", travelRouter);
//mod5
app.use("/api", apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//catch unathorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === 'UnathorizedError') {
    res
      .status(401)
      .json({"message": err.name + ': ' + err.message});
  }
});

module.exports = app;
