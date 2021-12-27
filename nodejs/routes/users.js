import express from "express";
import passport from "passport";
const router = express.Router();
import * as userCtrl from "./user.ctrl.js";
/**
 * passport를 사용하여 Login을 수행할 때
 * router의 path와 callback 함수 사이에서 login 정책을 수행할 미들웨어
 * passport.authenticate("local")
 */

/* GET users listing. */
router.post("/login", passport.authenticate("local"), userCtrl.login);
router.post("/join", userCtrl.join);
router.post("/logout", userCtrl.logout);
// router.post("/check", userCtrl.userCheck);

export default router;
