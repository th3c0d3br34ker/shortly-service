import * as config from "../config";

export default {
  databaseUrl: config.DATABASE_URL,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: "127.0.0.1",
  port: 5432,
};
