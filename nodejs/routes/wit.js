import express from "express";
import moment from "moment";
import WIT from "../models/wit.js";
import { v4 } from "uuid";

import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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

        folder_id: 1,
        image_id: 1,

        originalWit: "$originalWit",
        replyArray: "$replyArray",

        likeyCount: { $size: "$likeys" },
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
  const result = await getWit(req, res, { userId: { $regex: /^@/ } });
  res.json(result);
};

// 단순 추가
router.post("/", upload.array("file"), async (req, res) => {
  // const { name } = req.body;
  // console.log("body 데이터 : ", name);

  // req.files.map((data) => {
  //   console.log("폼에 정의된 필드명 : ", data.fieldname);
  //   console.log("사용자가 업로드한 파일 명 : ", data.originalname);
  //   console.log("파일의 엔코딩 타입 : ", data.encoding);
  //   console.log("파일의 Mime 타입 : ", data.mimetype);
  //   console.log("파일이 저장된 폴더 : ", data.destination);
  //   console.log("destinatin에 저장된 파일 명 : ", data.filename);
  //   console.log("업로드된 파일의 전체 경로 ", data.path);
  //   console.log("파일의 바이트(byte 사이즈)", data.size);
  // });

  // res.json({ ok: true, data: "Multipart Upload Ok" });
  createWit(req, res);
});

// 답글 추가
router.post("/:wit_id", async (req, res) => {
  const paramsWitId = req.params.wit_id;
  req.body.parentWit = paramsWitId;
  createWit(req, res);
});

// 위마크하기
router.post("/wimark/:wit_id", async (req, res) => {
  const paramsWitId = req.params.wit_id;
  //유저아이디도 필요
  const userId = "@bob";

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
router.get("/:user_id/:wit_id", async (req, res) => {
  // const paramsWitId = req.params.wit_id;
  // const witResult = await WIT.findOne({ id: paramsWitId });
  // const commentsResult = await WIT.find({ parentWit: paramsWitId }).sort({
  //   createdDate: -1,
  //   createdTime: -1,
  // });

  // const sendData = {
  //   wit: witResult,
  //   replys: commentsResult,
  // };
  // res.json(sendData);

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
