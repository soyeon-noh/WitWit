import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const fileSchema = Schema({
  id: { type: Number, default: 0 },
  filename: String, // req.files.filename
  originalname: String, // req.files.originalname
  size: String, // req.files.size
  wit_id: Number,
});

fileSchema.plugin(autoIncrement.plugin, {
  model: "fileModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("file", fileSchema);
