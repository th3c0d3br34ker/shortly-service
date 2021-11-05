import * as DotEnv from "dotenv";

DotEnv.config();

export const HOST = process.env.HOST || "localhost";

export const PORT = Number.parseInt(process.env.PORT || "5000", 10);

export const HOST_NAME = process.env.BASE_URL || `http://${HOST}:${PORT}`;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const IS_TEST = NODE_ENV === "test" || false;

export const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres@localhost:5432/shortly-db";

export const DB_NAME = process.env.DB_NAME || "shortly-db";

export const DB_USER = process.env.DB_USER || "postgres";

export const DB_PASSWORD = process.env.DB_PASSWORD || "";

export const SYNC_DB = process.env.SYNC_DB_FORCE === "true";

export const DB_SSL = process.env.DB_SSL === "true";
