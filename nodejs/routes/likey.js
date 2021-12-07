import express from "express";
import LIKEY from "../models/likey.js";
import { v4 } from "uuid";

const router = express.Router();

// 테스트코드
router.get("/", async (req, res) => {
  const result = await LIKEY.find({});
  console.log("result: ", result);
  res.json(result);
});

// 좋아요
router.post("/:user_id/:witId", async (req, res) => {
  const paramsUserId = req.params.user_id;
  const paramsWitId = req.params.witId;
  const findedLikey = await LIKEY.findOne({
    user_id: paramsUserId,
    wit_id: paramsWitId,
  });
  console.log("likey: ", findedLikey);
  if (!findedLikey) {
    const likey = new LIKEY({
      id: v4(),
      user_id: paramsUserId,
      wit_id: paramsWitId,
    });
    await LIKEY.create(likey);
  } else {
    const id = findedLikey.id;
    await LIKEY.deleteOne({ id: id });
  }

  const result = await LIKEY.find({});
  console.log("result: ", result);
  res.json(result);
});

export default router;
