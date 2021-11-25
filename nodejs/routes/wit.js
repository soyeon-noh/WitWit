import express from "express";
const router = express.Router();
import WIT from "../models/wit.js";
import USER from "../models/user.js";

const wit_test = [
  {
    id: "1",
    text: "",
    createdAt: "2021-11-22",
    userId: "@__witwit1",
    userName: "위트위트",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "2",
    text: "",
    createdAt: "2021-11-23",
    userId: "@jackpot_2",
    userName: "로또당첨될때까지숨참음",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "3",
    text: "",
    createdAt: "2021-11-24",
    userId: "@oOoOoO3",
    userName: "강낭콩",
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

// wit 전체 불러오기
router.get("/", (req, res, next) => {
  // const result = await WIT.find({});

  // await res.json(result);

  res.json(wit_test);

  console.log("witRouter(get /) : 데이터 넘기기 성공");
});

// wit 추가
router.post("/", async (req, res) => {
  // WIT.create(req.body);
  WIT.create(wit_insert);
  res.json("INSERT SUCCESS");
  console.log("witRouter(post /) : insert 성공");
});

// wit 검색
router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json("NOT QUERY");
  } else if (query.slice(0, 1) === "@") {
    const result = await WIT.findOne({ userId: query });
    res.json(result);
  } else {
    const result = await WIT.find({ text: query });
    res.json(result);
  }
});

router.get("/:user_id");

export default router;
