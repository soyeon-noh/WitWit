import express from "express";
const router = express.Router();
import WIT from "../models/wit.js";
import USER from "../models/user.js";

const wit_test = [
  {
    id: "1",
    text: "곰세마리가 한집에 있어",
    createdAt: "2021-11-22",
    userId: "@__witwit1",
    userName: "위트위트",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "2",
    text: "아빠곰 엄마곰 애기곰",
    createdAt: "2021-11-23",
    userId: "@jackpot_2",
    userName: "로또당첨될때까지숨참음",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "3",
    text: "아빠곰은 멋쟁이 토마토",
    createdAt: "2021-11-24",
    userId: "@oOoOoO3",
    userName: "강낭콩",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "4",
    text: "엄마곰은 케찹될거야",
    createdAt: "2021-11-24",
    userId: "@game_over4",
    userName: "게임을하면이겨야지",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "5",
    text: "아기곰은 춤을 출거야",
    createdAt: "2021-11-25",
    userId: "@dancing_5ear",
    userName: "dancedance",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "6",
    text: "토마토는 과일인가요 채소인가요?",
    createdAt: "2021-11-26",
    userId: "@t6ma_t6ma",
    userName: "토마토감별사",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
];

/* GET home page. */

// wit 전체 불러오기
router.get("/", async (req, res, next) => {
  //   const result = await WIT.find({});
  //   res.json(result);

  res.json(wit_test); // test code

  console.log("witRouter(get /) : 데이터 넘기기 성공");
});

// wit 추가
router.post("/", async (req, res) => {
  //   WIT.create(req.body);
  WIT.create(wit_test); // test code : 6개 wit 추가
  res.json("INSERT SUCCESS");
  console.log("witRouter(post /) : insert 성공");
});

// wit 검색
router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    console.log("wit.js 쿼리값이 없음");
    return res.json("NOT QUERY");
  } else if (query.slice(0, 1) === "@") {
    const result = await WIT.find({
      $or: [{ userId: query }, { text: query }],
    });
    res.json(result);
    console.log("wit.js 쿼리값이 아이디임", query);
  } else {
    const result = await WIT.find({ text: query });
    res.json(result);
    console.log("wit.js 쿼리값 기본검색");
  }
});

router.get("/:user_id");

export default router;