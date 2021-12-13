import express from "express";
const users = express.Router();
import * as userCtrl from "./user.ctrl.js";
/**
 * 회원인증방법 : session - based
 *
 */

/* GET users listing. */
users.post("/login", userCtrl.login);
users.post("/join", userCtrl.Join);
export default users;
