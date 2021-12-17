// user.ctrl.js;

import User from "../models/user.js";
import Joi from "joi";



// url  :  users/join
export const Join = async (req, res, next) => {
  const schema = Joi.object().keys({
    userId: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(5).max(20).required(),
    name: Joi.string(),
    email: Joi.string(),
  });
  // 위에 입력한 조건이 schema에 적합한지 req.body 로 받아와 검사 후 대입
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  const { userId, password, name, email, profileUrl } = req.body;

  try {
    const exists = await User.findByUserId(userId);
    if (exists) {
      return res.sendStatus(409);
    }
    const user = new User({
      userId,
      name,
      email,
      profileUrl,
    });
    await user.setPassword(password);
    await user.save();
    const token = user.getToken();
    res
      .cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .status(201)
      .send(user.serialize());
  } catch (error) {
    next(err);
  }
};
// url : users/login
//test  id :  test password : 1111111
export const login = async (req, res, next) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.sendStatus(401);
  }
  try {
    const user = await User.findByUserId(userId);
    if (!user) {
      res.sendStatus(401);
    }
    const valid = await user.checkedPassword(password);
    if (!valid) {
      return res.sendStatus(401);
    }
    const token = user.getToken();
    res
      .cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .send(user.serialize());
  } catch (error) {
    next(error);
  }
};
// /users/check
export const userCheck = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    return res.sendStatus(401);
  }
  res.json(user);
};

export const userLogout = async (req, res, next) => {
  res.cookie(
    "access_token ",
    "",
    { maxAge: 1, httpOnly: true }.sendStatus(204)
  );
};

export const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.cookies.user;

    const decoded = jwt.verify(clientToken, process.env.JWT_SECRET);

    if (decoded) {
      res.locals.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ error: "token exporired " });
  }
};
