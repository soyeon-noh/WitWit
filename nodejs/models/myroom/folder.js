import mongoose from "mongoose";
const { Schema } = mongoose;

const FolderSchema = new Schema({
  id: { type: String },
  user_id: { type: String },
  wit_id: [{ type: String, trim: true }],
  name: { type: String },
  secret: { type: Boolean },
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;
