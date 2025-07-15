import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";
import { ERole } from "../constants/enums/role";

const restrictTo = (...roles: ERole[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req?.user?.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};

export { restrictTo };
