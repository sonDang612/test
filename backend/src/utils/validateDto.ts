import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";

const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      return next(
        new AppError(
          "Form Validation failed",
          500,
          errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          }))
        )
      );
    }

    req.body = dtoObject;
    next();
  };
};
export { validateDto };
