var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var models = require("./models");
var cors = require("cors");

var auth = require("./services/auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var inventoriesRouter = require("./routes/inventories");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(async (req, res, next) => {
  //get token from the request
  const header = req.headers.authorization;
  console.log("HEADER", header);

  if (!header) {
    return next();
  }

  const token = header.split(" ")[1];
  console.log("TOKEN", token);

  //validate token / get the user
  const user = await auth.verifyUser(token);

  req.user = user;
  next();
});

models.sequelize.sync({ alter: true }).then(function () {
  console.log("DB sync'd up");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventories", inventoriesRouter);

module.exports = app;
