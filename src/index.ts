import http from "http";
import { IS_TEST, SYNC_DB, PORT } from "./config";
import logger from "./logger";

// project imports
import app from "./routes";
import sequelizeDb from "./db";

const server = http.createServer(app);
const SERVER_CONTEXT = "EXPRESS SERVER";
const DATABASE_CONTEXT = "DATABASE";

async function startProcess() {
  try {
    await sequelizeDb.authenticate();
    logger.debug(
      DATABASE_CONTEXT,
      "Connection has been established successfully."
    );
    logger.debug(SERVER_CONTEXT, `Syncing DB... ${SYNC_DB}`);

    if (SYNC_DB) {
      await sequelizeDb.sync(true);
    }
    server.listen(PORT, () => {
      logger.info(SERVER_CONTEXT, `Server is listening on port ${PORT}.`);
    });
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
