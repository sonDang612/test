import { NextFunction, Request, Response } from "express";
import siteRepository from "../repositories/siteRepository";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

const protect = catchAsync(
  async (req: Request, _: Response, next: NextFunction) => {
    let token;
    const ipAddress = req.clientIp;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(AppError.BadRequest());
    }

    const isValid = await siteRepository.checkValid({ token, ipAddress });

    if (!isValid) {
      return next(AppError.BadRequest());
    }

    next();
  }
);

export { protect };
