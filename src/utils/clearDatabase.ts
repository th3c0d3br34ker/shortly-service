import { Model, ModelStatic, WhereOptions, Op } from "sequelize";

import logger from "../logger";
import { SERVER_CONTEXT } from "../config";

export async function clearDatabase(
  urlModel: ModelStatic<Model>,
  clearInterval: number
) {
  try {
    const where: WhereOptions = {
      created_at: {
        [Op.lt]: new Date(Date.now() - clearInterval),
      },
      permanent: false,
    };

    const result = await urlModel.destroy({
      where,
    });
    logger.info(
      SERVER_CONTEXT,
      `Deleted ${result} short IDs from the database.`
    );
  } catch (error) {
    console.error(error);
  }
}
