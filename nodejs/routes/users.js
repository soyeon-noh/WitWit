import express from "express";

const router = express.Router();
/**
 * 회원인증방법 : session - based
 *
 */
const user_test = [
  {
    id: "1", // 사용자의 고유한 아이디 번호..?
    userId: "@__witwit1", // 사용자가 작성한 아이디
    password: "123", // 사용자 비밀번호
    name: "위트위트", // 사용자 nickname
    email: "witwit@google.com", // 사용자 email

    profileUrl: "프로필 url", // 프로필사진 (optional)
  },
  {},
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default router;
