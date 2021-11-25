import express from "express";
const myroom = express.Router();

/** Myroom Routher */
myroom.get("/", (req, res) => {
  res.send("hi");
});
export default myroom;
