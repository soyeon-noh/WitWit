import mongoose from "mongoose";
import bcrypt from "bcrypt";
import autoIncrement from "mongoose-auto-increment";
import Joi from "joi";

const Schema = mongoose.Schema;
/**
 * JWT JSON Web Token 약자, 각객체 사이에서 속성정보를 데이터 구조로 표현하고 암호화를 통해 정보를 전달하는 Token 의 대표
 *
 */
const userSchema = new Schema({
  userId: { type: String, trim: true }, // 사용자가 작성한 아이디
  password: { type: String, trim: true }, // 사용자 비밀번호
  userName: { type: String }, // 사용자 nickname
  email: { type: String }, // 사용자 email
  profileUrl: { type: String }, // 프로필사진 (optional)
});

const User = mongoose.model("user", userSchema);
export default User;
