import { Request, Response } from "express";
import allowedRepository from "../repositories/allowedIPRepository";
import { catchAsync } from "../utils/catchAsync";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await allowedRepository.create(req?.body?.ipAddress);

  res.status(200).json({ code: 0, data: { data: result } });
});

const update = catchAsync(async () => {});
const findOne = catchAsync(async () => {});

const findAll = catchAsync(async (req: Request, res: Response) => {
  const result = await allowedRepository.findAll(req?.body);

  res.status(200).json({ code: 0, data: { data: result } });
});

const allowedIPController = { create, update, findAll, findOne };

export default allowedIPController;
