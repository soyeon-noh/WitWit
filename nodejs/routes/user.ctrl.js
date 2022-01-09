// user.ctrl.js;

import USER from "../models/user.js";
import Joi from "joi";
import createError from "http-errors";

import passport from "passport";

// url :  users/login
// https://www.passportjs.org/docs/authenticate/
export const login = async (req, res, next) => {
  console.log("아니이거왜안됨?");
  passport?.authenticate(
    "local",
    { failureFlash: true },
    async (err, user, info) => {
      console.log("authenticate...");
      console.log("info message: ", info?.message);

      if (err) {
        return res.json(err);
      }
      if (!user) return next(createError(401)());
      if (info?.message === "login success") {
        console.log("req.logIn: ", req.logIn);
        req.logIn(user, (err) => {
          if (err) return res.json(err);

          console.log("로그인성공");
          return res.json({
            message: "login success",
            user: user,
          });
        });
      }
    }
  )(req, res, next);

  // const { userId, password } = req.body;

  // if (!userId || !password) {
  //   return res.sendStatus(401);
  // }

  // const user = await USER.findByUserId(userId);

  // console.log("로그인성공");
  // res.json(user);
};

// url :  users/join
export const join = async (req, res) => {
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
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    req.logout();
    res.redirect("/");
  });
};

// export const loginUserInfo = async (req, res, next) => {
//   if (req.user) {
//     //   const result = await getUser(req, res, { userId: "@test" });
//     const result = await getUser(req, res, { userId: req.user.userId });
//     res.json(result);
//   } else {
//     res.json(false);
//   }
// };

export const userInfo = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await getUser(req, res, { userId: user_id });

  res.json(result);
};

export const userCheck = async (req, res) => {
  const user = await req.user;
  console.log("userCheck user: ", user);
  if (user) {
    res.json(user);
  } else {
    res.json(false);
  }
};

const getUser = async (req, res, searchQuery) => {
  const result = await USER.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: "follows",
        localField: "userId",
        foreignField: "user_id",
        as: "following",
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "userId",
        foreignField: "target_id",
        as: "follower",
      },
    },
    {
      $project: {
        id: 1,
        userId: 1,
        password: 1,
        userName: 1,
        email: 1,
        profileUrl: 1,

        following: "$following",
        follower: "$follower",
        followingCount: { $size: "$following" },
        followerCount: { $size: "$follower" },
      },
    },
  ]);
  return result;
};
