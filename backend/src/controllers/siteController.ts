import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import siteRepository from "../repositories/siteRepository";
import { ERole } from "../constants/enums/role";
import { generateToken } from "../utils/generateToken";

const create = catchAsync(async (req: Request, res: Response) => {
  const { token, ...payload } = req.body;

  await siteRepository.create({
    ...payload,
    token: token || generateToken(),
  });

  res.status(200).json({ code: 0 });
});

const update = catchAsync(async () => {});
const findOne = catchAsync(async () => {});

const findAll = catchAsync(async (req: Request, res: Response) => {
  const { role, ...payload } = req.body;
  const result = await siteRepository.findAll(payload);

  if (role !== ERole.ADMIN) {
    result.data = result?.data?.map((item: any) => ({
      id: item?.id,
      name: item?.name,
    }));
  }

  res.status(200).json({ code: 0, data: { data: result } });
});

const siteController = { create, update, findAll, findOne };

export default siteController;
