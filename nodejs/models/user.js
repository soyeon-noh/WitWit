import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = Schema({
  id: String, // 사용자의 고유한 아이디
  userId: String, // 사용자가 작성한 아이디
  password: String, // 사용자 비밀번호
  name: String, // 사용자 nickname
  email: String, // 사용자 email

  profileUrl: String, // 프로필사진 (optional)
});

export default mongoose.model("user", user);
