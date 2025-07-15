import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { ERole } from "../constants/enums/role";
import accountRepository from "../repositories/accountRepository";
import allowedRepository from "../repositories/allowedIPRepository";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { createSendToken } from "../utils/createSendToken";
import appConfigsRepository from "../repositories/appConfigsRepository";

const signup = catchAsync(async (req: Request, res: Response) => {
  const { password, role } = req.body;

  const newUser = await accountRepository.create({
    ...req.body,
    password: await bcrypt.hash(password, 12),
    role: role || ERole.USER,
  });

  return createSendToken(newUser, 201, res);
});

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body;

    const user = await accountRepository.findOne({ userName });

    if (!user || !(await bcrypt.compare(password, `${user.password}`))) {
      return next(AppError.BadRequest("Login fail"));
    }

    return createSendToken(user, 200, res);
  }
);

const validateMasterPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    const isCorrectPassword = await appConfigsRepository.validateAppConfigKey(
      "MASTER_PASSWORD",
      password
    );

    if (!isCorrectPassword) {
      return next(AppError.BadRequest());
    }

    return res.status(200).json({ code: 0, data: { data: "OK" } });
  }
);

const validateSettingsMasterCode = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;

    const isSettingsMasterCode =
      await appConfigsRepository.validateAppConfigKey(
        "SETTINGS_MASTER_CODE",
        code
      );

    if (!isSettingsMasterCode) {
      return res.status(200).json({ code: 1, data: { data: null } });
    }

    return res.status(200).json({ code: 0, data: { data: "OK" } });
  }
);

const authController = {
  signup,
  login,
  validateMasterPassword,
  validateSettingsMasterCode,
};

export default authController;
