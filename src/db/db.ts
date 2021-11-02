import fs from "fs";
import path from "path";
import { DataTypes, Sequelize } from "sequelize";
// import * as config from "../config";
// import databaseConfig from "./config";
import logger from "../logger";

// const env = config.NODE_ENV;
// const dbConfig = databaseConfig[env as keyof typeof databaseConfig];
const modelsPath = path.join(__dirname, "models");
const models = Object.create(null);

// let sequelize: Sequelize = new Sequelize(config.DATABASE_URL, {
//   database: dbConfig.database,
// });

let sequelize = new Sequelize("sqlite::memory:", {
  dialect: "sqlite",
  logging: (args) => logger.debug("DATABASE", args),
});

fs.readdirSync(modelsPath).forEach(async (file: string) => {
  const model = require(path.join(__dirname, "models", file)).default(
    sequelize,
    DataTypes
  );
  models[model.name as string] = model;
});

Object.keys(models).forEach((modelName: string) => {
  if (
    models[modelName].associate &&
    typeof models[modelName].associate === "function"
  ) {
    models[modelName].associate(models);
  }
});

const db = {
  sequelize,
  Sequelize,
};

export default db;
