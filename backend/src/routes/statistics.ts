import express from "express";
import statisticsController from "../controllers/statisticsController";

const router = express.Router();

router.post("/overview", statisticsController.getOverview);

export default router;
