import * as DotEnv from "dotenv";

DotEnv.config();

export const SERVER_CONTEXT = "EXPRESS SERVER";
export const DATABASE_CONTEXT = "DATABASE";

export const HOST = process.env.HOST || "localhost";

export const PORT = Number.parseInt(process.env.PORT || "5000", 10);

export const HOST_NAME = process.env.BASE_URL || `http://${HOST}:${PORT}`;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const IS_TEST = NODE_ENV === "test" || false;

export const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres@localhost:5432/shortly-db";

export const DB_NAME = process.env.DB_NAME || "shortly.sqlite3";

export const SYNC_DB = process.env.SYNC_DB_FORCE === "true";

export const DB_SSL = process.env.DB_SSL === "true";

export const DB_DIALECT = process.env.DB_DIALECT || "sqlite";

export const DB_ENTRIES_LIMIT = Number.parseInt(
  process.env.DB_ENTRIES_LIMIT || "1000",
  10
);

export const CLEAR_INTERVAL_IN_MINUITES =
  Number.parseInt(process.env.CLEAR_INTERVAL_IN_MINUITES || "1", 10) *
  60 *
  1000;
