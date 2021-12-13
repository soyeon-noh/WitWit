import mongoose from "mongoose";
const { Schema } = mongoose;
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const folderSchema = new Schema({
  id: { type: Number, default: 0 },
  user_id: { type: String, required: true },
  wit_id: [{ type: String, trim: true }],
  name: { type: String, required: true },
  secret: { type: Boolean, required: true },
});

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
