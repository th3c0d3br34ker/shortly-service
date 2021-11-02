import { Request, Response } from "express";
import logger from "../logger";

// project imports
import { IUrlService } from "../services/url.service";
import { BaseController } from "./BaseController";

export class AddUrlController extends BaseController {
  private _urlService: IUrlService;

  constructor(urlService: IUrlService) {
    super();
    this._urlService = urlService;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const { long_url } = req.body;
      const permanent = req.body.permanent || false;

      const url = this._urlService.addUrl({
        long_url,
        permanent,
      });

      BaseController.created(res, (await url).toJSON());
    } catch (err) {
      logger.error("add-url-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}

export class FindAllUrlsController extends BaseController {
  private _urlService: IUrlService;

  constructor(urlService: IUrlService) {
    super();
    this._urlService = urlService;
  }

  protected async executeImpl(_: Request, res: Response): Promise<void> {
    try {
      const data = await this._urlService.findUrls();

      BaseController.ok(res, data);
    } catch (err) {
      logger.error("get-urls-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}

export class FindUrlByIdController extends BaseController {
  private _urlService: IUrlService;

  constructor(urlService: IUrlService) {
    super();
    this._urlService = urlService;
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const data = await this._urlService.findUrlById(id);

      BaseController.ok(res, data);
    } catch (err) {
      logger.error("get-urls-controller", err);
      BaseController.fail(res, err as Error);
    }
  }
}
