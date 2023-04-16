import crypto from "crypto";
import { Model, ModelStatic } from "sequelize";

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

export async function generateUuid(
  urlMode: ModelStatic<Model>
): Promise<string> {
  // generate a random string of length 5
  const randomString = crypto.randomBytes(3).toString("hex").substring(0, 5);
  // check if the random string already exists in the collection
  const existingUrl = await urlMode.findByPk(randomString);

  if (existingUrl) {
    // if the random string already exists, recursively call the function again to generate a new one
    return await generateUuid(urlMode);
  } else {
    // if the random string doesn't exist, return it
    return randomString;
  }
}
