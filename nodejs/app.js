/**
 * express generator ES6+ template
 * @edit : callor@callor.com
 * @since : 2020-12-10
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */
import createError from "http-errors";
import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import methodOverride from "method-override";
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";

import witRouter from "./routes/wit.js";
import myroomRouter from "./routes/myroom/myroom.js";
import usersRouter from "./routes/users.js";
import folder from "./routes/myroom/folder/folder.js";
import cors from "cors";

// mongoose : DB관련
import mongoose from "mongoose";

const dbConn = mongoose.connection;
dbConn.once("open", () => {
  console.log("˚✧₊⁎( ˘ω˘ )⁎⁺˳✧༚ \n MongoDB Open !! \n ˚✧₊⁎⁺˳✧༚˚✧₊⁎⁺✧˳");
});
dbConn.on("error", () => {
  console.error;
});

dotenv.config(path.join("./.env"));
mongoose.connect(process.env.NODEJS_APP_MONGOURL);

// cors : 교차 출처 리소스 공유, 보안 관련
const whiteURL = ["http://localhost:3000"];
const corsOption = {
  origin: (origin, callback) => {
    const isWhiteURL = whiteURL.indexOf(origin) !== -1;
    callback(null, isWhiteURL);
  },
  // 로그인 후 세션정보를 클라이언트에게 전달 허용
  credentials: true,
};

const app = express();

// view engine setup
app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./public")));
app.use(methodOverride("_method"));
//session 방식 로그인 구현
app.use(
  session({ secret: "비밀코드 ", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// cors : 외부 도메인 요청을 선별적으로 허용
app.use((req, res, next) => {
  // cors로 허용해준 protocol + host + port번호 넣어주기
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use("/", witRouter);
app.use("/", myroomRouter);
app.use("/users", usersRouter);
app.use("/folder", folder);

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
