import express from "express";
import moment from "moment";
const router = express.Router();
import WIT from "../models/wit.js";
import USER from "../models/user.js";
import { v4 } from "uuid";

const wit_test = [
  {
    id: "1",
    text: "곰세마리가 한집에 있어",
    createdDate: "2021-11-22",
    createdTime: "6:47:12",
    userId: "@__witwit1",
    userName: "위트위트",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "2",
    text: "아빠곰 엄마곰 애기곰",
    createdDate: "2021-11-23",
    createdTime: "12:30:01",
    userId: "@jackpot_2",
    userName: "로또당첨될때까지숨참음",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "3",
    text: "아빠곰은 멋쟁이 토마토",
    createdDate: "2021-11-24",
    createdTime: "18:52:47",
    userId: "@oOoOoO3",
    userName: "강낭콩",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "4",
    text: "엄마곰은 케찹될거야",
    createdDate: "2021-11-24",
    createdTime: "15:33:26",
    userId: "@game_over4",
    userName: "게임을하면이겨야지",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "5",
    text: "아기곰은 춤을 출거야",
    createdDate: "2021-11-25",
    createdTime: "20:11:01",
    userId: "@dancing_5ear",
    userName: "dancedance",
    profileUrl: "프로필 url",

    folder_id: "폴더 시퀀스",
    image_id: "이미지 시퀀스",
  },
  {
    id: "6",
    text: "토마토는 과일인가요 채소인가요?",
    createdDate: "2021-11-26",
    createdTime: "2:25:32",
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
  /** db연동 기본코드 */
  const result = await WIT.find({});
  result.reverse();
  res.json(result);

  /** test 코드 */
  //   res.json(wit_test); // test code

  console.log("witRouter(get /) : 데이터 넘기기 성공");
});

// wit 추가
router.post("/", async (req, res) => {
  //   WIT.create(wit_test); // test code : 6개 wit 추가

  req.body.id = v4();
  req.body.createdDate = moment().format("YYYY[-]MM[-]DD");
  req.body.createdTime = moment().format("HH:mm:ss");
  WIT.create(req.body);
  //   res.json("INSERT SUCCESS");

  console.log("wit insert: ", req.body);

  // wit 추가와 함께 리스트 갱신
  const result = await WIT.find({});
  result.reverse();
  res.json(result);
});

// wit 검색
router.get("/search", async (req, res) => {
  const query = req.query.q.toString();
  const splitQuery = query.split(",");
  console.log("split한 query: ", splitQuery);

  let result;
  let resultList = [];

  for (const num in splitQuery) {
    console.log("splitQuery[num]: ", splitQuery[num]);

    if (splitQuery[num].slice(0, 1) === "@") {
      result = await WIT.find({
        $or: [{ userId: splitQuery[num] }, { text: splitQuery[num] }],
      });
      console.log("wit.js : 아이디검색 결과 ", result);
    } else {
      result = await WIT.find({ text: { $regex: splitQuery[num] } });
      console.log("wit.js : 기본검색 ", splitQuery[num]);
      console.log("wit.js : 기본검색 결과 ", result);
    }

    resultList = [...resultList, result];
    // push는 기본 배열값이 없으면 오류가 난다.
    // resultList.push(result);
    console.log("resultList: ", resultList);
  }

  // filter는 return x
  resultList = resultList.filter((element, index) => {
    resultList.indexOf(element) === index;
  });

  result.reverse();
  res.json(resultList);
});

// // 여기가 myroom인건 어떨까?
// router.get("/:userId", async (req, res) => {
//   const paramsUserID = req.params.userId;
//   const result = await WIT.find({ userId: paramsUserID });
//   res.json(result);
// });

// wit 디테일
router.get("/:userId/:id", async (req, res) => {
  const paramsId = req.params.id;
  const result = await WIT.findOne({ id: paramsId });
  res.json(result);
});

// wit 삭제
router.delete("/:userId/:id", async (req, res) => {
  const paramsId = req.params.id;
  await WIT.deleteOne({ id: paramsId });

  // myroom으로 돌아가기
  const paramsUserID = req.params.userId;
  const result = await WIT.find({ userId: paramsUserID });
  res.json(result);
});

export default router;
