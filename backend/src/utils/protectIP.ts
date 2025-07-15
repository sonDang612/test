import { NextFunction, Request, Response } from "express";
import { ERROR } from "../constants";
import allowedIPRepository from "../repositories/allowedIPRepository";
import { AppError } from "./appError";
import { catchAsync } from "./catchAsync";

const protectIP = catchAsync(
  async (req: Request, _: Response, next: NextFunction) => {
    const ip = req.clientIp;

    if (!ip) {
      return next(AppError.BadRequest(ERROR.INVALID_IP));
    }

    const isExistedIP = await allowedIPRepository.findOneByIP(ip);

    if (!isExistedIP) {
      return next(AppError.BadRequest(ERROR.INVALID_IP));
    }

    next();
  }
);

export { protectIP };
