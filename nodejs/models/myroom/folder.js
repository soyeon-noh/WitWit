import mongoose from "mongoose";
const { Schema } = mongoose;

const FolderSchema = new Schema({
  user_id: { type: String, required: true },
  wit_id: [{ type: String, trim: true }],
  folder_name: { type: String, required: true },
  secret: { type: Boolean, required: true },
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;
