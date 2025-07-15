import express from "express";
import siteController from "../controllers/siteController";
import { SitePaginationDto } from "../dtos/site/SitePaginationDto";
import { validateDto } from "../utils/validateDto";
import { CreateSiteDto } from "../dtos/site/CreateSiteDto";

const router = express.Router();

router.post("/list", validateDto(SitePaginationDto), siteController.findAll);

router.post("/create", validateDto(CreateSiteDto), siteController.create);

export default router;
