import http from "http";
import {
  IS_TEST,
  SYNC_DB,
  PORT,
  CLEAR_INTERVAL_IN_MINUITES,
  DATABASE_CONTEXT,
  SERVER_CONTEXT,
} from "./config";
import logger from "./logger";

// project imports
import app from "./routes";
import sequelizeDb from "./db";
import { clearDatabase } from "./utils/clearDatabase";
import { URL_MODEL_NAME } from "./db/constants";

const server = http.createServer(app);

let clearDatabaseService: NodeJS.Timer | null = null;

async function startProcess() {
  try {
    await sequelizeDb.checkDatabase();
    await sequelizeDb.authenticate();

    logger.debug(
      DATABASE_CONTEXT,
      "Connection has been established successfully."
    );

    if (SYNC_DB) {
      logger.debug(SERVER_CONTEXT, "Syncing DB...");
      await sequelizeDb.sync(true);
    }
    server.listen(PORT, () => {
      logger.info(
        SERVER_CONTEXT,
        `🚀 Server listening on http://localhost:${PORT}.`
      );
    });
    clearDatabaseService = setInterval(() => {
      clearDatabase(
        sequelizeDb.getModel(URL_MODEL_NAME),
        CLEAR_INTERVAL_IN_MINUITES
      );
    }, CLEAR_INTERVAL_IN_MINUITES);

    logger.info(
      SERVER_CONTEXT,
      `Database clearing service scheduled to run every ${CLEAR_INTERVAL_IN_MINUITES} ms.`
    );
  } catch (error) {
    logger.error(DATABASE_CONTEXT, "Unable to connect to the database:", error);
  }
}

let stopped = false;

async function stopProcess(err: boolean = false) {
  if (stopped) {
    return;
  }
  stopped = true;
  logger.info(SERVER_CONTEXT, "Stopping server...");
  clearDatabaseService && clearInterval(clearDatabaseService);
  await server.close();
  process.exit(err ? 1 : 0);
}

if (!IS_TEST) {
  startProcess();
}

process.on("uncaughtException", (err) => {
  logger.error(SERVER_CONTEXT, "uncaughtException", err);
  stopProcess(true);
});

process.on("unhandledRejection", (err) => {
  logger.error(SERVER_CONTEXT, "unhandledRejection", err);
  stopProcess(true);
});

process.on("SIGINT", () => {
  logger.info(SERVER_CONTEXT, "SIGINT");
  stopProcess(false);
});

process.on("SIGTERM", () => {
  logger.info(SERVER_CONTEXT, "SIGTERM");
  stopProcess(false);
});
