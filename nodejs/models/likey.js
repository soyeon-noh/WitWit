import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeySchema = Schema({
  id: String, // 좋아요 기본키

  wit_id: Number, // 위트 기본키 (외래키)
  user_id: { type: String, trim: true }, // 사용자 기본키 (외래키)
});

export default mongoose.model("likey", likeySchema);
