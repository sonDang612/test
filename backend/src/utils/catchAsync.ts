import { NextFunction, Request, Response } from "express";

// try catch for async function
const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: unknown) => next(err));
  };
};

export { catchAsync };
