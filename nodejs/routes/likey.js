import express from "express";
import LIKEY from "../models/likey.js";
import { v4 } from "uuid";

const router = express.Router();

// 텟그트
router.get("/", async (req, res) => {
  const result = await LIKEY.find({});
  res.json(result);
});

// 좋아요
router.post("/:userId/:witId", async (req, res) => {
  const paramsUserId = req.params.userId;
  const paramsWitId = req.params.witId;
  const likey = await LIKEY.findOne({
    user_id: paramsUserId,
    wit_id: paramsWitId,
  });
  console.log("likey: ", likey);
  if (!likey) {
    const insertJson = { id: v4(), user_id: paramsUserId, wit_id: paramsWitId };

    await LIKEY.create(insertJson);
  } else {
    const id = likey.id;
    await LIKEY.deleteOne({ id: id });
  }

  const result = await LIKEY.find({});
  res.json(result);
  console.log("result: ", result);
});

export default router;
