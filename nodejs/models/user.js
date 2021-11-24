import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = Schema({
  id: string, // 사용자의 고유한 아이디
  userId: string, // 사용자가 작성한 아이디
  password: string, // 사용자 비밀번호
  name: string, // 사용자 nickname
  email: string, // 사용자 email

  profileUrl: string, // 프로필사진 (optional)
});

export default mongoose.model("user", user);
