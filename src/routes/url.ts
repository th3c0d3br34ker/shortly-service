import { NextFunction, Router, Request, Response } from "express";
import validator from "validator";

// project imports
import { createUrl, findUrl, findUrls } from "../loaders/url.loaders";
import { BadRequestError } from "../errors/api.error";

const router = Router();

router.param("id", (_req: Request, _res: Response, next: NextFunction, id) => {
  if (!validator.isUUID(id, 4)) {
    next(new BadRequestError("Invalid Short Url Id!"));
    return;
  }
  next();
});

router.post("/new", createUrl.execute);
router.get("/all", findUrls.execute);
router.get("/:id", findUrl.execute);

export default router;
