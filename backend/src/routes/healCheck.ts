import express from "express";

const router = express.Router();

router.post("/ping", (req, res) => {
  res.status(200).json({ code: 0, data: { data: "pong" } });
});

export default router;
