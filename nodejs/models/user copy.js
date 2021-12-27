// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import autoIncrement from "mongoose-auto-increment";
// import Joi from "joi";
// autoIncrement.initialize(mongoose.connection);

// const Schema = mongoose.Schema;
// /**
//  * JWT JSON Web Token 약자, 각객체 사이에서 속성정보를 데이터 구조로 표현하고 암호화를 통해 정보를 전달하는 Token 의 대표
//  *
//  */
// const UserSchema = new Schema({
//   id: { type: Number, default: 0 },
//   // 사용자의 고유한 아이디 번호..?
//   userId: { type: String, trim: true }, // 사용자가 작성한 아이디
//   password: { type: String, trim: true }, // 사용자 비밀번호
//   userName: { type: String }, // 사용자 nickname
//   email: { type: String }, // 사용자 email

//   profileUrl: String, // 프로필사진 (optional)
// });

// UserSchema.methods.setPassword = async function (password) {
//   const hash = await bcrypt.hash(password, 10);
//   this.password = hash;
// };

// UserSchema.methods.checkedPassword = async function (password) {
//   const result = await bcrypt.compare(password, this.password);
//   return result;
// };

// UserSchema.methods.serialize = function () {
//   const data = this.toJSON();
//   delete data.password;
//   return data;
// };

// UserSchema.methods.getToken = function () {
//   const token = jwt.sign(
//     {
//       _id: this.id,
//       username: this.userId,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "7d", //7d일
//     }
//   );
//   return token;
// };

// UserSchema.statics.findByUserId = function (userId) {
//   return this.findOne({ userId });
// };

// const User = mongoose.model("user", UserSchema);
// export default User;
