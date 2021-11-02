import express from "express";
import cors from "cors";

// project imports
import * as config from "../config";
import NotFoundHandler from "../controllers/notFoundHandler";
import GlobalErrorHandler from "../controllers/globalErrorHandler";

// Routes
import UrlRoute from "./url";

const app = express();

app.disable("x-powered-by");
app.enable("case sensitive routing");
app.disable("strict routing");
app.enable("trust proxy");
app.set("env", config.NODE_ENV);

app.use(
  cors((_req, cb) => {
    cb(null, {
      origin: true,
      credentials: true,
    });
  })
);
app.use(express.json());

// Application Specific Routes
app.get("/", (_, res) => {
  return res.send("¯¯\\__(ツ)__/¯¯");
});
app.use("/api", UrlRoute);

// 404 error
app.use(NotFoundHandler);

// global error handler
app.use(GlobalErrorHandler);

export default app;
