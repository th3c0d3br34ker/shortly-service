import * as config from "../config";

export default {
  development: {
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: undefined,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
