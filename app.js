var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var models = require("./models");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var inventoriesRouter = require("./routes/inventories");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

models.sequelize.sync({ alter: true }).then(function () {
  console.log("DB sync'd up");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventories", inventoriesRouter);

module.exports = app;
