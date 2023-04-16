import fs from "fs";
import { WhereOptions } from "sequelize/types";
import { Op, Utils } from "sequelize";

export function getRegexInsensitiveQuery(
  field: string,
  value: string
): WhereOptions {
  return new Utils.Where(new Utils.Fn("LOWER", [new Utils.Col(field)]), {
    [Op.like]: `%${value}%`,
  });
}

export function fileExists(filename: string): boolean {
  try {
    fs.accessSync(filename, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}
