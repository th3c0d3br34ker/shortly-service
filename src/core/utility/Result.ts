export class Result<T> {
  private _value: T | null;
  private _isSuccess: boolean;
  private _error: T | string | null;

  private constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
            successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
            needs to contain an error message`);
    }

    this._isSuccess = isSuccess;
    this._error = error || null;
    this._value = value || null;

    Object.freeze(this);
  }

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public getValue(): T {
    if (!this._isSuccess) {
      return this._error as T;
    }
    return this._value as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: U | string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (!result._isSuccess) return result;
    }
    return Result.ok<any>();
  }
}
