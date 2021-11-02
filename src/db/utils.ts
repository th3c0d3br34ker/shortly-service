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

export const ops = Op;
