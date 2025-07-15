import { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";

const validateParam =
  ([param, message]: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req?.params?.[param]) {
      return sendResponse(res, null, message);
    }
    next();
  };

export { validateParam };
