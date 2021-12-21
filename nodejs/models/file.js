import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const file = Schema({
  id: { type: Number, default: 0 },
  name: String,
  originalname: String,
  byte_size: String,
});
