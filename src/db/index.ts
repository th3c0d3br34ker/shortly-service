import { Sequelize, Transaction } from "sequelize";
import db from "./db";
import * as Utils from "./utils";

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
