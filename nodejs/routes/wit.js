import express from "express";
import moment from "moment";
import WIT from "../models/wit.js";
import FOLDER from "../models/myroom/folder.js";

import USER from "../models/user.js";
import LIKEY from "../models/likey.js";
import { v4 } from "uuid";

const router = express.Router();

/* GET home page. */

// wit 전체 불러오는 함수
const getWit = async (req, res, searchQuery) => {
  //   const witResult = await WIT.find({}).sort({createdDate: -1, createdTime: -1,});

  const result = await WIT.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: "likeys",
        localField: "id",
        foreignField: "wit_id",
        as: "likeys",
      },
    },
    {
      $lookup: {
        from: "wits",
        localField: "id",
        foreignField: "parentWit",
        as: "replyArray",
      },
    },
    {
      $lookup: {
        from: "wits",
        localField: "parentWit",
        foreignField: "id",
        as: "parentWit",
      },
    },
    {
      $lookup: {
        from: "wits",
        localField: "originalWit",
        foreignField: "id",
        as: "originalWit",
      },
    },
    {
      $project: {
        id: 1,
        text: 1,
        createdDate: 1,
        createdTime: 1,
        userId: 1,
        userName: 1,
        profileUrl: 1,
        parentWit: 1,
        rewitId: 1,

        folder_id: 1,
        image_id: 1,

        parentWit: "$parentWit",
        originalWit: "$originalWit",
        replyArray: "$replyArray",

        likeyCount: { $size: "$likeys" },
        // replys: "$replyArray",
        replyCount: { $size: "$replyArray" },
      },
    },

    { $sort: { createdDate: -1, createdTime: -1 } },
  ]);
  console.log("wit find: ", result);
  return result;
  //   res.json(result);
};

// wit 전체 불러오기
router.get("/", async (req, res, next) => {
  /** db연동 기본코드 */
  const result = await getWit(req, res, { userId: { $regex: /^@/ } });
  console.log("result: ", result);
  res.json(result);
});

// wit 추가
const createWit = async (req, res) => {
  req.body.createdDate = moment().format("YYYY[-]MM[-]DD");
  req.body.createdTime = moment().format("HH:mm:ss");
  WIT.create(req.body);
  console.log("wit insert: ", req.body);

  // wit 추가와 함께 리스트 갱신
  //   const result = await WIT.find({}).sort({ createdDate: -1, createdTime: -1 });
  //   res.json(result);
  const result = await getWit(req, res, { userId: { $regex: /^@/ } });
  res.json(result);
};

// 단순 추가
router.post("/", async (req, res) => {
  createWit(req, res);
});

// 답글 추가
router.post("/:id", async (req, res) => {
  const paramsId = req.params.id;
  req.body.parentWit = paramsId;
  createWit(req, res);
});

// 리위트하기
router.post("/rewit/:id", async (req, res) => {
  const paramsId = req.params.id;
  req.body.rewitId = paramsId;
  createWit(req, res);
});

// wit 검색
router.get("/search", async (req, res) => {
  // const queryString = req.query.q.toString();
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

  //   const resultList = await Promise.all(
  //     splitQuery.map(async (query) => {
  //       return await WIT.find({
  //         $or: [{ userId: { $regex: query } }, { text: { $regex: query } }],
  //       }).sort({ createdDate: -1, createdTime: -1 });
  //     })
  //   );

  // 중복 삭제
  const uniqueResultList = resultList.filter((element, index, array) => {
    return array.findIndex((item) => item.id === element.id) === index;
  });

  console.log("uniqueResultList: ", uniqueResultList);
  res.json(uniqueResultList);
});

// wit 디테일
router.get("/:user_id/:id", async (req, res) => {
  const paramsId = req.params.id;
  const witResult = await WIT.findOne({ id: paramsId });
  const commentsResult = await WIT.find({ parentWit: paramsId }).sort({
    createdDate: -1,
    createdTime: -1,
  });

  const sendData = {
    wit: witResult,
    replys: commentsResult,
  };

  res.json(sendData);
});

// wit 삭제
router.delete("/:user_id/:id", async (req, res) => {
  const paramsId = req.params.id;
  await WIT.deleteOne({ id: paramsId });

  res.send("Delete Success");
});

// wit 를 folder에 추가
router.post("/:id/:folder_id", async (req, res) => {
  const paramsId = req.params.id;
  const paramsFolderId = req.params.folder_id;

  if (paramsFolderId === "0") {
    // _id값으로 조회하기떄문에 별도의 조치를 취하지 않으면 사용할 수 없는 코드이다.
    // await WIT.findByIdAndUpdate(
    //   paramsId,
    //   { folder_id: "" },
    //   { returnOrigininal: false }
    // );
    await WIT.updateOne({ id: paramsId }, { $set: { folder_id: "" } });
    res.send("folder_id Delete Success");
  } else {
    // await WIT.findByIdAndUpdate(
    //   paramsId,
    //   { folder_id: paramsFolderId },
    //   { returnOrigininal: false }
    // );
    await WIT.updateOne(
      { id: paramsId },
      { $set: { folder_id: paramsFolderId } }
    );
    res.send("folder_id Update Success");
  }
});

export default router;
