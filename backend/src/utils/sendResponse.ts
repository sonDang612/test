import { Response } from "express";

const sendResponse = (res: Response, result?: any, status?: any) => {
  const data = { status: status || "OK" } as any;
  if (result) {
    data.result = result;
  }

  res.send(data);
};

export { sendResponse };
