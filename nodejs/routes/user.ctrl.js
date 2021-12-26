// user.ctrl.js;

// import User from "../models/user.js";

// url :  users/login
// 테스트용 유저 정보  userId :  test password : 1234567
export const login = async (req, res, next) => {
  // const { userId, password } = req.body;

  // if (!userId || !password) {
  //   return res.sendStatus(401);
  // }
  // try {
  //   const user = await User.findByUserId(userId);
  //   if (!user) {
  //     res.sendStatus(401);
  //   }
  //   const valid = await user.checkedPassword(password);
  //   if (!valid) {
  //     return res.sendStatus(401);
  //   }

  console.log(req.user);
  res.json({ user: req.user });

  // const token = user.getToken();
  // res
  //   .cookie("access_token", token, {
  //     maxAge: 1000 * 60 * 60 * 24 * 7,
  //     httpOnly: true,
  //   })
  //   .send(user.serialize());
  // } catch (error) {
  //   next(error);
  // }
};

// url :  users/join
export const join = async (req, res, next) => {};

// user :  /user/logout
export const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    res.redirect("/");
  });
};

// /users/check
export const userCheck = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    return res.sendStatus(401);
  }
  res.json(user);
};
