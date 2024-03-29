import { Request, Response } from "express";

// project imports
import {
  InvalidInputError,
  InvalidRequestError,
  NotAllowedError,
} from "../core/errors";
import { NotFoundError } from "../errors/api.error";

export abstract class BaseController {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  protected abstract executeImpl(req: Request, res: Response): Promise<void>;

  public execute(req: Request, res: Response): void {
    this.executeImpl(req, res);
  }

  public static jsonErrorResponse(
    res: Response,
    code: number,
    message?: string,
    data?: any
  ) {
    return res.status(code).json({
      message: message || "Request Failed",
      success: false,
      data: data || null,
    });
  }

  public static jsonSuccessResponse(
    res: Response,
    code: number,
    data?: any,
    message?: string
  ) {
    return res.status(code).json({
      success: true,
      message: message || "Request Successfull",
      data: data || null,
    });
  }

  public static created(res: Response, newObj?: any) {
    return BaseController.jsonSuccessResponse(res, 201, newObj);
  }

  public static ok<T>(res: Response, dto?: T, message?: string) {
    return BaseController.jsonSuccessResponse(res, 200, dto, message);
  }

  public static error(res: Response, error: any) {
    const code =
      Object.keys(error).length > 0
        ? error.status || error.code || error.statusCode || 500
        : 500;
    return BaseController.jsonErrorResponse(res, code, error.toString());
  }

  // Most common error codes
  public static clientError(res: Response, message?: string) {
    return BaseController.jsonErrorResponse(
      res,
      400,
      message ? message : "Bad Request"
    );
  }

  public static unauthorized(res: Response, message?: string) {
    return BaseController.jsonErrorResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public static forbidden(res: Response, message?: string) {
    return BaseController.jsonErrorResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public static notFound(res: Response, message?: string) {
    return BaseController.jsonErrorResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public static tooMany(res: Response, message?: string) {
    return BaseController.jsonErrorResponse(
      res,
      429,
      message ? message : "Too many requests"
    );
  }

  public static fail(res: Response, error: Error | string) {
    let code = 500;
    if (error instanceof NotAllowedError) {
      code = 403;
    } else if (
      error instanceof InvalidInputError ||
      error instanceof InvalidRequestError
    ) {
      code = 400;
    } else if (error instanceof NotFoundError) {
      code = 404;
    }
    return BaseController.jsonErrorResponse(res, code, error.toString());
  }
}
