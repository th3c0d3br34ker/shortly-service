export class CoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends CoreError {
  constructor(message: string) {
    super(message);
  }
}

export class NotAllowedError extends CoreError {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidInputError extends CoreError {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CoreError {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidRequestError extends CoreError {
  constructor(message: string) {
    super(message);
  }
}

export default CoreError;
