// project imports
import {
  AddUrlController,
  FindAllUrlsController,
  FindUrlByIdController,
} from "../controllers/url.controllers";
import sequelizeDb from "../db";
import { URL_MODEL_NAME } from "../db/constants";
import { UrlService } from "../services/url.service";

const urlModel = sequelizeDb.getModel(URL_MODEL_NAME);

export const urlService = new UrlService(urlModel);

export const createUrl = new AddUrlController(urlService);

export const findUrl = new FindUrlByIdController(urlService);

export const findUrls = new FindAllUrlsController(urlService);
