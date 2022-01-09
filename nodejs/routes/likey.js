import express from "express";
import LIKEY from "../models/likey.js";
import { v4 } from "uuid";

const router = express.Router();

// 좋아요 여부
router.get("/:user_id/:wit_id", async (req, res) => {
  const userId = req.params.user_id;
  //   const user = req.user;
  const witId = req.params.wit_id;
  const result = await LIKEY.findOne({
    user_id: userId,
    wit_id: witId,
  });
  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// 좋아요
router.post("/:user_id/:wit_id", async (req, res) => {
  const userId = req.params.user_id;
  //   const user = req.user;
  const witId = req.params.wit_id;
  const findedLikey = await LIKEY.findOne({
    user_id: userId,
    // user_id: user.userId,
    wit_id: witId,
  });
  console.log("likey: ", findedLikey);
  if (!findedLikey) {
    const likey = new LIKEY({
      id: v4(),
      user_id: userId,
      wit_id: witId,
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
