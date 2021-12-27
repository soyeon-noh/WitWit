import mongoose from "mongoose";

const Schema = mongoose.Schema;

const followSchema = Schema({
  id: String, // 팔로우 기본키

  target_id: String, // 팔로우 당한 사용자
  user_id: String, // 팔로우 신청한 사용자
});

export default mongoose.model("follow", followSchema);
