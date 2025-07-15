import { NextFunction, Request, Response } from "express";

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    //stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  res.status(500).json({
    message: "Server Internal Error",
  });
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const nodeEnv = process.env.NODE_ENV || "";
  if (nodeEnv === "development") {
    sendErrorDev(err, res);
  } else if (nodeEnv.trim() === "production") {
    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;
