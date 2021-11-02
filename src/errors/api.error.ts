export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message || "Not Found");
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message || "Bad Request");
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(500, message || "Internal Server Error");
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(401, message || "Unauthorized");
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(403, message || "Forbidden");
  }
}

export class NotAcceptableError extends ApiError {
  constructor(message: string) {
    super(406, message || "Not Acceptable");
  }
}

export class NotImplementedError extends ApiError {
  constructor(message: string) {
    super(501, message || "Not Implemented");
  }
}

export class UnavailableError extends ApiError {
  constructor(message: string) {
    super(503, message || "Unavailable");
  }
}

export class UnauthenticatedError extends ApiError {
  constructor(message: string) {
    super(401, message || "Unauthenticated");
  }
}
