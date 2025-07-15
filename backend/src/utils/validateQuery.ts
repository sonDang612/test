import { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";

const validateQuery =
  ([query, message]: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req?.query?.[query]) {
      return sendResponse(res, null, message);
    }
    next();
  };

export { validateQuery };
