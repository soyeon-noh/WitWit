// user.ctrl.js;

import USER from "../models/user.js";
import Joi from "joi";

// url :  users/login
// 테스트용 유저 정보  userId : @test password : 1234567
export const login = async (req, res, next) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.sendStatus(401);
  }
  const user = await USER.findOne({ userId });
  if (!user) {
    return res.send("Incorrect userId");
  }
  if (user.password != password) {
    return res.send("Incorrect password");
  }

  console.log("로그인성공");
  res.json(user);
};

// url :  users/join
export const join = async (req, res, next) => {
  const schema = Joi.object().keys({
    userId: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(5).max(20).required(),
    userName: Joi.string(),
    email: Joi.string(),
  });

  // 위에 입력한 조건이 schema에 적합한지 req.body 로 받아와 검사 후 대입
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  let { userId, password, userName, email, profileUrl } = req.body;

  userId = "@" + userId;
  console.log("회원가입 입력정보 : ", req.body);
  // const exists = await USER.findByUserId(userId);
  const exists = await USER.findOne({ userId: userId });
  if (exists) {
    return res.sendStatus(409);
  }
  const user = new USER({
    userId,
    password,
    userName,
    email,
    profileUrl,
  });
  // await user.setPassword(password);
  await user.save();

  res.json(user);
};

// user :  /user/logout
export const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    res.redirect("/");
  });
};
