import express from "express";
import blackListedTypeController from "../controllers/blackListedTypeController";
import { BlackListedTypePaginationDto } from "../dtos/blackListedType/BlackListedTypePaginationDto";
import { validateDto } from "../utils/validateDto";

const router = express.Router();

router.post(
  "/list",
  validateDto(BlackListedTypePaginationDto),
  blackListedTypeController.findAll
);

export default router;
