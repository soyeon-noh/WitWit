import express from "express";
import moment from "moment";
import WIT from "../models/wit.js";
import FILE from "../models/file.js";
import FOLLOW from "../models/follow.js";

import { getWit } from "./wit.ctrl.js";
import multerUpload from "../modules/fileuploadConfig.js";

import * as witCtrl from "./wit.ctrl.js";

const router = express.Router();

/* GET home page. */

// wit 전체 불러오기
router.get("/", async (req, res) => {
  // passport는 get에서 사용할수없음
  const user = req.user;

  let result;
  if (user) {
    // 유저가 로그인하고 있을 때 팔로우하고있는 사람들만 보이게하기
    // query 를 수정할 필요가 있다
    const follow = await FOLLOW.find({ user_id: user.userId });

    let userArr = follow.map((data) => {
      return data.target_id;
    });

    userArr = [...userArr, user.userId];

    // console.log("userArr : ", userArr);
    result = await getWit(req, res, {
      userId: { $in: userArr },
    });
  } else {
    // 이건 모두 다 보이게 하기
    result = await getWit(req, res, { userId: { $regex: /^@/ } });
  }

  res.json(result);
});

// wit 추가
const createWit = async (req, res) => {
  const witJson = JSON.parse(req.body.wit); // string으로 넘어온 값은 json으로 변환
  witJson.createdDate = moment().format("YYYY[-]MM[-]DD");
  witJson.createdTime = moment().format("HH:mm:ss");

  const user = await req.user;

  if (user) {
    witJson.userId = user.userId;
    witJson.userName = user.userName;
    witJson.profileUrl = user.profileUrl;
    await WIT.create(witJson);
    console.log("wit insert: ", witJson);

    const wit = await WIT.findOne({ userId: witJson.userId }).sort({
      createdDate: -1,
      createdTime: -1,
    });
    if (req.files) {
      req.files.map((data) => {
        data.wit_id = wit.id;
        FILE.create(data);

        console.log("file insert: ", data);
      });
    }
    res.json({
      success: true,
    });
  } else {
    res.json({ error: "로그인필요" });
  }
};

// 단순 추가
router.post("/", multerUpload.array("file"), async (req, res) => {
  // console.log("wit 추가");
  createWit(req, res);
});

// 답글 추가
router.post("/:wit_id", async (req, res) => {
  // console.log("wit 답글 추가")
  const paramsWitId = req.params.wit_id;
  req.body.parentWit = paramsWitId;
  createWit(req, res);
});

// 위마크하기
router.post("/wimark/:wit_id", async (req, res) => {
  const paramsWitId = req.params.wit_id;
  const userId = req.user.userId;

  const findedWit = await WIT.findOne({
    user_id: userId,
    originalWit: paramsWitId,
  });
  console.log("findedWit: ", findedWit);

  if (!findedWit) {
    req.body.originalWit = paramsWitId;
    createWit(req, res);
  } else {
    await WIT.deleteOne({ id: findedWit.id });

    const result = await getWit(req, res, { userId: { $regex: /^@/ } });
    res.json(result);
  }
});

// 인용하기
router.post("/quote/:wit_id", async (req, res) => {
  const paramsWitId = req.params.wit_id;
  req.body.originalWit = paramsWitId;
  createWit(req, res);
});

// wit 검색
router.get("/search", async (req, res) => {
  const queryString = req.query.q;
  const splitQuery = queryString.split(",");
  console.log("split한 query: ", splitQuery);

  const resultList = await Promise.all(
    splitQuery.map(async (query) => {
      return await getWit(req, res, {
        $or: [{ userId: { $regex: query } }, { text: { $regex: query } }],
      });
    })
  );

  // 중복 삭제
  const uniqueResultList = resultList.filter((element, index, array) => {
    return array.findIndex((item) => item.id === element.id) === index;
  });

  console.log("uniqueResultList: ", uniqueResultList);
  res.json(uniqueResultList);
});

// wit 디테일
router.get("/:user_id/:wit_id", async (req, res) => {
  /**
   * getWit의 searchQuery에 기존과 동일하게 paramsWitId 를 대입하면 결과가 나오지 않는다.
   * 이는 Type 문제로 Number로 강제 형변환을 시켜주면 해결된다.
   */
  const paramsWitId = req.params.wit_id;
  const numWitId = Number(paramsWitId);

  const result = await getWit(req, res, { id: numWitId });

  res.json(result);
});

// wit 삭제
router.delete("/:user_id/:wit_id", async (req, res) => {
  const paramsWitId = req.params.wit_id;
  await WIT.deleteOne({ id: paramsWitId });

  await FILE.deleteMany({ wit_id: paramsWitId });
  res.send("Delete Success");
});

// wit 를 folder에 추가
router.post("/:wit_id/:folder_id", async (req, res) => {
  const paramsWitId = req.params.wit_id;
  const paramsFolderId = req.params.folder_id;

  if (paramsFolderId === "0") {
    // _id값으로 조회하기떄문에 별도의 조치를 취하지 않으면 사용할 수 없는 코드이다.
    // await WIT.findByIdAndUpdate(
    //   paramsWitId,
    //   { folder_id: "" },
    //   { returnOrigininal: false }
    // );
    await WIT.updateOne({ id: paramsWitId }, { $set: { folder_id: "" } });
    res.send("folder_id Delete Success");
  } else {
    await WIT.updateOne(
      { id: paramsWitId },
      { $set: { folder_id: paramsFolderId } }
    );
    res.send("folder_id Update Success");
  }
});

export default router;
