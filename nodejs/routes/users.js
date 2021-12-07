import express from "express";
import { v4 } from "uuid";
import userSchema from "../models/user.js";
import bcrypt from "bcryptjs";

const userSession = express.Router();

/**
 * 회원인증방법 : session - based
 *
 */
const user_test = [
  {
    id: "1", // 사용자의 고유한 아이디 번호..?
    userId: "test", // 사용자가 작성한 아이디
    password: 123, // 사용자 비밀번호
    name: "위트위트", // 사용자 nickname
    email: "witwit@google.com", // 사용자 email

    profileUrl: "프로필 url", // 프로필사진 (optional)
  },
];
/* GET users listing. */
userSession.get("/", function (req, res, next) {
  res.send("hello session");
});

userSession.post("/login", function (req, res) {
  const comp = req.body;
  const userId = comp.userId;
  const password = comp.password;

  if (userId === user_test.userId && password === user_test.password) {
    console.log("받아온정보 ", userId, password);
    res.send("Hi");
  } else {
    res.send("Who???");
  }
});

userSession.post("/join", async (req, res) => {
  //   console.log(res.body);
  const { userId, password, name, email } = req.body;
  try {
    let userData = await userSchema.findOne({ email });
    if (userData) {
      return res.status(400).json({ errors: [{ msg: "User already exits " }] });
    }

    userData = new userSchema({
      id: v4(), // 사용자의 고유한 아이디 번호..?
      userId: userId, // 사용자가 작성한 아이디
      password: password, // 사용자 비밀번호
      name: name, // 사용자 nickname
      email: email, // 사용자 email
    });
    const salt = await bcrypt.genSalt(10);
    userData.passowrd = await bcrypt.hash(password, salt);

    await userData.save();
    await res.send("가입완료");
  } catch (error) {
    console.log(error);
    res.send("저장실패");
  }
});
export default userSession;
