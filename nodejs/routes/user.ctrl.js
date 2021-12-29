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

  /**
   * passportCOnfig에서도 같은 검사를 하고 있는데
   * message값을 어떻게 활용해야할지 모르겠다
   * status 가 아무 영향이없다... 어떻게 해야하지.
   */
  const user = await USER.findByUserId(userId);
  //   if (!user) {
  //     return res.status(401).send("Incorrect userId");
  //     // return res.sendStatus(401);
  //   }
  //   const valid = await user.checkedPassword(password);
  //   console.log("valid: ", valid);
  //   if (!valid) {
  //     return res.status(401).send("Incorrect password");
  //     // return res.sendStatus(401);
  //   }

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

export const loginUserInfo = async (req, res, next) => {
  if (req.user) {
    //   const result = await getUser(req, res, { userId: "@test" });
    const result = await getUser(req, res, { userId: req.user.userId });
    //   console.log("user result:", result);
    res.json(result);
  } else {
    res.send(false);
  }
};

export const userInfo = async (req, res, next) => {
  const user_id = req.params.user_id;
  const result = await getUser(req, res, { userId: user_id });
  //   console.log("user result:", result);
  res.json(result);
};

export const userCheck = (req, res, next) => {
  const user = req.user;
  if (user) {
    res.json(user);
  } else {
    res.send(false);
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
