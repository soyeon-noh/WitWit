/**
 * express generator ES6+ template
 * @edit : callor@callor.com
 * @since : 2020-12-10
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import methodOverride from "method-override";
import passport from "passport";
import MongoClient from "mongodb";

import witRouter from "./routes/witRouter.js";
import usersRouter from "./routes/users.js";
import myroom from "./routes/myroom.js";
import cors from "cors";
// Connection url
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "test";
// Connect using MongoClient
MongoClient.connect(url, function (err, client) {
  // Select the database by name
  const testDb = client.db(dbName);
  client.close();
});
const app = express();

// Disable the fingerprinting of this web technology. 경고
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./public")));

app.use("/", witRouter);
app.use("/users", usersRouter);
app.use("/myroom", myroom.js);
app.use("/myroom/folder", myroomfolder.js);
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

export default app;
