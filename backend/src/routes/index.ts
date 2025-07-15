import express from "express";
import { protect } from "../utils/protect";
import allowedIPRouter from "./allowedIP";
import authRouter from "./auth";
import blackListedTypeRouter from "./blackListedType";
import blackListedUserRouter from "./blackListedUser";
import healCheckRouter from "./healCheck";
import siteRouter from "./site";
import statisticsRouter from "./statistics";

const router = express.Router();

router.use("/healcheck", healCheckRouter);

router.use("/auth", authRouter);

router.use("/black-listed-user", protect, blackListedUserRouter);
router.use("/site", protect, siteRouter);
router.use("/black-listed-type", protect, blackListedTypeRouter);
router.use("/statistics", protect, statisticsRouter);
router.use("/allowed-ip", protect, allowedIPRouter);

export default router;
