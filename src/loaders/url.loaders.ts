// project imports
import {
  AddUrlController,
  DeleteUrlByIdController,
  FindAllUrlsController,
  FindUrlByIdController,
} from "../controllers/url.controllers";
import sequelizeDb from "../db";
import { URL_MODEL_NAME } from "../db/constants";
import { UrlService } from "../services/url.service";

const urlModel = sequelizeDb.getModel(URL_MODEL_NAME);

export const urlService = new UrlService(urlModel);

export const findUrls = new FindAllUrlsController(urlService);

export const createUrl = new AddUrlController(urlService);

export const findUrl = new FindUrlByIdController(urlService);

export const deleteUrl = new DeleteUrlByIdController(urlService);
