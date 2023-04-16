import { NextFunction, Router, Request, Response } from "express";

// project imports
import {
  createUrl,
  deleteUrl,
  findUrl,
  findUrls,
} from "../loaders/url.loaders";
import { BadRequestError } from "../errors/api.error";

const router = Router();

router.param("id", (_req: Request, _res: Response, next: NextFunction, id) => {
  if (typeof id !== "string" || id.length !== 5) {
    next(new BadRequestError("Invalid Short Url Id!"));
    return;
  }
  next();
});

router.get("/", findUrls.execute);
router.post("/new", createUrl.execute);
router.get("/:id", findUrl.execute);
router.delete("/:id", deleteUrl.execute);

export default router;
