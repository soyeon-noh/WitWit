/* myroomfolder.js */
import express from "express";

const folder = express.Router();

//Myroom folder 관리

folder.get("/", (req, res) => {});
// folder 항목에 들어가면 user_id 값을 조회해서 folder 목록을 불러온다 findAll
folder.get("/:user_id", (req, res) => {
  // db connection 에 접속해서 user_id 값으로된 모든 folder_id 를 findAll 을 통해 불러온다
  // 간단하게 추가가 가능한 버튼을 여기다가 넣을까 ?
});
//myroom 에서 폴더 수정삭제 창으로 넘어감 folder_id 기준으로  add, delete 할수있는 창
folder.get("/:user_id/insert", (req, res) => {
  // 카테고리관련 수정요청을 받아와서 처리할 get 요청
  // 동일하게 user_id 값으로 folder_id를 받아오면
  //delete 또는  제목수정
  //내용물 추가삭제, 정렬을 진행할수 있다.(예정)
});

/** /insert 창으로 들어가서 버튼을 누를시에 아래 post 경로가 진행됨  */
folder.post("/:user_id/add/:folder_id", (req, res) => {
  // user_id의 folder_id 추가
  //데이터 베이스에서 user_id 를 찾고 사용자가 입력한 정보대로 folder_id를 추가한다.
  //   Db.insertOne(req.body)
  //     .then((result) => {
  //       res.redirect("/");
  //       console.log(result);
  //     })
  //     .catch((error) => console.error(error));
});
// user_id의 folder_id 삭제
folder.post("/:user_id/delete/:folder_id", (req, res) => {});

export default folder;
