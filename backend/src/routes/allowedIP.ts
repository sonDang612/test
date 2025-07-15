import express from "express";
import allowedIPController from "../controllers/allowedIPController";
import { AllowedIPPaginationDto } from "../dtos/allowedIP/AllowedIPPaginationDto";
import { validateDto } from "../utils/validateDto";
import { CreateAllowedIPDto } from "../dtos/allowedIP/CreateAllowedIPDto";

const router = express.Router();

router.post(
  "/list",
  validateDto(AllowedIPPaginationDto),
  allowedIPController.findAll
);

router.post(
  "/create",
  validateDto(CreateAllowedIPDto),
  allowedIPController.create
);

export default router;
