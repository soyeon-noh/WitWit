import express from "express";
const router = express.Router();

/** Myroom Routher */
router.get("/", (req, res) => {});

//Myroom folder 관리
router.get("/folder/:user_id", () => {
  // folder 항목에 들어가면 user_id 값을 조회해서 folder 목록을 불러온다
});
router.get("/folder/:user_id/:folder_id", (req, res) => {
  // 불러온 user_id의 folder_id insert
});
router.get("/folder/:user_id/:folder_id", (req, res) => {
  // user_id의 folder_id delete
});
router.get("/", (req, res) => {});
