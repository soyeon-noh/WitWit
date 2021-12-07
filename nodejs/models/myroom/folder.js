import mongoose from "mongoose";
const { Schema } = mongoose;


const folderSchema = new Schema({
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  wit_id: [{ type: String, trim: true }],
  name: { type: String, required: true },
  secret: { type: Boolean, required: true },
});

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
