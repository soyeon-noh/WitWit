import express from "express";
import LIKEY from "../models/likey.js";
import { v4 } from "uuid";

const router = express.Router();

// 좋아요
router.post("/:userId/:witId", async (req, res) => {
  const paramsUserId = req.params.userId;
  const paramsWitId = req.params.witId;
  const likey = await LIKEY.findOne({
    user_id: paramsUserId,
    wit_id: paramsWitId,
  });
  console.log("likey1: ", likey);
  if (!likey) {
    let likey = new LIKEY();
    likey.id = v4();
    likey.userId = paramsUserId;
    likey.witId = paramsWitId;

    await LIKEY.create({});
  } else {
    const id = likey.id;
    await LIKEY.deleteOne({ id: id });
  }

  res.json(likey);
  console.log("likey2: ", likey);
});

export default router;
