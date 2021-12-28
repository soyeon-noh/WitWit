import express from "express";
import FOLLOW from "../models/follow.js";
import { v4 } from "uuid";

const follow = express.Router();

// 테스트 코드
follow.get("/", async (req, res) => {
  const result = await FOLLOW.find({});
  //   console.log("result: ", result);
  res.json(result);
});

follow.post("/:target_id", async (req, res) => {
  const user_id = req.user.userId;
  //   const user_id = "@test";
  const target_id = req.params.target_id;

  //   if (user_id) {
  //     console.log("있음");
  //   } else {
  //     console.log("없음");
  //   }

  if (user_id) {
    // find만 한 경우
    // []값이나와도 findedFollow의 결과값이 true가 된다.
    const findedFollow = await FOLLOW.findOne({
      user_id,
      target_id,
    });
    // console.log("findedFollow: ", findedFollow);

    if (!findedFollow) {
      const follow = new FOLLOW({
        id: v4(),
        user_id,
        target_id,
      });
      await FOLLOW.create(follow);
      res.send("follow insert success");
    } else {
      await FOLLOW.deleteOne({ id: findedFollow.id });
      res.send("follow delete success");
    }
  } else {
    /** 유저가없는경우 어떻게 처리해야할지 고민필요 */
    res.status(404).send("no user");
  }
});

export default follow;
