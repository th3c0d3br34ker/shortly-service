import fs from "fs";
import path from "path";
import { DataTypes, Options, Sequelize } from "sequelize";
import databaseConfig from "./config";
import logger from "../logger";

const modelsPath = path.join(__dirname, "models");
const models = Object.create(null);

const databaseOptions: Options = {
  dialect: "postgres",
  logging: (msg: string) => logger.info("DATABASE", msg),
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    charset: "utf8",
  },
};

let sequelize: Sequelize = new Sequelize(
  databaseConfig.databaseUrl,
  databaseOptions
);

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
