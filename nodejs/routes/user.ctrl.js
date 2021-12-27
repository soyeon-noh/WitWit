// user.ctrl.js;

import USER from "../models/user.js";
import FOLLOW from "../models/follow.js";
import Joi from "joi";
import { v4 } from "uuid";

// url :  users/login
// 테스트용 유저 정보  userId : @test password : 1234567
export const login = async (req, res, next) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.sendStatus(401);
  }

  /**
   * passportCOnfig에서도 같은 검사를 하고 있는데
   * message값을 어떻게 활용해야할지 모르겠다
   * status 가 아무 영향이없다... 어떻게 해야하지.
   */
  const user = await USER.findByUserId(userId);
  if (!user) {
    return res.status(401).send("Incorrect userId");
    // return res.sendStatus(401);
  }
  const valid = await user.checkedPassword(password);
  console.log("valid: ", valid);
  if (!valid) {
    return res.status(401).send("Incorrect password");
    // return res.sendStatus(401);
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
    userName,
    email,
    profileUrl,
  });
  await user.setPassword(password);
  await user.save();

  res.json(user);
};

// url :  /users/logout
export const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    res.redirect("/");
  });
};

// url : /users/:user_id/follow
export const follow = async (req, res, next) => {
  const user_id = req.user.userId;
  const target_id = req.params.user_id;

  if (user_id) {
    const findedFollow = await FOLLOW.find({
      user_id,
      target_id,
    });

    if (!findedFollow) {
      const follow = new FOLLOW({
        id: v4(),
        user_id,
        target_id,
      });
      await follow.create(follow);
    } else {
      await FOLLOW.deleteOne({ id: findedFollow.id });
    }
  } else {
    /** 유저가없는경우 어떻게 처리해야할지 고민필요 */
    res.status(404).send("no user");
  }
};
