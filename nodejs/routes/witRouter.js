import express from "express";
const router = express.Router();
import WIT from "../models/wit.js";
import USER from "../models/user.js";

const wit_test = [
  {
    id: "1",
    text: "텍스트1",
    createdAt: "2021-11-22",
    userId: "유저아이디1",
    userName: "유저이름1",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "2",
    text: "텍스트2",
    createdAt: "2021-11-23",
    userId: "유저아이디2",
    userName: "유저이름2",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "3",
    text: "텍스트3",
    createdAt: "2021-11-24",
    userId: "유저아이디3",
    userName: "유저이름3",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
];

const wit_insert = {
  id: "1",
  text: "텍스트1",
  createdAt: "2021-11-22",
  userId: "유저아이디1",
  userName: "유저이름1",
  profileUrl: "프로필 url",

  folder_id: "폴더 시퀀스",
  image_id: "이미지 시퀀스",
};

/* GET home page. */

// selete
router.get("/", (req, res, next) => {
  // const result = await WIT.find({});

  // await res.json(result);

  res.json(wit_test);
});

// insert
router.post("/", async (req, res) => {
  // WIT.create(req.body);
  WIT.create(wit_insert);
  res.json("INSERT SUCCESS");
});

router.get("/search", (req, res) => {
  if (!req.query.q) {
    return res.json("NOT QUERY");
  }
});

export default router;
