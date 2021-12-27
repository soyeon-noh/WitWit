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
import witRouter from "./routes/wit.js";
import myroomRouter from "./routes/myroom/myroom.js";
import usersRouter from "./routes/users.js";
import likeyRouter from "./routes/likey.js";
import cors from "cors";
import exportMongooseConfig from "./modules/mongooseConfig.js";
import exportCorsConfig from "./modules/corsConfig.js";
import exportSession from "./modules/sessionConfig.js";
import exportPassport from "./modules/passportConfig.js";

const app = express();

/** mongoose : DB관련 */
/** dotenv : .env 파일 관리 */
exportMongooseConfig();

/** cors : 교차 출처 리소스 공유, 보안 관련 */
exportCorsConfig();

/** session 설정 */
exportSession(app);

/** passport 설정 */
// 위치가 session 아래여야함
exportPassport(app);

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

// cors : 외부 도메인 요청을 선별적으로 허용
app.use((req, res, next) => {
  // cors로 허용해준 protocol + host + port번호 넣어주기
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use("/wit", witRouter);
app.use("/myroom", myroomRouter);
app.use("/likey", likeyRouter);
app.use("/users", usersRouter);

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
