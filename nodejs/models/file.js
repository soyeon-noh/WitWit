import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const file = Schema({
  id: { type: Number, default: 0 },
  fieldname: String, // req.files.filename
  originalname: String, // req.files.originalname
  size: String, // req.files.size
});

file.plugin(autoIncrement.plugin, {
  model: "fileModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("file", file);
