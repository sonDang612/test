import express from "express";
import authController from "../controllers/authController";
import { ValidateMasterPasswordDto } from "../dtos/auth/ValidateMasterPasswordDto";
import { ValidateSettingsMasterCodeDto } from "../dtos/auth/ValidateSettingsMasterCodeDto";
import { validateDto } from "../utils/validateDto";
import { protect } from "../utils/protect";

const router = express.Router();

router.post(
  "/validate-master-password",
  protect,
  validateDto(ValidateMasterPasswordDto),
  authController.validateMasterPassword
);
router.post(
  "/validate-settings-master-code",
  validateDto(ValidateSettingsMasterCodeDto),
  authController.validateSettingsMasterCode
);

export default router;
