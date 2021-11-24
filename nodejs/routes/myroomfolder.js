/* myroomfolder.js */
import express from "express";
import { Db } from "mongodb";
const router = express.Router();
//Myroom folder 관리

router.get("/", (req, res) => {});
// folder 항목에 들어가면 user_id 값을 조회해서 folder 목록을 불러온다 findAll
router.get("/:user_id/select", (req, res) => {});
//myroom 에서 폴더 수정삭제 창으로 넘어감 folder_id 기준으로  add, delete 할수있는 창
router.get("/:user_id/insert", (req, res) => {});

/** /insert 창으로 들어가서 버튼을 누를시에 아래 post 경로가 진행됨  */

router.post("/:user_id/add/:folder_id", (req, res) => {
  // user_id의 folder_id 추가
  //데이터 베이스에서 user_id 를 찾고 사용자가 입력한 정보대로 folder_id를 추가한다.
  Db.insertOne(req.body)
    .then((result) => {
      res.redirect("/");
      console.log(result);
    })
    .catch((error) => console.error(error));
});
// user_id의 folder_id 삭제
router.post("/:user_id/delete/:folder_id", (req, res) => {});
export default router;
