import { Sequelize, Transaction } from "sequelize";
import db from "./db";
import * as Utils from "./utils";
import config from "./config";
import logger from "../logger";
import { DATABASE_CONTEXT } from "../config";

export interface DataAccess {
  sync(...args: any): any;
  authenticate(): void;
  getModels(): any;
  getModel(modelName: string): any;
}

export class SequelizeDAO implements DataAccess {
  private readonly sequelize: Sequelize;
  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async checkDatabase() {
    const storage = config.storage;
    if (!storage) {
      return;
    }

    const exists = await Utils.fileExists(storage);

    if (!exists) {
      logger.info(
        DATABASE_CONTEXT,
        "Database file does not exist. Creating new database..."
      );
      await this.sync(true);
    }

    logger.info(
      DATABASE_CONTEXT,
      "Check completed! using database file: ",
      storage
    );
  }
  async authenticate() {
    await db.sequelize.authenticate();
  }
  async sync(force: boolean) {
    return await this.sequelize.sync({
      force,
    });
  }
  getModels() {
    return this.sequelize.models;
  }
  getModel(modelName: string) {
    return this.sequelize.models[modelName];
  }
  transaction() {
    return this.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      autocommit: false,
    });
  }
}

const sequelizeDb = new SequelizeDAO(db.sequelize);

export { Utils };
export default sequelizeDb;
