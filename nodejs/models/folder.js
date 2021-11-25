import mongoose from "mongoose";
const Schema = mongoose.Schema;

const folder = new Schema({
  id: String,
  user_id: String,
  wit_id: String,
  name: String,
  secret: Boolean,
});

export default mongoose.model("folder", folder);
