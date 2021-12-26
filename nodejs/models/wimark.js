import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const wimarkSchema = Schema({
  id: { type: Number, default: 0 },
  createdDate: String,
  createdTime: String,
  userId: String,
  userName: String,
  profileUrl: String,

  wit_id: Number,
});

wimarkSchema.plugin(autoIncrement.plugin, {
  model: "wimarkModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("wimark", wimarkSchema);
