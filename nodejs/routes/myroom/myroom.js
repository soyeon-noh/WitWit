import express from "express";
const router = express.Router();

/** Myroom Routher */
router.get("/", (req, res) => {
  res.send("hi");
});
export default router;
