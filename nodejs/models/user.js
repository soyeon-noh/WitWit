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
  id: { type: Number, default: 0 },
  userId: { type: String, trim: true }, // 사용자가 작성한 아이디
  password: { type: String, trim: true }, // 사용자 비밀번호
  userName: { type: String }, // 사용자 nickname
  email: { type: String }, // 사용자 email
  profileUrl: { type: String }, // 프로필사진 (optional)
});

userSchema.plugin(autoIncrement.plugin, {
  model: "userModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

userSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

userSchema.methods.checkedPassword = async function (password) {
  //   console.log("password: ", password, ", this.password: ", this.password);
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.statics.findByUserId = function (userId) {
  return this.findOne({ userId });
};

const User = mongoose.model("user", userSchema);
export default User;
