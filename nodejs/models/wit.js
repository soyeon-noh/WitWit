import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wit = Schema({
  id: string, // 위트 아이디
  text: string, // 위트 텍스트 (512자 제한)
  createdAt: Date, // 위트 생성 날짜
  userId: string, // 작성자 ID
  userName: string, // 작성자 이름
  profileUrl: string, // 작성자 프로필 이미지링크

  folder_id: string, // 폴더 seq (외래키)
  image_id: string, // 이미지 seq (외래키)
});

export default mongoose.model("wit", wit);