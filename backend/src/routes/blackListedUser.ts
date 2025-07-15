import express from "express";
import blackListedUserController from "../controllers/blackListedUserController";
import { BlackListedUserPaginationDto } from "../dtos/blackListedUser/BlackListedUserPaginationDto";
import { CreateBlackListedUserDto } from "../dtos/blackListedUser/CreateBlackListedUserDto";
import { DetailsBlackListedUserDto } from "../dtos/blackListedUser/DetailsBlackListedUserDto";
import { validateDto } from "../utils/validateDto";
import { DeleteBlackListedUserDto } from "../dtos/blackListedUser/DeleteBlackListedUserDto";

const router = express.Router();

router.post(
  "/create",
  validateDto(CreateBlackListedUserDto),
  blackListedUserController.create
);

router.post(
  "/create-from-excel",
  //validateDto(CreateBlackListUsersFromExcelDto),
  blackListedUserController.createFromExcel
);

router.post(
  "/list",
  validateDto(BlackListedUserPaginationDto),
  blackListedUserController.findAll
);

router.post(
  "/details",
  validateDto(DetailsBlackListedUserDto),
  blackListedUserController.findOne
);

router.post(
  "/delete",
  validateDto(DeleteBlackListedUserDto),
  blackListedUserController.deleteOne
);

export default router;
