import express from "express";
import passport from "passport";
const users = express.Router();
import * as userCtrl from "./user.ctrl.js";
/**
 * passport를 사용하여 Login을 수행할 때
 * router의 path와 callback 함수 사이에서 login 정책을 수행할 미들웨어
 * passport.authenticate("local")
 */

/* GET users listing. */
users.get("/info", userCtrl.loginUserInfo);
users.get("/info/:user_id", userCtrl.userInfo);
users.get("/check", userCtrl.userCheck);

users.post("/login", passport.authenticate("local"), userCtrl.login);
users.post("/join", userCtrl.join);
// users.post("/logout", (req, res) => {
//   console.log("뭐야");
//   res.send("진짜개빡쳐");
// });
users.post("/logout", userCtrl.logout);

export default users;
