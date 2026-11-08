import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.routes.js";

export const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(helmet());

app.use(cors({ origin: env.CORS_ORIGINS, methods: ["GET", "POST"] }));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Saroj Adhikari — portfolio API",
    endpoints: ["GET /api/health", "POST /api/contact"],
  });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});
app.use("/api/contact", contactRouter);

app.use(notFound);
app.use(errorHandler);
