import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import blackListedUserSiteRepository from "../repositories/blackListedUserSiteRepository";

const getOverview = catchAsync(async (_: Request, res: Response) => {
  const overviews = await blackListedUserSiteRepository.getOverview();
  res.status(200).json({ code: 0, data: { data: overviews } });
});

const statisticsController = { getOverview };

export default statisticsController;
