export function retryableDecorator(
  fn: CallableFunction,
  checkError: CallableFunction,
  maxRetries: number
) {
  return (...args: any) => {
    let retries = 0;
    return new Promise((resolve, reject) => {
      function retry() {
        Promise.resolve(fn(...args))
          .then(resolve)
          .catch((err: Error) => {
            if (checkError(err) && retries < maxRetries) {
              retries++;
              retry();
            } else {
              reject(err);
            }
          });
      }
      retry();
    });
  };
}

export function isValidDate(d: any) {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

export function checkArrayOfStrings(array: any) {
  if (!Array.isArray(array)) {
    return false;
  }
  return array.every((item: any) => typeof item === "string");
}
