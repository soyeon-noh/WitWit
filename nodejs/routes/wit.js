import express from "express";
import moment from "moment";
import WIT from "../models/wit.js";
import FOLDER from "../models/myroom/folder.js";

import USER from "../models/user.js";
import LIKEY from "../models/likey.js";
import { v4 } from "uuid";

const router = express.Router();

/* GET home page. */

// wit 전체 불러오기
router.get("/", async (req, res, next) => {
  /** db연동 기본코드 */
  const result = await WIT.find({}).sort({ createdDate: -1, createdTime: -1 });
  console.log("wit find: ", result);
  res.json(result);
});

// wit 추가

const createWit = async (req, res) => {
  req.body.createdDate = moment().format("YYYY[-]MM[-]DD");
  req.body.createdTime = moment().format("HH:mm:ss");
  WIT.create(req.body);
  console.log("wit insert: ", req.body);

  // wit 추가와 함께 리스트 갱신
  const result = await WIT.find({}).sort({ createdDate: -1, createdTime: -1 });
  res.json(result);
};

// 단순 추가
router.post("/", async (req, res) => {
  createWit(req, res);
});

// 답글 추가
router.post("/:id", async (req, res) => {
  const paramsId = req.params.id;
  req.body.previousWit = paramsId;
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
      return await WIT.find({
        $or: [{ userId: { $regex: query } }, { text: { $regex: query } }],
      }).sort({ createdDate: -1, createdTime: -1 });
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
router.get("/:user_id/:id", async (req, res) => {
  const paramsId = req.params.id;
  const result = await WIT.findOne({ id: paramsId });
  res.json(result);
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

  await WIT.updateOne(
    { id: paramsId },
    { $set: { folder_id: paramsFolderId } }
  );

  res.send("folder_id Update Success");
});

export default router;
