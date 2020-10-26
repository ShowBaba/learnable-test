/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");
const passport = require("passport");
const cors = require('cors');


const indexRouter = require("./routes/index.route");
const usersRouter = require("./routes/users.route");
const mealsRouter = require("./routes/meal.route");
const ordersRouter = require("./routes/order.route");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/api/v1/", indexRouter);
app.use("/api/v1/admin", usersRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/orders", ordersRouter);

// set up a wildcard route
app.get("*", (req, res) => {
  res.redirect("/api/v1");
});

app.use(express.static(path.join(__dirname, "public")));

const localUrl = config.mongoUrl;
const liveUrl = process.env.DB_CONNECTION;

const connect = mongoose.connect(liveUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// establish connection
connect.then(
  // eslint-disable-next-line no-unused-vars
  (db) => {
    console.log("Connected to Database");
  },
  (err) => {
    console.log(err);
  }
);

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

module.exports = app;
