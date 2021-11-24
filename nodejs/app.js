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

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import myroom from "./routes/myroom.js";
import cors from "cors";
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

// 아래 미들웨어방식
// get과 post방식을 이용한 서버요청방식을 , put, delete가 되도록확장시킨다
app.use(methodOverride("_method"));
// 로그인 세션관리기능
// app.use(
//   session({ secret: "비밀코드", resave: true, saveUninitialized: false })
// );
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
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
