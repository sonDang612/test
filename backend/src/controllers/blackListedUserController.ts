import { Request, Response } from "express";
import blackListedUserRepository from "../repositories/blackListedUserRepository";
import { catchAsync } from "../utils/catchAsync";
import blackListedUserSiteRepository from "../repositories/blackListedUserSiteRepository";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await blackListedUserRepository.create(req?.body);

  res.status(200).json({ code: 0, data: { data: result } });
});

const createFromExcel = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body?.data;

  if (Array.isArray(data)) {
    await Promise.allSettled(
      data.map((item) => {
        return blackListedUserRepository.create(item);
      })
    );
  }
  res.status(200).json({ code: 0, data: { data: "ok" } });
});

const update = catchAsync(async () => {});

const findOne = catchAsync(async (req: Request, res: Response) => {
  const result = await blackListedUserRepository.findOneById(req?.body);

  res.status(200).json({ code: 0, data: { data: result } });
});

const findAll = catchAsync(async (req: Request, res: Response) => {
  const result = await blackListedUserRepository.findAll(req?.body);

  res.status(200).json({ code: 0, data: { data: result } });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  await blackListedUserSiteRepository.softDeleteOne(req?.body);

  res.status(204).json({ code: 0, data: null });
});

const blackListedUserController = {
  create,
  update,
  findAll,
  findOne,
  createFromExcel,
  deleteOne,
};

export default blackListedUserController;
