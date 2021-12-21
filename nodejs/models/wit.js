import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
// const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const wit = Schema({
  id: { type: Number, default: 0 }, // 위트 아이디
  //   text: { type: String, required: true }, // 위트 텍스트 (512자 제한)
  text: String, // 위트 텍스트 (512자 제한)
  createdDate: String, // 위트 생성 날짜
  createdTime: String, // 위트 생성 시간
  userId: String, // 작성자 ID
  userName: String, // 작성자 이름
  profileUrl: String, // 작성자 프로필 이미지링크

  parentWit: Number, // 이전 위트 id값
  //   originalWit: Number, // 인용,리마크당한 오리지널위트 id값

  folder_id: String, // 폴더 seq (외래키)
  image_id: String, // 이미지 seq (외래키)
});

wit.plugin(autoIncrement.plugin, {
  model: "witModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("wit", wit);
