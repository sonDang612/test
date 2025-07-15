import { Request, Response } from "express";
import blackListedTypeRepository from "../repositories/blackListedTypeRepository";
import { catchAsync } from "../utils/catchAsync";

const create = catchAsync(async (req: Request, res: Response) => {});

const update = catchAsync(async () => {});
const findOne = catchAsync(async () => {});

const findAll = catchAsync(async (req: Request, res: Response) => {
  const result = await blackListedTypeRepository.findAll(req?.body);

  res.status(200).json({ code: 0, data: { ...result } });
});

const blackListedTypeController = { create, update, findAll, findOne };

export default blackListedTypeController;
